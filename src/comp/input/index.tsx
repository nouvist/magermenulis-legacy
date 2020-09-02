import * as React from "react";
import * as style from "./index.scss";

export default (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <input {...props} className={props.className + " " + style.input} />;
};
