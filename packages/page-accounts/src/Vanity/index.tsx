// Copyright 2017-2025 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ActionStatus } from '@polkadot/react-components/Status/types';
import type { KeypairType } from '@polkadot/util-crypto/types';
import type { GeneratorMatch, GeneratorMatches, GeneratorResult } from '@polkadot/vanitygen/types';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Button, Dropdown, Input, styled, Table } from '@polkadot/react-components';
import { useApi, useIsMountedRef } from '@polkadot/react-hooks';
import { settings } from '@polkadot/ui-settings';
import { nextTick } from '@polkadot/util';
import generator from '@polkadot/vanitygen/generator';
import matchRegex from '@polkadot/vanitygen/regex';
import generatorSort from '@polkadot/vanitygen/sort';

import CreateModal from '../modals/Create.js';
import { useTranslation } from '../translate.js';
import Match from './Match.js';

interface Props {
  className?: string;
  onStatusChange: (status: ActionStatus) => void;
}

interface MatchState {
  isMatchValid: boolean;
  match: string;
}

interface Results {
  elapsed: number;
  isRunning: boolean;
  keyCount: number;
  keyTime: number;
  matches: GeneratorMatches;
  startAt: number;
}

const DEFAULT_MATCH = 'Some';
const BOOL_OPTIONS = [
  { text: 'No', value: false },
  { text: 'Yes', value: true }
];

function VanityApp ({ className = '', onStatusChange }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api, isEthereum } = useApi();
  const results = useRef<GeneratorResult[]>([]);
  const runningRef = useRef(false);
  const mountedRef = useIsMountedRef();
  const [createSeed, setCreateSeed] = useState<string | null>(null);
  const [{ elapsed, isRunning, keyCount, matches }, setResults] = useState<Results>({
    elapsed: 0,
    isRunning: false,
    keyCount: -1,
    keyTime: 0,
    matches: [],
    startAt: 0
  });
  const [{ isMatchValid, match }, setMatch] = useState<MatchState>({ isMatchValid: true, match: DEFAULT_MATCH });
  const [type, setType] = useState<KeypairType>('ed25519');
  const [withCase, setWithCase] = useState(true);

  const _clearSeed = useCallback(
    () => setCreateSeed(null),
    []
  );

  const _checkMatches = useCallback(
    (): void => {
      const checks = results.current;

      results.current = [];

      if (checks.length === 0 || !mountedRef.current) {
        return;
      }

      setResults(
        ({ isRunning, keyCount, keyTime, matches, startAt }: Results): Results => {
          let newKeyCount = keyCount;
          let newKeyTime = keyTime;
          const newMatches = checks.reduce((result, { elapsed, found }): GeneratorMatch[] => {
            newKeyCount += found.length;
            newKeyTime += elapsed;

            return result.concat(found);
          }, matches);

          return {
            elapsed: Date.now() - startAt,
            isRunning,
            keyCount: newKeyCount,
            keyTime: newKeyTime,
            matches: newMatches.sort(generatorSort).slice(0, 25),
            startAt
          };
        }
      );
    },
    [mountedRef]
  );

  const _executeGeneration = useCallback(
    (): void => {
      if (!runningRef.current) {
        return _checkMatches();
      }

      nextTick((): void => {
        if (mountedRef.current) {
          if (results.current.length === 25) {
            _checkMatches();
          }

          results.current.push(
            generator({ match, runs: 10, ss58Format: api.registry.chainSS58 || 0, type, withCase, withHex: true })
          );

          _executeGeneration();
        }
      });
    },
    [_checkMatches, api, match, mountedRef, runningRef, type, withCase]
  );

  const _onChangeMatch = useCallback(
    (match: string): void => setMatch({
      isMatchValid:
        matchRegex.test(match) &&
        (match.length !== 0) &&
        (match.length < 31),
      match
    }),
    []
  );

  const _onRemove = useCallback(
    (address: string): void => setResults(
      (results: Results): Results => ({
        ...results,
        matches: results.matches.filter((item) => item.address !== address)
      })
    ),
    []
  );

  const _toggleStart = useCallback(
    (): void => setResults(
      ({ elapsed, isRunning, keyCount, keyTime, matches, startAt }: Results): Results => ({
        elapsed,
        isRunning: !isRunning,
        keyCount: isRunning ? keyCount : 0,
        keyTime: isRunning ? keyTime : 0,
        matches,
        startAt: isRunning ? startAt : Date.now()
      })
    ),
    []
  );

  useEffect((): void => {
    runningRef.current = isRunning;

    if (isRunning) {
      _executeGeneration();
    }
  }, [_executeGeneration, isRunning]);

  const header = useMemo<[React.ReactNode?, string?, number?][]>(
    () => [
      [t('matches'), 'start', 2],
      [t('Evaluated {{count}} keys in {{elapsed}}s ({{avg}} keys/s)', {
        replace: {
          avg: (keyCount / (elapsed / 1000)).toFixed(3),
          count: keyCount,
          elapsed: (elapsed / 1000).toFixed(2)
        }
      }), 'start --digits'],
      [t('secret'), 'start'],
      []
    ],
    [elapsed, keyCount, t]
  );

  return (
    <StyledDiv className={className}>
      <div className='ui--row'>
        <Input
          autoFocus
          className='medium'
          isDisabled={isRunning}
          isError={!isMatchValid}
          label={t('Search for')}
          onChange={_onChangeMatch}
          onEnter={_toggleStart}
          value={match}
        />
        <Dropdown
          className='medium'
          isDisabled={isRunning}
          label={t('case sensitive')}
          onChange={setWithCase}
          options={BOOL_OPTIONS}
          value={withCase}
        />
      </div>
      <div className='ui--row'>
        <Dropdown
          className='medium'
          defaultValue={type}
          label={t('keypair crypto type')}
          onChange={setType}
          options={isEthereum ? settings.availableCryptosEth : settings.availableCryptos}
        />
      </div>
      <Button.Group>
        <Button
          icon={
            isRunning
              ? 'stop'
              : 'sign-in-alt'
          }
          isDisabled={!isMatchValid}
          label={
            isRunning
              ? t('Stop generation')
              : t('Start generation')
          }
          onClick={_toggleStart}
        />
      </Button.Group>
      {matches.length !== 0 && (
        <>
          <article className='warning centered'>{t('Ensure that you utilized the "Save" functionality before using a generated address to receive funds. Without saving the address and the associated seed any funds sent to it will be lost.')}</article>
          <Table
            className='vanity--App-matches'
            empty={t('No matches found')}
            header={header}
          >
            {matches.map((match): React.ReactNode => (
              <Match
                {...match}
                key={match.address}
                onCreateToggle={setCreateSeed}
                onRemove={_onRemove}
              />
            ))}
          </Table>
        </>
      )}
      {createSeed && (
        <CreateModal
          onClose={_clearSeed}
          onStatusChange={onStatusChange}
          seed={createSeed}
          type={type}
        />
      )}
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  .vanity--App-matches {
    overflow-x: auto;
    padding: 1em 0;
  }

  .vanity--App-stats {
    padding: 1em 0 0 0;
    opacity: 0.45;
    text-align: center;
  }
`;

export default React.memo(VanityApp);
