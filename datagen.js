const fs = require('fs');
const rnsRegistryBuild = require('./build/contracts/RNS');
const rnsRegistryAddresses = require('./addresses');

const data = {
  abi: rnsRegistryBuild.abi,
  bytecode: rnsRegistryBuild.bytecode,
  address: {
    rskMainnet: rnsRegistryAddresses.RNS.rskMainnet,
    rskTestnet: rnsRegistryAddresses.RNS.rskTestnet,
  },
};

fs.writeFileSync('./RNSRegistryData.json', JSON.stringify(data));
