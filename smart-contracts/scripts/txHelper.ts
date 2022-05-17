import { ContractTransaction } from "ethers";


export async function untilSettled(transaction: Promise<ContractTransaction>): Promise<void> {
    const tx = await transaction;
    await tx.wait();
}