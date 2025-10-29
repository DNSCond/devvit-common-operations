import {
    type RedditClient,
    type Context,
} from "@devvit/web/server";

/**
 * true if the user is subreddit banned, false otherwise
 * @param contextAndReddit the usual 
 * @param username who to check for
 */
// reccomended by kapa.ai
// by u/antboiy <https://reddit.com/u/antboiy/>
export async function isUserBanned({ reddit, context }: { reddit: RedditClient, context: Context }, username: string): Promise<boolean> {
    const user = await reddit.getUserByUsername(username);
    if (user === undefined) return false;
    const { subredditName } = context;
    const bannedUsersListing = reddit.getBannedUsers({ subredditName });
    const bannedUsers = await bannedUsersListing.all(); // Get all banned users

    return bannedUsers.some(user => user.username === username);
}