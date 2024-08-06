import {PublicKey, WebSocket} from '../import';

export async function subscribeToEvents(tokenKey: string, wssUri: string) {
  // Публичный ключ программы токена USDC
  const usdcProgramId = new PublicKey(tokenKey);

  // Используем WebSocket для подписки на события программы
  const ws = new WebSocket(wssUri);

  ws.onopen = () => {
    console.log('WebSocket connection established');
    ws.send(
      JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'programSubscribe',
        params: [
          usdcProgramId.toBase58(),
          {
            encoding: 'base64',
            commitment: 'confirmed',
          },
        ],
      })
    );
  };

  ws.on('message', data => {
    let parsedData;
    if (typeof data === 'string') {
      parsedData = JSON.parse(data);
    } else {
      parsedData = JSON.parse(data.toString());
    }
    console.log('Program account change:', parsedData?.params?.result);
  });

  ws.onerror = error => {
    console.error('WebSocket error:', error);
  };

  ws.onclose = () => {
    console.log('WebSocket connection closed');
  };
}
