import { greeting } from "./generated/export"
import { krasnodar } from "@fluencelabs/fluence-network-environment"
import { Fluence } from "@fluencelabs/fluence"


async function main(route_id: string) {
    await Fluence.start({connectTo: krasnodar[4]});
    console.log(Fluence.getStatus().relayPeerId);
    let results = await greeting(route_id, "Alexey");
    console.log("Results:", results);
}

let route_id = process.argv[2];
main(route_id).then(() => process.exit(0)).catch((err) => console.error(err));
