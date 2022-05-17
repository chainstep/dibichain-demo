import { ethers } from 'hardhat';
import { Greeter__factory } from '../typechain';


async function main() {
    const greeterFactory = <Greeter__factory> await ethers.getContractFactory("Greeter");
    const greeter = await greeterFactory.deploy();
    await greeter.deployed();
    
    console.log("Greeter deployed to:", greeter.address);
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});