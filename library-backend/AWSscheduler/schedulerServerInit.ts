import { runNext } from "./runNext";

async function schedulerServerInit() {
    .then(async res => {
        const startTime = new Date().getTime();
        const timeGap = 30000;
        console.log(startTime);
        // const delay = (t: number) => new Promise(resolve => setTimeout(resolve, t));
        // eslint-disable-next-line no-constant-condition
        while (true) {
            await runNext(startTime + timeGap);
            await setTimeout(()=>{ console.log("HI")}, timeGap);
        }
    });
}

schedulerServerInit();