/* eslint-disable n/no-unpublished-import */
import {describe, expect, jest, test, beforeEach} from '@jest/globals';
import {getMetadaToken} from '../src/functions/getMetadataToken';
import {mocked} from 'jest-mock';
import {HTTPS_ENDPOINT} from '../src/config';

jest.mock('../src/functions/getMetadataToken');
const mockGetMetadataToken = mocked(getMetadaToken);

describe('getMetadataToken function', () => {
  beforeEach(() => {
    mockGetMetadataToken.mockClear();
    jest.clearAllMocks();
  });

  test('should call getMetadataToken with correct parameters', async () => {
    const tokenKey = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
    const httpsUri = HTTPS_ENDPOINT;

    await mockGetMetadataToken(httpsUri, tokenKey);

    // Ensure subscribeToEvents was called with the correct parameters
    expect(mockGetMetadataToken).toHaveBeenCalledWith(httpsUri, tokenKey);
    expect(mockGetMetadataToken).toHaveBeenCalledTimes(1);
  });
});
