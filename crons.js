import scheduler from "node-schedule";
import { NOTIFICATION_ACTION_TYPE } from "./helpers/constants.js";
import { intervalEndDate } from "./helpers/functions.js";

/**
 * sends email, notifications to team members less than 24h to end of interval
 */
export const scheduleReviewReminder = (signupDate, interval, organizationCode) => {
    try {
        // every [interval] days at 9am
        const rule = `0 9 */${interval} * *`;

        const intervalEndDateVal = intervalEndDate(interval, signupDate);

        // Define the target date
        const targetDate = new Date(intervalEndDateVal);

        // Calculate the time difference between now and the target date minus 24 hours
        const timeDifference = targetDate.getTime() - 24 * 60 * 60 * 1000;

        // Schedule the task
        const job = scheduler.scheduleJob(
            {
                start: new Date(timeDifference),
                rule,
            },
            async () => {
                // Send Email
                await sendBulkEmail("INTERVAL_REMINDER", organizationCode);

                // Send Notification
                await sendNotification({
                    title: `You have less than 24h to the end of current interval`,
                    sender: "admin",
                    org_recipient: user.organization_code,
                    data: {
                        type: NOTIFICATION_ACTION_TYPE.INTERVAL_REMINDER,
                        organization: user.organization_code,
                    },
                });
            },
        );

        console.log("NEW JOB SCHEDULE: REVIEW REMINDER");
    } catch (err) {
        console.error(`SEND REVIEW REMINDER ERROR: ${err}`);
        // res.status(400).json(errorMsg(err));
    }
};
