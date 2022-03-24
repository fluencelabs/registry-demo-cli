import {createRouteAndRegister, registerMessaging, resolveRoute, send_message} from "./generated/export"
import { krasnodar } from "@fluencelabs/fluence-network-environment"
import {Fluence} from "@fluencelabs/fluence"

async function main() {
    await Fluence.start({connectTo: krasnodar[0]});
    console.log('our peer id', Fluence.getStatus().peerId);
    let relay_id = Fluence.getStatus().relayPeerId;
    console.log('connected to', Fluence.getStatus().relayPeerId);

    let label = "messaging_label";
    let value = "so important";
    let service_id = "my_messaging";
    await registerMessaging(service_id, {
        receive: (msg) => {
            console.log("Message received:", msg);
        }
    })

    let route_id = await createRouteAndRegister(label, value, relay_id, service_id);
    console.log("Route id:", route_id);

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', async () => {
        await Fluence.stop();
        process.exit(0);
    });
}

main().catch((err) => console.error(err));
