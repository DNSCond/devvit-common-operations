import {
    // reddit, context,
    type RedditClient,
    type Context,
} from "@devvit/web/server";

/*
this function needs to determine if the username is a mod, if the user is not found by getUserByUsername then it will return undefined,
getModPermissionsForSubreddit returns an array of mod perms if its 0 then it assumes they arent a mod
*/

// by u/antboiy <https://reddit.com/u/antboiy/>
export async function isUserModerator({ reddit, context }: { reddit: RedditClient, context: Context }, username: string): Promise<boolean> {
    const user = await reddit.getUserByUsername(username);
    return ((await user?.getModPermissionsForSubreddit(context.subredditName))?.length ?? 0) > 0;
}

/* // isModerayor

async function isModerayor(reddit: any, context: any) {
    const user = await reddit.getCurrentUser();
    if (!user) throw new TypeError('currentUser is undefined');
    const username = user.username;
    const isMod = !!(await user.getModPermissionsForSubreddit(context.subredditName)).length;
    if (!isMod) throw new RangeError('CurrentUser isnt a mod');
    return { user, username };
}

export async function isModerator(reddit: any, context: any) {
    try {
        return await isModerayor(reddit, context);
    } catch {
        return null;
    }
}*/
