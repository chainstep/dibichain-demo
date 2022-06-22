# Dibichain Demonstrator

## General

This repository hosts the source code of the Dibichain demonstrator. In general, the Idea of the Dibichain is to provide product information to unknown participants without revealing the origin of these products. To do so, it uses an EVM based smart contract as an event bus to broadcast the announcement of new products and interests in product details. A participant is able to ether announce new products that one is in control of or request details of products that one is interested in. Announcing a product requires revealing public available, non critical product information that everybody is able to see. Requesting product information is an anonymous process where the requester is only identified by a one-time public key that is dynamically generated for each request. Responses to these requests are encrypted with the help of the requesters public keys, so that only the requester is able to see the detailed product information.

To reduce complexity, a so called operator is used to issue transactions to the contract and to route messages between participants. Since the operator is a central entity and acts as a man-in-the-middle, all participant are required to trust the operator. For further development it is recommended to erase the operator from the Dibichain system and use a true peer-to-peer approach.

The following diagram should give a high level overview of the described Dibichain demonstrator:
![](docs/plantuml/out/flow-high-level.svg)


### 




- company A: Logistex
  - frontend: https://www.logistex.dibichain.de
  - client: https://api.logistex.dibichain.de
- company B: Logistly
  - frontend: https://www.logistly.dibichain.de
  - client: https://api.logistly.dibichain.de
- operator
  - url: https://api.operator.dibichain.de