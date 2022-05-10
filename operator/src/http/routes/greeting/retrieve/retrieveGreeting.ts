import { JsonRpcProvider } from "@ethersproject/providers";
import { Contract } from "ethers";
import { query } from "express-validator";
import { Greeter } from "../../../../contract/interfaces/Greeter";
import GreeterJSON from "../../../../contract/interfaces/Greeter.json";
import { EnvVars } from "../../../../lib/EnvVars";
import { GreetingStore } from "../../../../storage/greeting/GreetingStore";
import { ROUTE_NAMES } from "../../../constants";
import { createRouter } from "../../routerFactory";
import { RetrieveGreetingService } from "./RetrieveGreetingService";


export const retrieveGreetingRouter = createRouter({
    method: "get",
    route: ROUTE_NAMES.greeting.retrieve,
    inputPath: "query",
    inputChecks: [
       query("setter").optional().isEthereumAddress().withMessage("invalid setter")
    ],
    service: new RetrieveGreetingService({
        getGreeterContract: () => <Greeter> new Contract(
            EnvVars.GREETER_CONTRACT_ADDRESS,
            GreeterJSON.abi,
            new JsonRpcProvider(EnvVars.RPC_URL)
        ),
        getGreetingStore: () => GreetingStore.get()
    })
});