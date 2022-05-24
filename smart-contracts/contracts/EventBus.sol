// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";


contract EventBus is Ownable  {
    event NewProduct(string indexed uid, ProductData productData);
    event ProductDetailsRequest(string indexed uid, ProductDetailsRequestData productDetailsRequestData);

    struct ProductData {
        string uid;
        string id;
        string name;
        string Type;
        string number;
        string hash;
    }

    struct ProductDetailsRequestData {
        string uid;
        string pubKey;
        string algorithm;
    }
    

    function broadcastNewProduct(ProductData memory productData) public onlyOwner {
        emit NewProduct(productData.uid, productData);
    }


    function broadcastProductDetailsRequest(ProductDetailsRequestData memory productDetailsRequestData) public onlyOwner {
        emit ProductDetailsRequest(productDetailsRequestData.uid, productDetailsRequestData);
    }
}
