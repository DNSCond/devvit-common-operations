// import { Devvit, JobContext, JSONObject, TriggerContext } from "@devvit/public-api";
// import { CustomError } from "anthelpers";

// by u/antboiy <https://reddit.com/u/antboiy/>

// export function scheduleRepeatedAction(devvitInstance: typeof Devvit, jobName: string,
//     callback: (this: Date, currentDate: Date, context: JobContext) => JSONObject & { runAt: Date }) {
//     const name = `${jobName}`;
//     // async function update(context: TriggerContext) {
//     //     {
//     //         const oldJobId = await context.redis.get(`jobId-${jobName}`);
//     //         if (oldJobId) await context.scheduler.cancelJob(oldJobId);
//     //         const jobId = await context.scheduler.runJob({
//     //             name: jobName,
//     //             cron: `5 ${hourTime} * * *`,
//     //             data: {},
//     //         });
//     //         await context.redis.set(`jobId-${daily_mail_stats_update}`, jobId);
//     //     }
//     // }
//     // devvitInstance.addTrigger({ event: 'AppInstall', async onEvent(_, context) { await update(context); }, });
//     // devvitInstance.addTrigger({ event: 'AppUpgrade', async onEvent(_, context) { await update(context); }, });
//     devvitInstance.addSchedulerJob({
//         name, async onRun(event, context) {
//             const date = new Date;
//             const currentJobId = await context.redis.get(`runJobName:${name}`);
//             if (currentJobId !== undefined && event.data?.currentJobId !== undefined) {
//                 if (currentJobId !== event.data?.currentJobId) { }
//                 const returnValue = await Function.prototype.apply.call(
//                     callback, date, [event, context]) as JSONObject & { runAt: Date },
//                     runAt = new Date(returnValue?.runAt ?? NaN);
//                 if (!isNaN(runAt as unknown as number)) {
//                     const runJobId = await context.scheduler.runJob({ name, runAt, data: { returnValue, currentJobId } });
//                     await context.redis.set(`runJobName:${name}`, runJobId);
//                 } else throw new CustomError(`SchedulerJob ${name} at (${date}) cannot run due to no next time received`, { runAt, date });
//             } else throw new CustomError(`SchedulerJob ${name} at (${date}) cannot run due to currentJobId or event.data?.currentJobId being undefined`, { date });
//         },
//     });
// }
