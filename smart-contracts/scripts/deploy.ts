import { ethers } from 'hardhat';
import { EventBus__factory } from '../typechain';


async function main() {
    const eventBusFactory = <EventBus__factory> await ethers.getContractFactory("EventBus");
    const eventBus = await eventBusFactory.deploy();
    await eventBus.deployed();
    
    console.log("EventBus deployed to:", eventBus.address);
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});