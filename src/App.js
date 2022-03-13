import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import CreateAccount from "./components/CreateAccount";
import Allaccounts from "./components/Allaccounts";
import Transfer from "./components/Transfer";
import Transactions from "./components/Transactions";
import Home from "./components/Home";
import Footer from "./components/Footer";

function App() {
  const initialState = JSON.parse(sessionStorage.getItem("isLoggedIn")) || false;
  console.log(initialState)
  const [isLogedin, setIsLogedin] = React.useState(initialState)

  const handleIsLogedin = (user) => {
    if (user) {
      sessionStorage.setItem("isLoggedIn", true);
      setIsLogedin(true)
    }

  }
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/create-account">
          {isLogedin ? <CreateAccount /> : <Redirect to="/" />}
          {/* <CreateAccount /> */}
        </Route>
        <Route path="/account-info">
          {isLogedin ? <Allaccounts /> : <Redirect to="/" />}
          {/* <Allaccounts /> */}
        </Route>
        <Route path="/transfer">
          {isLogedin ? <Transfer /> : <Redirect to="/" />}
        </Route>
        <Route path="/transactions-history">
          {isLogedin ? <Transactions /> : <Redirect to="/" />}
        </Route>
        {/* <Route path="/login">
          <Authenticate />
        </Route> */}
        <Route path="/">
          <Home handleIsLogedin={handleIsLogedin} />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
