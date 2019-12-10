pragma solidity ^0.5.0;

import './AbstractRNS.sol';

/// @title RNS Registry
contract RNS is AbstractRNS {
    struct Record {
        address owner;
        address resolver;
        uint64 ttl;
    }

    mapping(bytes32=>Record) records;

    modifier only_owner(bytes32 node) {
        require(records[node].owner == msg.sender);
        _;
    }

    constructor() public {
        records[bytes32(0)].owner = msg.sender;
    }

    /// @notice Returns the current owner of a domain.
    /// @param node namehash of the domain.
    /// @return The owner of the domain.
    function owner(bytes32 node) public view returns (address) {
        return records[node].owner;
    }

    /// @notice Returns the current resolver of a domain.
    /// @param node namehash of the domain.
    /// @return The resolver of the domain.
    function resolver(bytes32 node) public view returns (address) {
        return records[node].resolver;
    }

    /// @notice Returns the time to live of a domain and any records
    /// associated with it.
    /// @param node namehash of the domain.
    /// @return The ttl of the domain.
    function ttl(bytes32 node) public view returns (uint64) {
        return records[node].ttl;
    }

    /// @notice Transfers ownership of a domain.
    /// @dev Only owner of the node.
    /// @param node namehash of the domain to transfer ownership of.
    /// @param ownerAddress The new owner.
    function setOwner(bytes32 node, address ownerAddress) public only_owner(node) {
        emit Transfer(node, ownerAddress);
        records[node].owner = ownerAddress;
    }

    /// @notice Transfers ownership of label.node subdomain.
    /// @dev Only owner of the parent domain.
    /// @param node namehash of the parent domain.
    /// @param label keccak256 of the label specifying the subnode.
    /// @param ownerAddress The new owner.
    function setSubnodeOwner(bytes32 node, bytes32 label, address ownerAddress) public only_owner(node) {
        bytes32 subnode = keccak256(abi.encodePacked(node, label));
        emit NewOwner(node, label, ownerAddress);
        records[subnode].owner = ownerAddress;

        emit NewResolver(subnode, records[node].resolver);
        records[subnode].resolver = records[node].resolver;
    }

    /// @notice Sets the resolver of a given node.
    /// @dev Only owner of the node.
    /// @param node namehash of the domain to set the resolver of.
    /// @param resolverAddress The new resolver.
    function setResolver(bytes32 node, address resolverAddress) public only_owner(node) {
        emit NewResolver(node, resolverAddress);
        records[node].resolver = resolverAddress;
    }

    /// @notice Sets the time to live of a given node.
    /// @dev Only owner of the node.
    /// @param node namehash of the domain to set the ttl of.
    /// @param ttlValue The new ttl.
    function setTTL(bytes32 node, uint64 ttlValue) public only_owner(node) {
        emit NewTTL(node, ttlValue);
        records[node].ttl = ttlValue;
    }

    /// @notice Sets the root node resolver.
    /// @dev Only owner of the root node.
    /// @param _resolver The new resolver.
    function setDefaultResolver(address _resolver) public only_owner(0) {
        records[bytes32(0)].resolver = _resolver;
    }
}
