import { IMyProductDetailsRequestStore } from "../../../storage/my-product-details-request/IMyProductDetailsRequestStore";
import { IntervalService } from "../../IntervalHandler";


export interface ProductDetailsRequestTimeoutServiceOptions {
    getMyProductDetailsRequestStore: () => IMyProductDetailsRequestStore;
    timeoutMin: number
}


export class ProductDetailsRequestTimeoutService implements IntervalService {
    private readonly getMyProductDetailsRequestStore: () => IMyProductDetailsRequestStore;
    private readonly timeout: number;


    constructor(options: ProductDetailsRequestTimeoutServiceOptions) {
        this.getMyProductDetailsRequestStore = options.getMyProductDetailsRequestStore;
        this.timeout = options.timeoutMin * 60;
    }


    public async run(): Promise<void> {
        const myProductDetailsRequestStore = this.getMyProductDetailsRequestStore();

        const myProductDetailsRequests = await myProductDetailsRequestStore.find({});
        const notRespondedRequests = myProductDetailsRequests.filter((myProductDetailsRequest) => {
            return !myProductDetailsRequest.responded;
        });

        const now = Math.floor(new Date().getTime() / 1000);
        for (let i = 0 ; i < notRespondedRequests.length ; i++) {
            const notRespondedRequest = notRespondedRequests[i];

            if (this.isTimeout(notRespondedRequest.timestamp, now)) {
                notRespondedRequest.responded = true;
                await myProductDetailsRequestStore.upsert(notRespondedRequest);
            }
        }
    }

    private isTimeout(timestamp: number, now: number): boolean {
        return timestamp + this.timeout <= now;
    }
}