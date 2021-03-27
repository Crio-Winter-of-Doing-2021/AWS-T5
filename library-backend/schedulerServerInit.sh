#! /bin/bash
touch ../invokeSuccess.txt
touch ../triggerResponse.txt

ts-node -e "import { dbInit } from './dbops/dbInit'; dbInit();" &
sleep 5
msTimeNextRun=10000
timeSleep=10
currTime=$(ts-node -e "console.log(new Date().getTime());" )

while :
do 
    ts-node -e "import { runNext } from './AWSscheduler/runNext'; runNext(${currTime}); "
    currTime=$((currTime + msTimeNextRun))
    sleep $timeSleep
done