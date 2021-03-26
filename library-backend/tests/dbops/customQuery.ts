import { customQuery } from "@dbops/customQuery";
customQuery("SELECT NOW();")
.then(res => console.log(res.rows[0]))
.catch(err => console.error(err));