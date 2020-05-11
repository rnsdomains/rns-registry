<p align="middle">
    <img src="https://www.rifos.org/assets/img/logo.svg" alt="logo" height="100" >
</p>
<h3 align="middle"><code>rns-registry</code></h3>
<p align="middle">
    RNS Registry
</p>
<p align="middle">
    <a href="https://circleci.com/gh/rnsdomains/rns-registry">
        <img src="https://circleci.com/gh/rnsdomains/rns-registry.svg?style=svg" alt="CircleCI" />
    </a>
    <a href="https://badge.fury.io/js/%40rsksmart%2Frns-registry">
        <img src="https://badge.fury.io/js/%40rsksmart%2Frns-registry.svg" alt="npm" />
    </a>
    <a href="https://developers.rsk.co/rif/rns/architecture/registry/">
      <img src="https://img.shields.io/badge/-docs-brightgreen" alt="docs" />
    </a>
    <a href="https://developers.rsk.co/rif/rns/specs/registry/">
      <img src="https://img.shields.io/badge/-specs-lightgrey" alt="specs" />
    </a>
</p>

```
npm i @rsksmart/rns-registry
```

Deployments:
- RSK Mainnet: [0xcb868aeabd31e2b66f74e9a55cf064abb31a4ad5](https://explorer.rsk.co/address/0xcb868aeabd31e2b66f74e9a55cf064abb31a4ad5)
- RSK Testnet: [0x7d284aaac6e925aad802a53c0c69efe3764597b8](https://explorer.testnet.rsk.co/address/0x7d284aaac6e925aad802a53c0c69efe3764597b8)

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

