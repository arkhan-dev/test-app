import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import "typeface-roboto";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

function Root() {
  return (
    <>
      <CssBaseline />
      <App />
    </>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
