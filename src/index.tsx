import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Router from "react-router-dom";

import Cnavbar from "./comp/navbar";

import Pbaru from "./page/baru";
import Peditor from "./page/editor";
import P404 from "./page/404";

import "./index.scss";

let Debug = () => {
  setTimeout(() => {
    if (document.getElementById("debug").getAttribute("value") == "true") {
      window.close()
    }
  },2000)
  return <input id="debug" value="true"/>
}

ReactDOM.render(
  <div>
    <Cnavbar />
    <Router.BrowserRouter>
      <Router.Switch>
        <Router.Route path="/debug" exact component={Debug} />
        <Router.Route path="/" exact component={Pbaru} />
        <Router.Route path="/editor/:file" exact component={Peditor} />
        <Router.Route component={P404} />
      </Router.Switch>
    </Router.BrowserRouter>
  </div>,
  document.getElementById("nouvist")
);
