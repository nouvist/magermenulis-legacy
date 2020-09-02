import * as React from "react";
import * as style from "./index.scss";

export default (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return <textarea {...props} className={props.className + " " + style.input} />;
};
