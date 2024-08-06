import {PublicKey, Metadata, MetadataData, Connection} from '../import';

export async function getMetadaToken(
  tokenKey: string,
  connection: Connection
): Promise<MetadataData> {
  const mintPubkey = new PublicKey(tokenKey);
  const tokenmetaPubkey = await Metadata.getPDA(mintPubkey);

  const tokenmeta = await Metadata.load(connection, tokenmetaPubkey);

  return tokenmeta.data;
}
