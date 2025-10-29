import { PostSubmit, TriggerContext } from "@devvit/public-api";

/*
function to know if the bots replying to themselves.

not sure if itll work
*/

// by u/antboiy <https://reddit.com/u/antboiy/>

async function isSelf(context: TriggerContext) {
    return context.appName == await context.reddit.getCurrentUsername();
}
