import { ethers } from "hardhat";
import { Linker, Linker__factory } from "../../typechain";


export async function deploy(): Promise<Linker> {
    const linkerFactory = <Linker__factory> await ethers.getContractFactory("Linker");
    const linker = await linkerFactory.deploy();
    await linker.deployed();
    return linker;
}