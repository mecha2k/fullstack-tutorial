import React, { Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
// import { Router } from "@reach/router";

import Launch from "./launch";
import Launches from "./launches";
import Cart from "./cart";
import Profile from "./profile";

import { Footer, PageContainer } from "../components";

export default function Pages() {
  return (
    <Router>
      <Fragment>
        <PageContainer>
          <Launches path="/" />
          <Launch path="launch/:launchId" />
          <Cart path="cart" />
          <Profile path="profile" />
        </PageContainer>
        <Footer />
      </Fragment>
    </Router>
  );
}
