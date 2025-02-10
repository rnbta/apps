// Copyright 2017-2025 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BN } from '@polkadot/util';
import type { ExternalDef } from './types.js';

import { externalSubscanPNG } from '../ui/logos/external/index.js';

export const Subscan: ExternalDef = {
  chains: {
    Acala: 'acala',
    'Acala Mandala TC5': 'acala-testnet',
    Ajuna: 'ajuna',
    'Ajuna Polkadot': 'ajuna',
    'Aleph Zero': 'alephzero',
    'Aleph Zero Testnet': 'alephzero-testnet',
    Altair: 'altair',
    AssetHub: 'assethub-polkadot',
    Astar: 'astar',
    Autonomys: 'autonomys',
    'Bajun Kusama': 'bajun',
    Basilisk: 'basilisk',
    Bifrost: 'bifrost-kusama',
    'Bifrost Polkadot': 'bifrost',
    BridgeHub: 'bridgehub-polkadot',
    'Calamari Parachain': 'calamari',
    Centrifuge: 'centrifuge',
    ChainX: 'chainx',
    Clover: 'clover',
    Collectives: 'collectives-polkadot',
    'Composable Finance': 'composable',
    Continuum: 'continuum',
    'Continuum Network': 'continuum',
    Coretime: 'coretime-polkadot',
    Crab2: 'crab',
    Creditcoin: 'creditcoin',
    'Creditcoin3 Testnet': 'creditcoin3-testnet',
    Crust: 'crust',
    'Crust Network': 'crust-parachain',
    'Crust Shadow': 'shadow',
    Darwinia: 'darwinia',
    Darwinia2: 'darwinia',
    Dock: 'dock',
    'Dolphin Parachain Testnet': 'dolphin',
    'Energy Web X': 'energywebx',
    Humanode: 'humanode',
    'Humanode Mainnet': 'humanode',
    Hydration: 'hydration',
    'Integritee Network (Kusama)': 'integritee',
    Interlay: 'interlay',
    Joystream: 'joystream',
    'KILT Peregrine': 'kilt-testnet',
    'KILT Spiritnet': 'spiritnet',
    Karura: 'karura',
    Khala: 'khala',
    Kusama: 'kusama',
    'Kusama Asset Hub': 'assethub-kusama',
    'Mangata Kusama Mainnet': 'mangatax',
    Manta: 'manta',
    'Moonbase Alpha': 'moonbase',
    Moonbeam: 'moonbeam',
    Moonriver: 'moonriver',
    Mythos: 'mythos',
    NeuroWeb: 'neuroweb',
    'NeuroWeb Testnet': 'neuroweb-testnet',
    Nodle: 'nodle',
    'Nodle Parachain': 'nodle',
    'OPAL by UNIQUE': 'opal',
    'Paseo Testnet': 'paseo',
    Peaq: 'peaq',
    Pendulum: 'pendulum',
    People: 'people-polkadot',
    Phala: 'phala',
    'Phala Network': 'phala',
    Picasso: 'picasso',
    'Pioneer Network': 'pioneer',
    Polimec: 'polimec',
    Polkadex: 'polkadex-parachain',
    Polkadot: 'polkadot',
    'Polkadot Asset Hub': 'assethub-polkadot',
    Polymesh: 'polymesh',
    'Polymesh Mainnet': 'polymesh',
    'Polymesh Testnet': 'polymesh-testnet',
    'QUARTZ by UNIQUE': 'quartz',
    Robonomics: 'robonomics',
    Rococo: 'rococo',
    'Rococo Asset Hub': 'assethub-rococo',
    'Rococo BridgeHub': 'bridgeHub-rococo',
    'Rococo Coretime': 'coretime-rococo',
    SORA: 'sora',
    'Shibuya Testnet': 'shibuya',
    Shiden: 'shiden',
    Stafi: 'stafi',
    'Turing Network': 'turing',
    UNIQUE: 'unique',
    Unique: 'unique',
    Vara: 'vara',
    'Vara Network': 'vara',
    Westend: 'westend',
    Zeitgeist: 'zeitgeist',
    kintsugi: 'kintsugi'
  },
  create: (chain: string, path: string, data: BN | number | string): string =>
    `https://${chain}.subscan.io/${path}/${data.toString()}`,
  homepage: 'https://subscan.io/',
  isActive: true,
  paths: {
    address: 'account',
    block: 'block',
    bounty: 'bounty',
    council: 'council',
    democracyProposal: 'democracy_proposal',
    democracyReferendum: 'referenda',
    extrinsic: 'extrinsic',
    fellowshipReferenda: 'fellowship',
    referenda: 'referenda_v2',
    techcomm: 'tech',
    tip: 'treasury_tip',
    treasury: 'treasury',
    validator: 'validator'
  },
  ui: {
    logo: externalSubscanPNG
  }
};
