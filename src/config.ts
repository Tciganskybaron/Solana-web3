require('dotenv').config();

export const HTTPS_ENDPOINT = process.env.HTTPS_ENDPOINT
  ? process.env.HTTPS_ENDPOINT
  : '';

export const WSS_ENDPOINT = process.env.WSS_ENDPOINT
  ? process.env.WSS_ENDPOINT
  : '';

export const PRIVATE_KEY = process.env.PRIVATE_KEY
  ? process.env.PRIVATE_KEY
  : '';

export const SECOND_WALLET_PUBLIC_KEY = process.env.SECOND_WALLET_PUBLIC_KEY
  ? process.env.SECOND_WALLET_PUBLIC_KEY
  : '';
