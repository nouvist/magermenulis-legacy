import { Ikertas, vector } from "./kertas";

export interface Idata {
  no: string;
  tgl: string;
  kosong: string;
  konten: string;
}
export class magerMenulis {
  kertas: Ikertas;
  skrng: {
    jenis: "kiri" | "kanan";
    pos: number;
  } = { jenis: "kiri", pos: 0 };
  data: Idata;
  debug: Window;
  constructor(kertas?: Ikertas, data?: Idata, debug?: boolean) {
    this.kertas = kertas;
    this.data = data;
    if (debug) {
      this.debug = window.open("/debug");
      setTimeout(() => {
        this.debug.document.head.innerHTML = "";
        this.debug.document.body.innerHTML = "";
        this.gambar();
      }, 500);
    } else {
      this.gambar();
    }
  }

  async gambar() {
    // ngecek 1 jenis
    if (!this.kertas[this.skrng.jenis].ada) {
      this.skrng.jenis = this.skrng.jenis == "kiri" ? "kanan" : "kiri";
      return;
    }
    // *latar
    let kertas = this.kertas[this.skrng.jenis].isi[this.skrng.pos];
    let bg = await this.imgLoader(kertas.img);
    // *teks
    let tCanvas = document.createElement("canvas");
    tCanvas.width = kertas.koordinat.manipulasi.besar.x;
    tCanvas.height = kertas.koordinat.manipulasi.besar.y;
    let tCtx = tCanvas.getContext("2d");
    tCtx.fillStyle = "red";
    tCtx.fillRect(
      0,
      0,
      kertas.koordinat.manipulasi.besar.x,
      kertas.koordinat.manipulasi.besar.y
    );
    // let tHasil = await this.imgLoader(tCanvas.toDataURL());
    // let tHasil = await this.imgLoader(
    //   "https://manula.r.sizr.io/large/user/12518/img/grid.png"
    // );
    let tHasil = await this.imgLoader(
      "https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fgrand-theft-auto-v%2Fhome%2FGTAV_EGS_Artwork_1280x720_V04-1280x720-31e7e0e50fda38709553f5313027ba5b76bd10b6.jpg"
    );
    // *manipulasi
    let mCanvas = document.createElement("canvas");
    mCanvas.width = kertas.besar.x;
    mCanvas.height = kertas.besar.y;
    let mCtx = mCanvas.getContext("2d");
    mCtx.drawImage(bg, 0, 0);
    // masukin teks
    mCtx.rotate((kertas.koordinat.manipulasi.rotasi * Math.PI) / 180);
    for (let x = 0; x < tHasil.width; x++) {
      let sX = x;
      let sY = 0;
      let sW = 1;
      let sH = tHasil.height;
      let dX = (x * kertas.koordinat.manipulasi.besar.x) / tHasil.width;
      dX += kertas.koordinat.manipulasi.posisi.x;
      let dY = kertas.koordinat.manipulasi.posisi.y;
      let dW = kertas.koordinat.manipulasi.besar.x / tHasil.width;
      let dH = kertas.koordinat.manipulasi.besar.y;
      mCtx.drawImage(tHasil, sX, sY, sW, sH, dX, dY, dW, dH);
    }
    this.debug.document.body.appendChild(mCanvas);
  }
  imgLoader(url: string): Promise<HTMLImageElement> {
    let img = new Image();
    return new Promise((res, rej) => {
      img.onload = () => res(img);
      img.src = url;
    });
  }
}
