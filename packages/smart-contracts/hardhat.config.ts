import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-contract-sizer";
import "hardhat-gas-reporter";
import { HardhatUserConfig } from "hardhat/types";
import "solidity-coverage";


const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.4",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    },
    networks: {
        hardhat: {
            initialBaseFeePerGas: 0, // workaround from https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136 . Remove when that issue is closed.
        },
        evm: {
            url: process.env.RPC_URL || "",
            accounts: process.env.DEPLOYER_SECRET !== undefined ? [process.env.DEPLOYER_SECRET] : []
        }
    },
    typechain: {
        outDir: "typechain",
        target: "ethers-v5",
    },
    contractSizer: {
        runOnCompile: true
    }
};

export default config;
