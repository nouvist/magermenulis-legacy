import * as React from "react";
import * as style from "./index.scss";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface Iprops {}
interface Istate {}

class _ extends React.Component<RouteComponentProps<Iprops>, Istate> {
  render() {
    return (
      <div className={style.wadah}>
        <div className={style.wadahTombol}>
          <button onClick={() => this.props.history.push("/editor/null")}>
            <span className="material-icons">add</span>
            <div>Buat</div>
          </button>
          <button>
            <span className="material-icons">folder_open</span>
            <div>Buka</div>
          </button>
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
