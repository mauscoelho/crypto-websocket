/** eslint-disable react-hooks/exhaustive-deps */
/** eslint-disable @typescript-eslint/no-unused-vars */
/** eslint-disable @typescript-eslint/no-unused-vars */
/** eslint-disable no-empty */
/** eslint-disable @typescript-eslint/no-unused-vars */
/** eslint-disable no-empty */
/** eslint-disable react-hooks/exhaustive-deps */
/** eslint-disable @typescript-eslint/no-unused-vars */
/** eslint-disable @typescript-eslint/no-unused-vars */
/** eslint-disable @typescript-eslint/no-unused-vars */
/** eslint-disable @typescript-eslint/no-unused-vars */
/** eslint-disable @typescript-eslint/no-unused-vars */
/** eslint-disable @typescript-eslint/no-unused-vars */
/** eslint-disable @typescript-eslint/no-unused-vars */
/** eslint-disable @typescript-eslint/no-unused-vars */
/** eslint-disable @typescript-eslint/no-unused-vars */
/** eslint-disable @typescript-eslint/no-unused-vars */
/** eslint-disable @typescript-eslint/no-unused-vars */
/** eslint-disable @typescript-eslint/no-unused-vars */
/** eslint-disable @typescript-eslint/no-unused-vars */
/** eslint-disable @typescript-eslint/no-unused-vars */
/** eslint-disable prefer-const */
/** eslint-disable @typescript-eslint/no-unused-vars */
/** eslint-disable no-var */
/** eslint-disable @typescript-eslint/no-unused-vars */
/** eslint-disable prefer-const */
/** eslint-disable no-var */
/** eslint-disable @typescript-eslint/no-unused-vars */
import type { MetaFunction } from "@remix-run/node";
import { useEffect, useRef, useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [message, setMessage] = useState<{ [key: string]: number }>({})
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [name, setName] = useState()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const ws = useRef(null)


  useEffect(() => {
    const msg =
    {
      "jsonrpc": "2.0",
      "method": "public/subscribe",
      "id": 42,
      "params": {
        "channels": ["trades.future.BTC.100ms"]
      }
    };
    const ws = new WebSocket('wss://test.deribit.com/ws/api/v2');

    ws.onmessage = function(e) {
      const data = JSON.parse(e.data);
      if (data.method === 'subscription') {
        console.log(data, 'data')
        console.log(message, 'message')
        for (let i = 0; i < data.params.data.length; i++) {
          const newData = data.params.data[i];

          if (message[newData.instrument_name]) {
            message[newData.instrument_name] = newData.amount + message[newData.instrument_name]
            setMessage({ ...message })
          } else {
            message[newData.instrument_name] = newData.amount
            setMessage({ ...message })
          }
        }
      }
    };
    ws.onopen = function() {
      ws.send(JSON.stringify(msg));
    };

    return () => {
      ws.close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const newMessage = Object.entries(message)

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>

      {newMessage.map(item => {
        return (
          <div key={item[0]}>
            <p>{item[0]}</p>
            <p>{item[1]}</p>
          </div>
        )
      })}
    </div>
  );
}
