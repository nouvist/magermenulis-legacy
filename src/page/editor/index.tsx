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
  debug: boolean;
}

import kertasnyakune from "../../../kertas/kune/index";

class _ extends React.Component<RouteChildrenProps<Iprops>, Istate> {
  state: Istate = {
    pratinjau: kertasnyakune.kiri.isi[0].img,
    dataNo: "",
    dataTgl: "",
    dataKsng: "",
    dataKonten: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non laoreet magna. Vestibulum consectetur ligula est. Ut convallis at felis quis consectetur. Nunc eu neque eleifend, lobortis lorem vel, vulputate tellus. Mauris hendrerit ante nec ipsum dapibus maximus. Quisque at porta magna. Cras sodales mattis ullamcorper. Proin leo orci, lacinia at nisi et, consectetur cursus erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas nisl ipsum, facilisis at molestie egestas, accumsan et ligula. Pellentesque ligula ante, venenatis quis nisi vel, semper dignissim orci. Suspendisse in ante nibh.

    Quisque ultricies vel urna in pretium. Nullam sagittis leo at lectus laoreet imperdiet. Praesent luctus, est faucibus vestibulum vulputate, dui libero venenatis erat, sed molestie justo erat eu odio. Nunc feugiat est sit amet nisl iaculis, sit amet auctor sapien auctor. Suspendisse ac nibh ultrices, iaculis nunc nec, ultricies magna. Donec lacus metus, bibendum vulputate ante in, dignissim scelerisque ipsum. Sed posuere tincidunt massa, ut euismod mauris sollicitudin sit amet. Nam vitae aliquet enim. Quisque scelerisque tincidunt nisl, vel feugiat lectus varius id. Aenean vestibulum sed nulla in bibendum.
    
    Mauris a nulla et lorem auctor eleifend ac ac dolor. In lobortis eu ligula in vulputate. Maecenas lectus mi, ultrices ut mauris ac, malesuada tristique mi. Quisque sollicitudin arcu neque, ac imperdiet turpis semper a. Cras ex ex, commodo rhoncus interdum et, rhoncus et nunc. Nulla ac consectetur eros. Sed at nibh sem. Nullam vitae purus in nisl interdum tempus. Pellentesque id sollicitudin erat. Morbi faucibus leo id tortor finibus pharetra. Nam at orci efficitur, convallis nulla quis, gravida orci. Donec at dolor consequat, pharetra dolor eget, bibendum dolor. Duis placerat purus vitae tellus mattis, quis aliquam lacus accumsan.
    
    Etiam ullamcorper luctus felis, eu pellentesque nisi tempus sed. Integer eget ex consequat, tincidunt nisl id, finibus mi. Cras malesuada, nisi quis fringilla convallis, magna lacus mollis lacus, quis congue nunc mi vitae diam. Nam mauris quam, rutrum quis sollicitudin sed, euismod laoreet dui. Nunc scelerisque massa at vestibulum tincidunt. Nulla ipsum odio, ullamcorper quis aliquam eget, auctor et lorem. In consequat viverra bibendum. Donec ultricies luctus neque id pretium. Proin accumsan ac nibh eget venenatis. Nullam magna quam, venenatis id scelerisque nec, blandit eu orci. Nunc laoreet risus vitae lorem maximus, sit amet vestibulum purus dapibus. Proin in risus ac arcu euismod lacinia. Cras semper fermentum velit. Maecenas fermentum quam ut ante aliquet suscipit.
    
    Mauris suscipit erat et elit dignissim, eget convallis lectus eleifend. Aliquam tempor tortor luctus, sagittis nulla ac, tristique sem. Nullam ut lorem non justo porttitor maximus. Nulla dignissim sollicitudin ante, quis egestas elit suscipit vitae. Nullam fringilla diam id tristique ultrices. Donec magna dolor, congue quis tellus ac, porta accumsan nulla. Cras iaculis ex mauris, lobortis facilisis augue accumsan sed. Proin dapibus lacus at orci fringilla, ut gravida lorem mollis. In felis lacus, posuere a eleifend eget, egestas in nisi.
    
    Pellentesque ullamcorper non leo quis interdum. Quisque facilisis eget risus quis congue. Duis dictum augue non scelerisque faucibus. Nulla accumsan tincidunt ex a finibus. Phasellus et ultricies nisi. Sed vulputate, turpis sit amet porta elementum, sem nulla imperdiet diam, et vulputate diam lacus nec tellus. Fusce vehicula sapien metus, et convallis justo porttitor quis. In non ipsum quis lorem lacinia iaculis ut at ligula. Aliquam ultricies lorem id iaculis facilisis.
    
    Aenean bibendum nunc eget orci porttitor, sed mollis sem venenatis. Ut porta ante aliquam, euismod felis vel, sollicitudin libero. Aliquam euismod purus at gravida faucibus. Duis vel placerat erat, quis auctor felis. Cras sit amet finibus sapien. Integer bibendum nec diam ac hendrerit. Proin nisi nibh, luctus eu sem ut, aliquet porttitor lorem. Aenean a auctor magna, id ultrices nunc. Sed tristique tincidunt aliquam. Sed fermentum, odio nec vehicula imperdiet, urna leo auctor turpis, vel vestibulum nisl quam at magna. Quisque laoreet accumsan est rutrum mattis. Integer tristique erat vel massa posuere convallis. Sed commodo semper lacinia.
    
    Mauris ultricies, massa non bibendum varius, nisl lacus rutrum mauris, mattis egestas neque dui vel lacus. Suspendisse scelerisque arcu luctus, luctus tortor vel, commodo massa. Integer congue neque condimentum, ultrices ex vel, faucibus massa. Pellentesque felis metus, vestibulum vel elit nec, pulvinar sollicitudin libero. Nullam et tellus sollicitudin, imperdiet dolor sit amet, vehicula neque. Aenean aliquet eros et sollicitudin pellentesque. Nullam orci lectus, luctus eu sodales vehicula, mollis ultrices neque. Praesent dignissim in nunc a dapibus. Vivamus nibh est, lacinia sit amet ligula sed, rutrum gravida nibh. Maecenas auctor nisi ut sem accumsan, eu ultrices lacus consequat. Sed id dictum felis.
    
    Donec venenatis rutrum ante nec fermentum. Suspendisse aliquet porttitor dolor, eget luctus nunc laoreet eget. Aenean pellentesque feugiat euismod. Aenean sem elit, posuere at eleifend non, eleifend ac sem. Phasellus sed lorem fermentum, semper mauris eget, auctor nulla. Vestibulum tincidunt viverra fringilla. Integer egestas massa at purus dignissim, eu rhoncus dui volutpat. Aliquam at commodo justo. Vestibulum quam risus, semper nec odio sit amet, gravida maximus tortor. Pellentesque leo ex, scelerisque vitae lacinia at, aliquet sed dui. Mauris ac dapibus ex, sit amet sagittis urna. Duis dui nunc, egestas vel facilisis vitae, semper vel nibh. Nullam odio enim, feugiat et gravida at, tincidunt a metus.
    
    Nullam lorem nulla, ultricies quis felis et, tempus consectetur mauris. Pellentesque quis varius mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam ac bibendum quam. Quisque dictum est a neque vulputate consectetur. Curabitur leo est, commodo sit amet ante ac, tincidunt ullamcorper neque. Phasellus pulvinar mollis neque ac aliquam. Sed ac magna nulla. Vivamus eu lacus condimentum, auctor metus eget, scelerisque lacus. Ut nec rutrum tellus. Donec malesuada, nulla in ultrices iaculis, enim sapien blandit augue, vitae commodo diam sapien non felis. In pellentesque, leo ut efficitur efficitur, mi risus fermentum tortor, id ultricies leo dui et metus. Vestibulum placerat efficitur finibus. Nunc sodales pulvinar arcu ut dignissim. Maecenas consectetur, quam vel lacinia convallis, sem ante lacinia nibh, vitae aliquam est ligula feugiat tortor.`,
    dariKiri: true,
    debug: false,
  };
  mager = new magerMenulis(kertasnyakune);
  constructor(props) {
    super(props);
    this.pratinjau = this.pratinjau.bind(this);
    this.unduh = this.unduh.bind(this);
    this.gambar = this.gambar.bind(this);
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
    let gambar = await this.gambar();
    this.setState({ pratinjau: gambar[0].toDataURL() });
  }
  async gambar() {
    let data: Idata = {
      dariKiri: this.state.dariKiri,
      konten: this.state.dataKonten,
      kosong: this.state.dataKsng,
      no: this.state.dataNo,
      tgl: this.state.dataTgl,
    };
    this.mager.debug = this.state.debug;
    let gambar = await this.mager.gaskan(data);
    return gambar;
  }
  async unduh() {
    let gambar = await this.gambar();
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
                  placeholder="Mulai dari lembar kiri"
                  checked={this.state.dariKiri}
                  name="dariKiri"
                  onChange={this.ubahStateCheck}
                />
                <Ccheckbox
                  placeholder="test"
                  checked={this.state.debug}
                  name="debug"
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
