import React from 'react'
import ReactDOM from "react-dom/client";
import App from './App.tsx'
import css from "./index.css?inline";

const initializeChatWidget = () => {
  const styleElement = document.createElement("style");
  styleElement.innerHTML = css;
  document.body.appendChild(styleElement);

  const container = document.createElement("div");
  container.id = "chat-modal-container";
  document.body.appendChild(container);

  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

window.initializeChatWidget = initializeChatWidget;
