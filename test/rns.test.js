const RNS = artifacts.require('RNS');

const { expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const namehash = require('eth-ens-namehash').hash;

contract('RNS', accounts => {
	let rns;

	beforeEach(async () => {
		rns = await RNS.new();
	});

	it('should allow owner to transfer node', async () => {
		const { tx } = await rns.setOwner('0x00', '0x0000000000000000000000000000000000001234', { from: accounts[0] });

    const owner = await	rns.owner('0x00');

    expect(owner).to.eq('0x0000000000000000000000000000000000001234');

    await expectEvent.inTransaction(
      tx,
      rns,
      'Transfer',
      {
        node: '0x0000000000000000000000000000000000000000000000000000000000000000',
        ownerAddress: '0x0000000000000000000000000000000000001234'
      }
    );
  });

  it('should not allow not owner to transfer node', async () => {
    await expectRevert.unspecified(
      rns.setOwner('0x00', '0x0000000000000000000000000000000000001234', { from: accounts[1] })
    );
  });

	it('should allow owner to set resolver', async () => {
		const { tx } = await rns.setResolver('0x00', '0x0000000000000000000000000000000000001234', { from: accounts[0] });

    const resolver = await	rns.resolver('0x00');

    expect(resolver).to.eq('0x0000000000000000000000000000000000001234');

    await expectEvent.inTransaction(
      tx,
      rns,
      'NewResolver',
      {
        node: '0x0000000000000000000000000000000000000000000000000000000000000000',
        resolverAddress: '0x0000000000000000000000000000000000001234'
      }
    );
  });

  it('should not allow not owner to set resolver', async () => {
    await expectRevert.unspecified(
      rns.setResolver('0x00', '0x0000000000000000000000000000000000001234', { from: accounts[1] })
    );
  });

	it('should allow owner to set ttl', async () => {
		const { tx } = await rns.setTTL('0x00', web3.utils.toBN('1000'), { from: accounts[0] });

    const ttl = await	rns.ttl('0x00');

    expect(ttl).to.be.bignumber.eq(web3.utils.toBN('1000'));

    await expectEvent.inTransaction(
      tx,
      rns,
      'NewTTL',
      {
        node: '0x0000000000000000000000000000000000000000000000000000000000000000',
        ttlValue: web3.utils.toBN('1000')
      }
    );
  });

  it('should not allow not owner to set resolver', async () => {
    await expectRevert.unspecified(
      rns.setTTL('0x00', web3.utils.toBN('1000'), { from: accounts[1] })
    );
  });

  it('should allow owner to set subnode owner', async () => {
		const { tx } = await rns.setSubnodeOwner('0x00', web3.utils.sha3('rsk'), '0x0000000000000000000000000000000000001234', { from: accounts[0] });

    const owner = await	rns.owner(namehash('rsk'));

    expect(owner).to.eq('0x0000000000000000000000000000000000001234');

    await expectEvent.inTransaction(
      tx,
      rns,
      'NewOwner',
      {
        node: '0x0000000000000000000000000000000000000000000000000000000000000000',
        label: web3.utils.sha3('rsk'),
        ownerAddress: '0x0000000000000000000000000000000000001234'
      }
    );
  });

  it('should not allow not owner to set subnode owner', async () => {
    await expectRevert.unspecified(
      rns.setSubnodeOwner('0x00', web3.utils.sha3('rsk'), '0x0000000000000000000000000000000000001234', { from: accounts[1] })
    );
  });
});
