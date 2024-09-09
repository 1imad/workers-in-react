// src/App.tsx
import React from "react";
import MessageComponent from "./Message";
import LLMTokenStream from "./LLMTokenStream";

const markdownText = `
# Hello Markdown

This is some **Markdown** content parsed using a web worker!

- Item 1
- Item 2

[Link](https://example.com)
`;

const App: React.FC = () => {
  const sseUrl = "http://localhost:3000/llm-token-stream";
  return (
    <div className="App">
      <h1>Markdown Renderer with Web Worker</h1>
      <MessageComponent markdownContent={markdownText} />
      <h1>LLM Token Stream Example</h1>
      <LLMTokenStream sseUrl={sseUrl} />
    </div>
  );
};

export default App;
