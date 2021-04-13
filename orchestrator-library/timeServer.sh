#! /bin/bash
touch ../invokeSuccess.txt
touch ../triggerResponse.txt

ts-node -e "import { dbInit } from './dbops/dbInit'; dbInit();" &
sleep 5
msTimeNextRun=20000
initTime=$(ts-node -e "console.log(new Date().getTime());" )
minTime=0

while :
do
    ts-node -e "import { triggerNext } from './callLambda/triggerNext'; triggerNext(${initTime}); 
setTimeout((function() {return process.exit(0);}), 15000); "
    currTime=$(ts-node -e "console.log(new Date().getTime());" )
    timeSleep=$((msTimeNextRun + initTime  - currTime))
    initTime=$((initTime + msTimeNextRun))
    timeSleep=$(( timeSleep > minTime ? timeSleep : minTime ))
    timeSleep=$(echo "scale=3; $timeSleep / (1000)" | bc -l)
    # echo $timeSleep
    sleep $timeSleep
done