// Copyright 2017-2025 @polkadot/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { TypeRegistry } from '@polkadot/types/create';
import { BN } from '@polkadot/util';

import { isClaimable } from './isClaimable.js';

describe('Is claimable', () => {
  const registry = new TypeRegistry();
  const accountAddress = '5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM';
  const beneficiaryId = registry.createType('AccountId', accountAddress);

  it('returns false, when payout due is greater than 0', () => {
    const accounts = [accountAddress];
    const payoutDue = new BN('1');

    expect(isClaimable(accounts, beneficiaryId, payoutDue)).toBe(false);
  });

  it('returns false, when payout due is equal 0', () => {
    const accounts = [accountAddress];
    const payoutDue = new BN('0');

    expect(isClaimable(accounts, beneficiaryId, payoutDue)).toBe(false);
  });

  it('returns true, when payout due is lesser than 0 and beneficiary is among accounts', () => {
    const accounts = [accountAddress];
    const payoutDue = new BN('-1');

    expect(isClaimable(accounts, beneficiaryId, payoutDue)).toBe(true);
  });

  it('returns false, when beneficiary is not among accounts', () => {
    const accounts = ['This_is_not_the_treasury_address_27Tt8tkntv6Q7JVPhFsTB'];
    const payoutDue = new BN('-1');

    expect(isClaimable(accounts, beneficiaryId, payoutDue)).toBe(false);
  });
});
