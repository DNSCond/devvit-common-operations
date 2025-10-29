import { Devvit, MenuItem } from "@devvit/public-api";

/*
a quicker way to add a menu item to make a menu item on the subreddit to travel to something.

use the string [[%subredditName%]] case insensitively to put the current subreddit name in to string.
*/

// by u/antboiy <https://reddit.com/u/antboiy/>
export function navigateToOnMenuPress(devvitInstance: typeof Devvit, label: string, description: string, linksTo: string, options?: { forModeratorsOnly?: boolean }) {
    const object = {
        label, description,
        location: 'subreddit',
        async onPress(_, context) {
            const subredditName = context.subredditName;
            if (subredditName === undefined) return context.ui.showToast('no subredditName name');
            // context.ui.navigateTo(`https://www.reddit.com/r/${subredditName}/wiki/modmail-stats/`);
            context.ui.navigateTo(`${linksTo}`.replaceAll(/\[\[%subredditName%]]/ig, subredditName));
        },
    } as MenuItem;
    if (Boolean(Object(options).forModeratorsOnly))
        object.forUserType = 'moderator';
    devvitInstance.addMenuItem(object);
}

