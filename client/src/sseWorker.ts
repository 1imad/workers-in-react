// src/sseWorker.ts

self.onmessage = (event) => {
  const { url } = event.data;

  // Open the SSE connection
  const eventSource = new EventSource(url);

  // Listen for incoming messages (tokens from LLM)
  eventSource.onmessage = (e) => {
    const data = e.data;

    // Check if the data indicates the stream has ended
    if (data === "end") {
      // Send an "end" signal back to the main thread
      self.postMessage({ end: true });
      eventSource.close();
    } else {
      // Otherwise, send the token data back to the main thread
      self.postMessage({ token: data });
    }
  };

  // Handle potential errors
  eventSource.onerror = (error) => {
    console.error("SSE Error:", error);
    self.postMessage({ error: "An error occurred with the SSE connection." });
    eventSource.close();
  };

  // Optionally handle closing the SSE connection when the worker terminates
  self.onclose = () => {
    eventSource.close();
  };
};
