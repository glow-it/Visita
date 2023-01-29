import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { inject } from '@vercel/analytics';
import { sendToVercelAnalytics } from './vitals';

Sentry.init({
  dsn: "https://0a6bba99cf194f7483f70e3c489ff8d1@o4504582273630208.ingest.sentry.io/4504582278086656",
  integrations: [new BrowserTracing()],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// Injecting Vercel Analytics...
inject();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ChakraProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ChakraProvider>
);

reportWebVitals(sendToVercelAnalytics);
