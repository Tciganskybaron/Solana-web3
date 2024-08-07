/* eslint-disable n/no-unpublished-import */
import {describe, expect, jest, test, beforeEach} from '@jest/globals';
import {subscribeToEvents} from '../src/functions/subscribeToEvents';
import {mocked} from 'jest-mock';
import {WSS_ENDPOINT} from '../src/config';

jest.mock('../src/functions/subscribeToEvents');
const mockSubscribeToEvents = mocked(subscribeToEvents);

describe('subscribeToEvents function', () => {
  beforeEach(() => {
    mockSubscribeToEvents.mockClear();
    jest.clearAllMocks();
  });

  test('should call subscribeToEvents with correct parameters', async () => {
    const tokenKey = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
    const wssUri = WSS_ENDPOINT;

    await subscribeToEvents(tokenKey, wssUri);

    // Ensure subscribeToEvents was called with the correct parameters
    expect(mockSubscribeToEvents).toHaveBeenCalledWith(tokenKey, wssUri);
    expect(mockSubscribeToEvents).toHaveBeenCalledTimes(1);
  });
});
