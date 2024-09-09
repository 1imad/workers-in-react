# Markdown and SSE Token Streaming with Web Workers in React

This project demonstrates how to use Web Workers in a React + Vite + TypeScript app to handle:

- **Markdown rendering**: Offloads Markdown parsing to a Web Worker for better performance.
- **Server-Sent Events (SSE) for token streaming**: Handles real-time token streams from a Large Language Model (LLM) via SSE in a Web Worker to prevent UI blocking.

## Features

- **Real-time SSE Token Stream**: Continuously streams tokens from an LLM using a Server-Sent Event connection.
- **Efficient Markdown Rendering**: Offloads heavy Markdown parsing to a Web Worker to keep the main UI thread responsive.
- **Seamless Integration**: Both SSE token streaming and Markdown rendering are integrated into the same app for performance optimization.

## Project Structure

\`\`\`
src/
│
├── sseWorker.ts # Web Worker for handling SSE token stream
├── markdownWorker.ts # Web Worker for handling Markdown parsing
├── LLMTokenStream.tsx # Component for streaming tokens via SSE
├── MarkdownRenderer.tsx # Component for rendering Markdown via Web Worker
└── App.tsx # Main app integrating both features
\`\`\`

## Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   \`\`\`

2. Install the dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open \`http://localhost:3000\` in your browser to see the app in action.

## How It Works

### Markdown Rendering with Web Workers

The app uses the \`marked\` library for Markdown parsing, which is done in the Web Worker (\`markdownWorker.ts\`). By offloading the parsing to a Web Worker, the main thread remains responsive, even with large or complex Markdown content.

The parsed HTML is sent back to the main thread and injected into the DOM using \`dangerouslySetInnerHTML\`.

### SSE Token Streaming with Web Workers

The app sets up a Server-Sent Event (SSE) connection to stream tokens from an LLM. The SSE connection is handled by a Web Worker (\`sseWorker.ts\`), which receives tokens in real time and sends them back to the main thread for display.

The worker detects when the stream ends (either by an \`end\` event or connection closure) and notifies the main thread.

## Benefits

### 1. **Improved UI Responsiveness**

Using Web Workers ensures that both the **SSE stream** and **Markdown parsing** happen off the main thread, keeping the UI responsive. This is particularly important when:

- The LLM is sending large amounts of tokens.
- The Markdown content is large or complex.

### 2. **Parallel Processing**

Web Workers enable **parallel processing**:

- **Markdown parsing** occurs in one worker.
- **SSE token streaming** occurs in another worker.
  This prevents heavy computations from blocking the main thread, improving performance.

### 3. **Efficient Real-Time Streaming**

The LLM token stream uses Server-Sent Events (SSE) for efficient real-time data streaming. By processing the tokens in a Web Worker, we ensure that the continuous stream doesn't degrade the app's performance.

### 4. **Scalability**

This setup allows for easier scalability as the Web Workers can handle increasingly complex tasks or larger streams without slowing down the app.

### 5. **Error Isolation**

By handling errors (e.g., SSE connection errors) in Web Workers, we isolate them from the main UI thread, ensuring the app remains stable and responsive.

## License

This project is licensed under the MIT License.
