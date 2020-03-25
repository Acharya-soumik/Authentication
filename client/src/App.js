import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/Routes";
import { Provider } from "react-redux";
import store from "./Redux/store";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Routes />
      </Provider>
    </Router>
  );
}
export default App;
