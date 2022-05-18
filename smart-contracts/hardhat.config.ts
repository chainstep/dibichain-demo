import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import dotenv from "dotenv";
import "hardhat-contract-sizer";
import "hardhat-gas-reporter";
import { HardhatUserConfig } from "hardhat/types";
import "solidity-coverage";


if (process.env.REMOTE === "true") {
    dotenv.config({ path: __dirname + "/.env-remote" });
} else if (process.env.LOCAL === "true") {
    dotenv.config({ path: __dirname + "/.env-local" });
} else {
    dotenv.config();
}


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
        ganache: {
            url: process.env.PROVIDER_URL || "",
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
