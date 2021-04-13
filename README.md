# **AWS-T5**
> ### Library for Scheduler and Orchestrator for AWS Lambda


Team ID: AWS-T5 | Team Members: Swapnil Ghosh &amp; Devesh Ranjan

## What it does?

AWS Lambda is an effecient way to have your code be served and operated upon through the cloud as seperate tasks, without any concerns about the provisioning, scaling or maintenance of the servers. This library takes the convenience and automation a step further. 

Now users can simply schedule their tasks linearly or have them invoked depending upon the results of another set of Lambda tasks.
*Precise till less than a second, with a single core system; increases precision with parallelization.* Moreover, the library also has interface to reschedule and cancel tasks, as well as fetch all tasks by their ID or status.

With our demo HTTP server and demo UI, now larger organizations can use the library to empower their members to schedule and orchestrate their AWS Lambda just between them and the SysAdmins.


## How it works?

For a Lambda to be invoked, one might create a [Trigger URL](https://docs.aws.amazon.com/lambda/latest/dg/services-apigateway.html) or simply access the ARN provided in the AWS Function Console. The scheduler is open to both. But we recommend using a Trigger URL since it does not involve handing over your AWS Access Keys over a potentially vulnerable system. For the same, Create Trigger APIs with Open Access, and just schedule with your newly allocated HTTPS URL.

The UI is pretty easy to operate, however if you want your own set of UI, possibly look into the RESTful functions provided by the Library.

Interface offered by *library-backend*:
- cancelTask(id : string)
- checkStatus(id:string)
- modifyTaskTime(id : string, invoke_delay : number)
- retrieveAllTasks()
- retrieveTaskInstances(taskStatus :string)
- taskSchedule(triggerURLOrARN: string, delay: number, name: string, accessKeyID?: string, secretAccessKey?: string, payload: string)

Interface offered by *orchestrator-library*:
- getTasks(inParams: taskArgs)
    - taskArgs {
    status?: string;
    taskID?: number;
    }
- editTask(inParams: editArgs)
    - editArgs {
    taskID: number,
    invoke_delay?: number,
    newStatus?: string
    }
- scheduleOrchestration(orchestratorList: string, name: string, delay: number, payload: string) : Promise\<number>

Invocation and triggering thereby can be safely left upon the library after it has been set up properly.

## Setup

1. Clone the current repo and cd into it. 
    ```
    git clone <>/AWS-T5.git && cd AWS-T5
    ```
1. We have used yarn for maintaning the locks for each package.json. To leverage the lock versioning, ensure that *yarn* is locally available. Now to install all npm packages
    ```
    cd demo_server; yarn install;
    cd ../library_backend; yarn install;
    cd ../orchestrator-library; yarn install;
    cd ..
    ```
1. See to it that ```ts-node``` and ```typescript``` are installed. Avoid a --production flag while running the yarn install so that these and other devDependencies are installed.
1. Install ```postgresql``` from [the official PostgreSQL page](https://www.postgresql.org/download/). Thereby set it up for current use. On a systemd-enabled OS, use ```systemctl start postgresql.service``` and ```systemctl enable postgresql.service```. 
1. Thereby ensure that the following ConnectionString is reachable 
```postgresql://postgres:postgres@localhost:5432/postgres ```
1. Start up all servers for the REST APIs by
    ```
    cd library-backend;
    chmod +x schedulerServerInit.sh;
    sh ./schedulerServerInit.sh & ;
    cd ..;
    cd orchestrator-library;
    chmod +x timeServer.sh;
    sh ./timeServer.sh & ;
    cd ..;
    ```
1. If you also want to use the demo implementation on top of this library, add your GOOGLE AUTH Credentials to a file as ```demo_server/secrets.ts```. The file is to be structured as 
    ```
    const GOOGLE_CLIENT_ID = "";
    const GOOGLE_CLIENT_SECRET = "";
    export { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET };
    ```
1. Initialize the HTTP Server as
    ```
    ts-node server.ts
    ```
1. Finally start off the FrontEnd by Live Server or alternatives. The entire library and its demo must be up and running with no errors.

## How is it Built?

![File Structure](https://s4.gifyu.com/images/Peek-2021-04-14-00-01.gif)

The codebase is laid out in a simple enough structure
```
project
|
└───demo_server
│   │
│   └───routes
│   └───tests/dbops
│
└───frontend
│   │
│   └───assets
│   └───css
│   └───script
│
└───library-backend
│   │
│   └───AWSconnect
│   └───AWSscheduler
│   └───dbops
│   └───tests
│   │   │
│   │   └───AWSconnect
│   │   └───AWSscheduler
│   │   └───dbops
│   │   └───validateData
│   │
│   └───validateData
│
└───orchestrator-library
    │
    └───callLambda
    └───dbops
    └───tests
    │   │
    │   └───callLambda
    │   └───dbops
    │   └───orchestrator
    │
    └───orchestrator
```

Basically this was a TDD and each TypeScript function was developed independently, exported and tested from a dedicated directory for testing. Moreover each component was segregated into different directories and were developed forwards from their Prototypes.

The UI was developed later on where the Frontend requests at the Demo_Server which basically provides HTTP APIs for the Library's RESTful services.

[![](https://i.ibb.co/qWxRwFt/0001.jpg)](https://ibb.co/P9t58z7)

## Reach Out to:
- [Swapnil Ghosh](mailto:goshrow@gmail.com)
- [Devesh Ranjan](mailto:deveshranjan920@gmail.com)