import * as React from "react";
import * as style from "./index.scss";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";

interface Iprops {}
interface Istate {}

class _ extends React.Component<RouteComponentProps<Iprops>, Istate> {
  render() {
    return (
      <div className={style.wadah}>
        <div className={style.wadahTombol}>
          <Link to="/editor/null">
            <span className="material-icons">add</span>
            <div>Buat</div>
          </Link>
          <Link to="/">
            <span className="material-icons">folder_open</span>
            <div>Buka</div>
          </Link>
          <Link to="/">
            <span className="material-icons">settings</span>
            <div>Setelan</div>
          </Link>
        </div>
        <div className={style.wadahBawah}>
          <b>Situs ini dalam pengembangan.</b> <br/>
          Dapatkan update terbaru mengenai<br/>
          situs ini di <a href="https://instagram.com/magermenulis" target="blank">Instagram resmi kami</a>. <br/>
        </div>
      </div>
    );
  }
}

export default withRouter(_);
