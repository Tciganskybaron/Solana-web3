import {
  createUmi,
  mplTokenMetadata,
  fetchJsonMetadata,
  deserializeMetadata,
  findMetadataPda,
  JsonMetadata,
  fromWeb3JsPublicKey,
  PublicKey,
} from '../import';

export async function getMetadaToken(
  httpsEnpoint: string,
  tokenKey: string
): Promise<JsonMetadata | undefined> {
  const umi = createUmi(httpsEnpoint).use(mplTokenMetadata());

  const mintPubkey = new PublicKey(tokenKey);
  const pda = findMetadataPda(umi, {
    mint: fromWeb3JsPublicKey(mintPubkey),
  });
  const acct = await umi.rpc.getAccount(pda[0]);
  if (!acct.exists) return undefined;

  const metadata = deserializeMetadata(acct);
  const jsonMetadata = await fetchJsonMetadata(umi, metadata.uri);

  return jsonMetadata;
}
