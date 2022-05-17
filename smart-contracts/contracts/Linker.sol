// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";


contract Linker {
    enum VerificationState {
        NONE,
        ONE_WAY,
        TWO_WAYS
    }

    struct Claim {
        string key;
        string value;
    }

    struct Link {
        VerificationState state;
        address from;
        address to;
        string dataHash;
        string tag;
        Claim[] claims;
    }

    mapping(string => Link) private linkMap;


    function createLink(
        address from,
        address to,
        string memory dataHash,
        string memory tag,
        Claim[] memory claims,
        bytes memory signature
    ) public {
        // string memory linkHash = "ssss";
        Link memory link = Link({
            state: VerificationState.NONE,
            from: from,
            to: to,
            dataHash: dataHash,
            tag: tag,
            claims: claims
        });

        bytes32 hash = createHash(link);
        require(isSignedByAddress(abi.encodePacked(hash), from, signature), "Link is not signed by 'from' address");

        link.state = VerificationState.ONE_WAY;
    }

    function isSignedByAddress(bytes memory message, address signer, bytes memory signature) public pure returns (bool) {
        bytes32 hash = ECDSA.toEthSignedMessageHash(message);
        (address recovered, ECDSA.RecoverError error) = ECDSA.tryRecover(hash, signature);
        return error == ECDSA.RecoverError.NoError && recovered == signer;
    }

    function createHash(Link memory link) private pure returns (bytes32) {
        bytes memory normalizedLink = abi.encodePacked(
            addressToString(link.from),
            addressToString(link.to),
            link.dataHash,
            link.tag,
            stringifyClaims(link.claims)
        );
        return sha256(normalizedLink);
    }

    function addressToString(address _address) private pure returns (string memory) {
        return Strings.toHexString(uint256(uint160(_address)));
    }

    function stringifyClaims(Claim[] memory claims) private pure returns (string memory) {
        string memory claimString = "";
        for (uint i = 0 ; i < claims.length ; i++) {
            claimString = string(abi.encodePacked(claimString, claims[i].key, claims[i].value));
        }
        return claimString;
    }
}
