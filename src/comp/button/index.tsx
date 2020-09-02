import * as React from "react";
import * as style from "./index.scss";

export default (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button {...props} className={props.className + " " + style.tombol} />;
};
