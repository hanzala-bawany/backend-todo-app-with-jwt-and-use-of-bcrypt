import { loginUsers } from "../models/perDayLoginModel.js"
import { CronJob } from 'cron';
import { loginUsersArray } from "../utills/loginUserArray.js"; 

console.log(loginUsersArray , "---> loginm user array ki halat cron job file me starting me");


//             CRON JOB CODING START
export const job = new CronJob(
    '*/59 * * * * *', // cronTime
    function () {
        console.log('cron job her 60 second me chal raha he');
        if (loginUsersArray.length > 0) {
            loginUsers.create({
                perHourLoginCount: loginUsersArray.length,
                startDate: loginUsersArray[0][1],
                endDate: loginUsersArray[loginUsersArray.length - 1][1]
            })
 
            console.log("login users data add successfiully");
            
            loginUsersArray.length = 0;
        }
        else {
            console.log("60 seconds me kise ne login nahi kia he");

        }

    }, // onTick
    null, // onComplete
    true, // start
    'America/Los_Angeles' // timeZone
)
//                CRON JOB CODING END

