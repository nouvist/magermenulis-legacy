import * as React from "react";
import * as style from "./index.scss";
import { withRouter, RouteChildrenProps } from "react-router-dom";
import { magerMenulis } from "../../core";
import Cbutton from "../../comp/button";
import Cinput from "../../comp/input";
import Ctextarea from "../../comp/textarea";

interface Iprops {}
interface Istate {}

import kertasnyakune from "../../../kertas/kune/index";

class _ extends React.Component<RouteChildrenProps<Iprops>, Istate> {
  constructor(props) {
    super(props);
    new magerMenulis(kertasnyakune, null, true);
  }
  render() {
    return (
      <div className={style.wadah}>
        <div className="container">
          <div className="row">
            <div className={"col-lg-4 col-md-12 " + style.wadahPratinjau}>
              <h1>Pratinjau</h1>
              <div className={style.tombolPratinjau}>
                <Cbutton>Pratinjau</Cbutton>
                <Cbutton>Unduh</Cbutton>
              </div>
            </div>
            <div className={"col-lg-8 col-md-12 " + style.wadahEditor}>
              <h1>Isi</h1>
              <div className="row">
                <div className="col-sm-6">
                  <Cinput placeholder="No" className={style.input} />
                </div>
                <div className="col-sm-6">
                  <Cinput placeholder="Date" className={style.input} />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <Cinput placeholder="Bagian Kosong" className={style.input} />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <Ctextarea placeholder="Konten" className={style.textarea} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(_);
