import { ethers } from "hardhat";
import { EventBus, EventBus__factory } from "../../typechain";


export async function deploy(): Promise<EventBus> {
    const eventBusFactory = <EventBus__factory> await ethers.getContractFactory("EventBus");
    const eventBus = await eventBusFactory.deploy();
    await eventBus.deployed();
    return eventBus;
}