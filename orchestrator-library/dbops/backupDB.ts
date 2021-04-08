import { exec } from 'child_process';

function backupDB (): void {
    exec("pg_dump -U postgres postgres > backup.sql", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`Backup Success ${stdout}`);
    });
}

export { backupDB }