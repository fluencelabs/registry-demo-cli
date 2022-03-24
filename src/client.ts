import { resolveRoute, send_message} from "./generated/export"
import { krasnodar } from "@fluencelabs/fluence-network-environment"
import {Fluence} from "@fluencelabs/fluence"

async function main(route_id: string) {
    await Fluence.start({connectTo: krasnodar[0]});
    console.log(route_id);
    let providers = await resolveRoute(route_id, 3);
    console.log("Providers:", providers);
    let provider = providers[0];
    await send_message(provider.relay_id[0], provider.peer_id, provider.service_id[0], "hello world");
}

let route_id = process.argv[2];
main(route_id).then(() => process.exit(0)).catch((err) => console.error(err));
