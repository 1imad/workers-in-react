import { marked } from "marked";

self.onmessage = (event) => {
  const { markdown } = event.data;
  const parsedHTML = marked(markdown);
  self.postMessage(parsedHTML);
};
