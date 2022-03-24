import {createRouteAndRegister, registerGreetingService} from "./generated/export"
import { krasnodar } from "@fluencelabs/fluence-network-environment"
import { Fluence } from "@fluencelabs/fluence"

async function main() {
    await Fluence.start({connectTo: krasnodar[0]});
    console.log('our peer id', Fluence.getStatus().peerId);
    console.log('connected to', Fluence.getStatus().relayPeerId);

    let relay_id = Fluence.getStatus().relayPeerId;
    let service_id = "my_greeting_service";
    await registerGreetingService(service_id, {
        greeting: (name) => {
            console.log("Message received:", name);
            return "Hi, " + name;
        }
    })

    let label = "my_greeting_label";
    let value = "so important";
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
