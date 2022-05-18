// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";


contract EventBus is Ownable  {
    event NewProduct(Product product);
    event ProductDetailsRequest(string uid, string pubKey, string algorithm);

    struct Product {
        string uid;
        string id;
        string name;
        string Type;
        string number;
        string hash;
    }
    

    function broadcastNewProduct(Product memory product) public onlyOwner {
        emit NewProduct(product);
    }


    function broadcastProductDetailsRequest(string memory uid, string memory pubKey, string memory algorithm) public onlyOwner {
        emit ProductDetailsRequest(uid, pubKey, algorithm);
    }
}
