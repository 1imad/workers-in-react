import React, { useEffect, useState } from "react";
import { Spin } from "antd";

const createWorker = () =>
  new Worker(new URL("./markdownWorker.ts", import.meta.url), {
    type: "module",
  });

type MessageComponentProps = {
  markdownContent: string;
};

const MessageComponent: React.FC<MessageComponentProps> = ({
  markdownContent,
}) => {
  const [parsedHTML, setParsedHTML] = useState<string | null>(null);

  useEffect(() => {
    const worker = createWorker();
    worker.postMessage({ markdown: markdownContent });
    worker.onmessage = (event) => {
      setParsedHTML(event.data);
    };
    return () => {
      worker.terminate();
    };
  }, [markdownContent]);

  return (
    <div className="message-component">
      {parsedHTML ? (
        <div dangerouslySetInnerHTML={{ __html: parsedHTML }} />
      ) : (
        <div className="center">
          <Spin />
        </div>
      )}
    </div>
  );
};

export default MessageComponent;
