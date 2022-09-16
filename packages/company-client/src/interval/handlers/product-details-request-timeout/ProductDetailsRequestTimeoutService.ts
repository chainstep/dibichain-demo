import { IMyProductDetailsRequestStore } from "../../../storage/my-product-details-request/IMyProductDetailsRequestStore";
import { IntervalService } from "../../IntervalHandler";


interface Options {
    myProductDetailsRequestStore: IMyProductDetailsRequestStore;
    timeoutMin: number
}


export class ProductDetailsRequestTimeoutService implements IntervalService {
    constructor(private readonly options: Options) {}


    public async run(): Promise<void> {
        const myProductDetailsRequests = await this.options.myProductDetailsRequestStore.find({});
        const notRespondedRequests = myProductDetailsRequests.filter((myProductDetailsRequest) => {
            return !myProductDetailsRequest.responded;
        });

        const now = Math.floor(new Date().getTime() / 1000);
        for (let i = 0 ; i < notRespondedRequests.length ; i++) {
            const notRespondedRequest = notRespondedRequests[i];

            if (this.isTimeout(notRespondedRequest.timestamp, now)) {
                notRespondedRequest.responded = true;
                await this.options.myProductDetailsRequestStore.upsert(notRespondedRequest);
            }
        }
    }

    private isTimeout(timestamp: number, now: number): boolean {
        return timestamp + (this.options.timeoutMin * 60) <= now;
    }
}