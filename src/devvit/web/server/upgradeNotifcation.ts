import { type Router, Request, Response } from 'express';
import { reddit, context, settings, redis } from "@devvit/web/server";
import { lt } from "semver";

/* for this to work, insert this into your devvit.json

note, you should set `npx devvit settings set upgradeNotifcation-semver-latest`
to the latest version when your app is approved for that version.
DO NOT SET IT AT THE `devvit publish` TIME (see code below).

{
  "scheduler": {
    "tasks": {
      "weekly-wednesday-task": {
        "endpoint": "/internal/scheduler/weekly-wednesday",
        "cron": "0 13 * * 3"
      }
    }
  }
}

also this is based on https://github.com/fsvreddit/bot-bouncer/blob/main/src/upgradeNotifier.ts

as this repo wants to keep things standalone. you will need to add these settings to the devvit.json

{
  "settings": {
    "global": {
      "devvit settings": {
        "type": "string",
        "label": "latests version in semver",
      }
    },
    "subreddit": {
      "upgradeNotifcation-sendUpgradeNotif": {
        "type": "boolean",
        "label": "send update notification?",
      }
    }
  }
}
*/
/*
dependancies:

- "semver": "^7.7.1" // taken from <https://github.com/fsvreddit/bot-bouncer/blob/280d3451f4e3b0904a79832dba8ec32d24e6bc05/package.json#L30>.
- "@types/semver": "^7.7.1" // reccomended by vscode.

*/
export function attachUpgradeNotifcationToRouter(router: Router, appDisplayName: string): Router {
  router.post('/internal/scheduler/weekly-wednesday', async (_req: Request, res: Response) => {
    const now = new Date;
    console.log(`Handle weekly Wednesday 1pm task at ${now.toISOString()}!`);
    if (await settings.get('upgradeNotifcation-sendUpgradeNotif')) {
      const latest = await settings.get<string>('upgradeNotifcation-semver-latest'),
        { subredditId, subredditName } = context;
      if (!latest) {
        console.error('latest is undefined;', latest);
        res.status(400).json({ status: 'Bad Request' });
        return;
      } else if (!/^\d+\.\d+\.\d+$/.test(latest)) {
        console.error('the developer has set latest incorrectly; ', latest);
        res.status(400).json({ status: 'Bad Request' });
        return;
      }
      if (!lt(context.appVersion, latest)) {
        console.log("no update found.");
        res.status(400).json({ status: 'Bad Request' });
        return;
      }

      if ((await redis.get('upgradeNotifcation-notifSent')) === latest) {
        console.log('maybe i have already sent the notif for', latest);
        res.status(400).json({ status: 'Bad Request' });
        return;
      }

      let subject = `New "${appDisplayName}" Update is Available: ${latest};`, bodyMarkdown = subject +
        `\n\nTo install this update, or to disable these notifications, visit the [**${appDisplayName} Configuration Page**](https://developers.reddit.com/r/${subredditName}/apps/${context.appName}) for /r/${subredditName}.`;

      await reddit.modMail.createModNotification({
        subredditId, subject, bodyMarkdown,
      });

      // using utc explicitly, is better practice in my opinion/
      now.setUTCDate(now.getUTCDate() + 90);
      await redis.set('upgradeNotifcation-notifSent', latest, { expiration: now })
    }
    res.status(200).json({ status: 'ok' });
  }); return router;
}

// `u/antboiy <https://reddit.com/u/antboiy/>`;