import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "./components/Layout";
import { HashRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <ChakraProvider resetCSS>
        <Layout>
          <App />
        </Layout>
      </ChakraProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
