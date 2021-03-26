#! /bin/bash
touch ../invokeSuccess.txt
touch ../triggerResponse.txt

ts-node -e "import { dbInit } from '../dbops/dbInit'; dbInit();"