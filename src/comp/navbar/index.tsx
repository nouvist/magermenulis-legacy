import * as React from "react";
import * as style from "./index.scss";
import imgLogo from "./logo.svg";

interface Iprops {}
interface Istate {}

export default class _ extends React.Component<Iprops, Istate> {
  render() {
    return (
      <div className={style.wadah}>
        <img src={imgLogo} className={style.logo} alt="logo" />
      </div>
    );
  }
}
