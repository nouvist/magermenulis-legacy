import * as React from "react";
import * as style from "./index.scss";

export default (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <label className={style.wadah}>
      <input
        {...props}
        className={props.className + " " + style.input}
        type="checkbox"
      />
      <span className={`material-icons ${style.tombol}`}>
        check_box_outline_blank
      </span>
      <span className={`material-icons ${style.tombol2}`}>
        check_box
      </span>
      <div className={style.teks}>{props.placeholder}</div>
    </label>
  );
};
