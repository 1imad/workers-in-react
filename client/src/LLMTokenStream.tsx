// src/LLMTokenStream.tsx
import React, { useEffect, useState } from "react";

// Web worker loader for Vite (or a dynamic import in other setups)
const createWorker = () =>
  new Worker(new URL("./sseWorker.ts", import.meta.url), { type: "module" });

type LLMTokenStreamProps = {
  sseUrl: string;
};

const LLMTokenStream: React.FC<LLMTokenStreamProps> = ({ sseUrl }) => {
  const [tokens, setTokens] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  useEffect(() => {
    const worker = createWorker();

    // Send the SSE URL to the worker to start the connection
    worker.postMessage({ url: sseUrl });

    // Listen for messages (tokens) from the worker
    worker.onmessage = (event) => {
      const { token, error, end } = event.data;

      if (error) {
        setError(error);
      } else if (end) {
        // Handle the end of the stream
        setIsComplete(true);
      } else if (token) {
        // Append the new token to the tokens array
        setTokens((prevTokens) => [...prevTokens, token]);
      }
    };

    // Clean up the worker when the component unmounts
    return () => {
      worker.terminate();
    };
  }, [sseUrl]);

  return (
    <div>
      <h2>LLM Token Stream</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <div className="tokens">
            {tokens.map((token, index) => (
              <span key={index} className="token">
                {token}
              </span>
            ))}
          </div>
          {isComplete && <p>Stream has ended.</p>}
          {tokens.length === 0 && !isComplete && <p>Waiting for tokens...</p>}
        </div>
      )}
    </div>
  );
};

export default LLMTokenStream;
