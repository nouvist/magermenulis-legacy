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
    // latar
    let kertas = this.kertas[this.skrng.jenis].isi[this.skrng.pos];
    let bg = await this.imgLoader(kertas.img, kertas.besar);
    this.debug.document.body.appendChild(bg);
    
  }
  imgLoader(url: string, besar: vector): Promise<HTMLImageElement> {
    let img = new Image(besar.x, besar.y);
    return new Promise((res, rej) => {
      img.onload = () => res(img);
      img.src = url;
    });
  }
}
