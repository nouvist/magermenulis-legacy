import * as React from "react";
import * as style from "./index.scss";
import { withRouter, RouteChildrenProps } from "react-router-dom";

interface Iprops {}
interface Istate {}

class _ extends React.Component<RouteChildrenProps<Iprops>, Istate> {
  emojis: string[] = ["(>_<)", "(≥o≤)", "(^-^*)", "(o_o)/", "(≧︿≦)"];
  constructor(props) {
    super(props);
    this.emoji = this.emoji.bind(this);
  }
  emoji(): string {
    let ran = Math.random() * this.emojis.length;
    ran = Math.floor(ran);
    return this.emojis[ran];
  }
  render() {
    let emoji = this.emoji();
    return (
      <div className={style.wadah}>
        <div className={style.teks}>Iiih, gak ketemu!</div>
        <div className={style.emoji}>{emoji}</div>
      </div>
    );
  }
}

export default withRouter(_);
