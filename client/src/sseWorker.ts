
// sseWorker.js

// Handle messages from the main thread to start the SSE connection
self.onmessage = function (event) {
  const { sseUrl } = event.data;

  // Start the Server-Sent Events (SSE) connection
  const sse = new EventSource(sseUrl);

  // Listen for the 'response' event
  sse.onmessage = (e) => {
    try {
      // Parse the incoming data (assuming it's JSON)
      const parsedData = JSON.parse(e.data);

      // Send the parsed tokens back to the main thread
      self.postMessage({ type: 'response', data: parsedData.token });
    } catch (error) {
      self.postMessage({ type: 'error', message: 'Error parsing response event data', error });
    }
  };

  // Listen for the 'end' event
  sse.addEventListener('end', (evt) => {
    try {
      // Parse the end event data (assuming it's JSON)
      const endData = JSON.parse(evt.data);

      // Send the end data back to the main thread
      self.postMessage({ type: 'end', data: endData.data });

      // Close the SSE connection
      sse.close();
    } catch (error) {
      self.postMessage({ type: 'error', message: 'Error parsing end event data', error });
    }
  });

  // Handle SSE connection errors
  sse.addEventListener('error', (evt) => {
    self.postMessage({ type: 'error', message: 'SSE connection error occurred', evt });

    // Close the connection on error
    sse.close();
  });
};