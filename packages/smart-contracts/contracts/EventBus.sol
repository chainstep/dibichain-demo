// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";


/**
 * @title  Dibichain Event Bus Contract
 * @author CHAINSTEP GmbH
 * @notice The event bus contract acts as an event bus to distribute events to the Dibichain system.
 * @dev    In it's current state everyone is able to listen to events, but only the operator is allowed to issue events.
 */
contract EventBus is Ownable {
    /**
     * @notice Emitted when a new product should be announced
     * @param  uid - the unique id of the product
     * @param  productData - the public product data
     */
    event NewProduct(string indexed uid, ProductData productData);

    /**
     * @notice Emitted when a product details request should be announced
     * @param  uid - the unique id of the product
     * @param  productDetailsRequestData - the product details request data
     */
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
        string publicKey;
        string algorithm;
    }
    

    /**
     * @notice Broadcasts new product events
     * @param  productData - the public product data
     */
    function broadcastNewProduct(ProductData memory productData) public onlyOwner {
        emit NewProduct(productData.uid, productData);
    }


    /**
     * @notice Broadcasts product details request events
     * @param  productDetailsRequestData - the product details request data
     */
    function broadcastProductDetailsRequest(ProductDetailsRequestData memory productDetailsRequestData) public onlyOwner {
        emit ProductDetailsRequest(productDetailsRequestData.uid, productDetailsRequestData);
    }
}
