// import { MessageType } from "../../../ws/WebSocketHandler";
import { ContractEventHandlerService } from "../contractEventHandlerFactory";


export class NewProductService implements ContractEventHandlerService {
    async run(inputs: unknown[]): Promise<void> {
        // const from = <string> inputs[0];
        // const to = <string> inputs[1];
        // const tokenId = (<BigNumber> inputs[2]).toNumber();
        // const event = <Event> inputs[3];

        // if (from !== ZERO_ADDRESS) {
        //     return;
        // }

        // logger.event("Mint -> tokenId: " + tokenId + ", block: " + event.blockNumber + ", owner: " + to,
        //     { metadata: { tokenId, blockNumber: event.blockNumber } }
        // );

        // const date = tokenIdToDate(tokenId);
        // const wsListeners = WebSocketManager.getSocketHandlersByYearEra({ year: date.year, era: date.era });
        // wsListeners.forEach(wsListener => wsListener.sendMessage(this.createNewMintMessage(tokenId, to)));
    }

    // private createNewMintMessage(tokenId: number, owner: string): string {
    //     const message = {
    //         type: MessageType.NEW_MINT,
    //         params: { tokenId, owner }
    //     };
    //     return JSON.stringify(message);
    // }
}