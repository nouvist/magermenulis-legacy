import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Router from "react-router-dom";

import Cnavbar from "./comp/navbar";

import Pbaru from "./page/baru";
import Peditor from "./page/editor";
import P404 from "./page/404";

import "./index.scss";

ReactDOM.render(
  <div>
    <Cnavbar />
    <Router.BrowserRouter>
      <Router.Switch>
        <Router.Route path="/" exact component={Pbaru} />
        <Router.Route path="/editor/:file" exact component={Peditor} />
        <Router.Route component={P404} />
      </Router.Switch>
    </Router.BrowserRouter>
  </div>,
  document.getElementById("nouvist")
);
