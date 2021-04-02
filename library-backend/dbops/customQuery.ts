import { Client } from "pg";
import { connectionstring } from "./connectDB";

async function customQuery(query: string) {
    try {
        const client: Client = new Client(connectionstring);
        await client.connect();
        const ret: any = client.query(
            `${query}
            `).then(res => {
                return res;
            }).catch(err => console.log("Query Error" + err));
        return ret;
    } catch (err) {
        console.error("Custom Query Not Invoked", err);
    }
}

export { customQuery };
