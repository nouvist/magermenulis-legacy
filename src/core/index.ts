import { Ikertas, vector } from "./kertas";

export interface Idata {
  no: string;
  tgl: string;
  kosong: string;
  konten: string;
  dariKiri: boolean;
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
        this.debug.document.body.innerHTML = "";
        this.debug.document.querySelector("meta[name=viewport]").remove();
        this.gambar();
      }, 500);
    }
  }

  async gambar(pratinjau: boolean = false) {
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
    tCanvas.width = kertas.koordinat.besar.x;
    tCanvas.height = kertas.koordinat.besar.y;
    let tCtx = tCanvas.getContext("2d");
    tCtx.fillStyle = "black";
    tCtx.font = "24px 'Gloria Hallelujah'";
    tCtx.fillText(
      "tes tulisan melengkung. aku nyontek kode orang. aku gangerti kurva soalnya",
      kertas.koordinat.konten.x,
      kertas.koordinat.konten.y
    );
    tCtx.fillText("9090", kertas.koordinat.nomor.x, kertas.koordinat.nomor.y);
    tCtx.fillText(
      "2020/09/02",
      kertas.koordinat.tanggal.x,
      kertas.koordinat.tanggal.y
    );
    tCtx.fillText(
      "Nouvistiardi (XI MIPA 4)",
      kertas.koordinat.kosong.x,
      kertas.koordinat.kosong.y
    );
    let tHasil = await this.imgLoader(tCanvas.toDataURL());
    // let tHasil = await this.imgLoader(
    //   "https://manula.r.sizr.io/large/user/12518/img/grid.png"
    // );
    // let tHasil = await this.imgLoader(
    //   "https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fgrand-theft-auto-v%2Fhome%2FGTAV_EGS_Artwork_1280x720_V04-1280x720-31e7e0e50fda38709553f5313027ba5b76bd10b6.jpg"
    // );
    // this.debug.document.body.appendChild(tHasil)
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

      let kurva = this.bezier(
        sX / tHasil.width,
        kertas.koordinat.manipulasi.kurva[0],
        kertas.koordinat.manipulasi.kurva[1],
        kertas.koordinat.manipulasi.kurva[2],
        kertas.koordinat.manipulasi.kurva[3]
      );

      let dX = (sX * kertas.koordinat.manipulasi.besar.x) / tHasil.width;
      dX += kertas.koordinat.manipulasi.posisi.x;
      let dY = kertas.koordinat.manipulasi.posisi.y;
      dY -= kurva.y / 2;
      let dW = kertas.koordinat.manipulasi.besar.x / tHasil.width;
      let dH = kertas.koordinat.manipulasi.besar.y + kurva.y;
      mCtx.drawImage(tHasil, sX, sY, sW, sH, dX, dY, dW, dH);
    }
    if (this.debug) this.debug.document.body.appendChild(mCanvas);
  }
  bezier(t: number, p0: vector, p1: vector, p2: vector, p3: vector) {
    let cX = 3 * (p1.x - p0.x),
      bX = 3 * (p2.x - p1.x) - cX,
      aX = p3.x - p0.x - cX - bX;
    let cY = 3 * (p1.y - p0.y),
      bY = 3 * (p2.y - p1.y) - cY,
      aY = p3.y - p0.y - cY - bY;
    let x = aX * Math.pow(t, 3) + bX * Math.pow(t, 2) + cX * t + p0.x;
    let y = aY * Math.pow(t, 3) + bY * Math.pow(t, 2) + cY * t + p0.y;
    return new vector(x, y);
  }
  imgLoader(url: string): Promise<HTMLImageElement> {
    let img = new Image();
    return new Promise((res, rej) => {
      img.onload = () => res(img);
      img.src = url;
    });
  }
}
