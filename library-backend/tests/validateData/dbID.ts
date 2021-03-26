import { dbID } from "../../validateData/dbID";
dbID("2").then(res => console.log(res == true));
dbID("sajoaf").then(res => console.log(res == false));
dbID("4623456").then(res => console.log(res == false)); 
// imitates a taskID which hasn't been allotted to the DB sequence yet