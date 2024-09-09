// Example Node.js SSE server using Express
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.get("/llm-token-stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Simulate sending tokens every second
  let counter = 0;
  const intervalId = setInterval(() => {
    res.write(`data: Token ${counter}\n\n`);
    counter++;

    // Stop after sending 10 tokens and send an "end" message
    if (counter > 10) {
      clearInterval(intervalId);
      res.write("data: end\n\n");
      res.end();
    }
  }, 1000);

  // Handle client disconnect
  req.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });
});

app.listen(3000, () => {
  console.log("SSE server listening on port 3000");
});
