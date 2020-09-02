import * as React from "react";
import * as style from "./index.scss";
import { withRouter, RouteChildrenProps } from "react-router-dom";

interface Iprops {}
interface Istate {}

class _ extends React.Component<RouteChildrenProps<Iprops>, Istate> {
  render() {
    return <div></div>;
  }
}

export default withRouter(_);