import * as React from "react";
import * as style from "./index.scss";
import { withRouter, RouteChildrenProps } from "react-router-dom";
import { magerMenulis, Idata } from "../../core";
import Cbutton from "../../comp/button";
import Cinput from "../../comp/input";
import Ccheckbox from "../../comp/checkbox";
import Ctextarea from "../../comp/textarea";

interface Iprops {}
interface Istate {
  pratinjau: string;
  dataNo: string;
  dataTgl: string;
  dataKsng: string;
  dataKonten: string;
  dariKiri: boolean;
}

import kertasnyakune from "../../../kertas/kune/index";

class _ extends React.Component<RouteChildrenProps<Iprops>, Istate> {
  state = {
    pratinjau: kertasnyakune.kiri.isi[0].img,
    dataNo: "",
    dataTgl: "",
    dataKsng: "",
    dataKonten: "",
    dariKiri: true,
  };
  mager = new magerMenulis(kertasnyakune);
  constructor(props) {
    super(props);
    this.pratinjau = this.pratinjau.bind(this);
    this.unduh = this.unduh.bind(this);
    this.ubahState = this.ubahState.bind(this);
    this.ubahStateCheck = this.ubahStateCheck.bind(this);
  }
  ubahState(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    let d = {};
    d[e.currentTarget.name] = e.currentTarget.value;
    this.setState(d);
  }
  ubahStateCheck(e: React.ChangeEvent<HTMLInputElement>) {
    let d = {};
    d[e.currentTarget.name] = e.currentTarget.checked;
    this.setState(d);
  }
  async pratinjau() {
    let data: Idata = {
      dariKiri: this.state.dariKiri,
      konten: this.state.dataKonten,
      kosong: this.state.dataKsng,
      no: this.state.dataNo,
      tgl: this.state.dataTgl,
    };
    let gambar = await this.mager.pratinjau(data);
    this.setState({ pratinjau: gambar.toDataURL() });
  }
  async unduh() {
    let data: Idata = {
      dariKiri: this.state.dariKiri,
      konten: this.state.dataKonten,
      kosong: this.state.dataKsng,
      no: this.state.dataNo,
      tgl: this.state.dataTgl,
    };
    let gambar = await this.mager.gaskan(data);
    console.log(gambar);
    
    gambar.forEach((el) => {
      el.toBlob((blob) => {
        let url = URL.createObjectURL(blob);
        window.open(url);
      });
    });
  }
  render() {
    return (
      <div className={style.wadah}>
        <div className="container">
          <div className="row">
            <div className={"col-lg-4 col-md-12 " + style.wadahPratinjau}>
              <h1>Pratinjau</h1>
              <div className={style.tombolPratinjau}>
                <Cbutton onClick={this.pratinjau}>Pratinjau</Cbutton>
                <Cbutton onClick={this.unduh}>Unduh</Cbutton>
                <div
                  style={{
                    backgroundImage: `url(${this.state.pratinjau})`,
                  }}
                  className={style.pratinjau}
                />
              </div>
            </div>
            <div className={"col-lg-8 col-md-12 " + style.wadahEditor}>
              <h1>Isi</h1>
              <div className="ro">
                <Ccheckbox
                  placeholder="Mulai dari kiri"
                  checked={this.state.dariKiri}
                  name="dariKiri"
                  onChange={this.ubahStateCheck}
                />
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <Cinput
                    placeholder="No"
                    className={style.input}
                    value={this.state.dataNo}
                    name="dataNo"
                    onChange={this.ubahState}
                  />
                </div>
                <div className="col-sm-6">
                  <Cinput
                    placeholder="Date"
                    className={style.input}
                    value={this.state.dataTgl}
                    name="dataTgl"
                    onChange={this.ubahState}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <Cinput
                    placeholder="Bagian Kosong"
                    className={style.input}
                    value={this.state.dataKsng}
                    name="dataKsng"
                    onChange={this.ubahState}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <Ctextarea
                    placeholder="Konten"
                    className={style.textarea}
                    value={this.state.dataKonten}
                    name="dataKonten"
                    onChange={this.ubahState}
                  />
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
