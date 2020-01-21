# rns-registry

RNS Registry

## Install

```
npm i @rsksmart/rns-registry
```

## Usage

```solidity
pragma solidity ^0.5.0;

import "@rsksmart/rns-registry/contracts/AbstractRNS.sol";

contract Registrar {
  AbstractRNS rns;

  constructor(AbstractRNS _rns) public {
    rns = _rns;
  }
}
```

```js
const Web3 = require('web3');
const RNSRegistryData = require('@rsksmart/rns-registry/RNSRegistryData.json');

const web3 = new Web3('https://public-node.rsk.co')
const RNSRegistry = new web3.eth.Contract(RNSRegistryData.abi, RNSRegistryData.address.rskMainnet);
```

---

- [Docs](https://developers.rsk.co/rif/rns/architecture/Registry/)
- RSK Mainnet: [0xcb868aeabd31e2b66f74e9a55cf064abb31a4ad5](https://explorer.rsk.co/address/0xcb868aeabd31e2b66f74e9a55cf064abb31a4ad5)
- RSK Testnet: [0x7d284aaac6e925aad802a53c0c69efe3764597b8](https://explorer.testnet.rsk.co/address/0x7d284aaac6e925aad802a53c0c69efe3764597b8)
