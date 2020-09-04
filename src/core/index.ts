import { Ikertas, vector, IkertasLembar } from "./kertas";
import { Ifont } from "./font";

export interface Idata {
  no: string;
  tgl: string;
  kosong: string;
  konten: string;
  dariKiri: boolean;
}
export class magerMenulis {
  kertas: Ikertas;
  font: Ifont;
  skrng: {
    jenis: "kiri" | "kanan";
    pos: {
      kiri: number;
      kanan: number;
    };
  } = {
    jenis: "kiri",
    pos: {
      kiri: 0,
      kanan: 0,
    },
  };
  constructor(kertas?: Ikertas, font?: Ifont) {
    this.kertas = kertas;
    this.font = font;
  }
  async gaskan(data: Idata): Promise<HTMLCanvasElement[]> {
    this.skrng.jenis = data.dariKiri ? "kiri" : "kanan";
    this.skrng.pos.kiri = 0;
    this.skrng.pos.kanan = 0;
    let result = await this.gambarTeks(data);
    return result;
  }

  async gambarTeks(data: Idata) {
    let hasilnya: HTMLCanvasElement[] = [];
    // ternyata satu jenis
    if (!this.kertas[this.skrng.jenis])
      this.skrng.jenis = this.skrng.jenis == "kiri" ? "kanan" : "kiri";
    if (
      this.skrng.pos[this.skrng.jenis] >=
      this.kertas[this.skrng.jenis].isi.length
    )
      this.skrng.pos[this.skrng.jenis] = 0;

    let kertas = this.kertas[this.skrng.jenis].isi[
      this.skrng.pos[this.skrng.jenis]
    ];
    function siapinCanvas() {
      let tCanvas = document.createElement("canvas");
      tCanvas.width = kertas.koordinat.besar.x;
      tCanvas.height = kertas.koordinat.besar.y;
      return tCanvas;
    }
    function siapinContext() {
      let tCtx = tCanvas.getContext("2d");
      tCtx.fillStyle = "black";
      tCtx.font = "24px 'Gloria Hallelujah'";
      return tCtx;
    }
    let tCanvas = siapinCanvas();
    let tCtx = siapinContext();
    tCtx.fillText(data.no, kertas.koordinat.nomor.x, kertas.koordinat.nomor.y);
    tCtx.fillText(
      data.tgl,
      kertas.koordinat.tanggal.x,
      kertas.koordinat.tanggal.y
    );
    tCtx.fillText(
      data.kosong,
      kertas.koordinat.kosong.x,
      kertas.koordinat.kosong.y
    );
    function wrapText(teks) {
      let ttKata = teks.split(" ");
      let ttBaris: string[] = [];
      let ttSkrng = "";
      ttKata.forEach((val) => {
        let { width } = tCtx.measureText(ttSkrng + val + " ");
        if (width < kertas.koordinat.kontenLebar) {
          ttSkrng += val + " ";
        } else {
          ttBaris.push(ttSkrng);
          ttSkrng = val + " ";
        }
      });
      ttBaris.push(ttSkrng);
      return ttBaris;
    }
    let i = 0;
    let tEol = data.konten.split("\n");
    for (let el of tEol) {
      let wrap = wrapText(el);
      let newline = true;
      for (let el2 of wrap) {
        if (i >= kertas.koordinat.kontenJumlah) {
          let tHasil = await this.imgLoader(tCanvas.toDataURL());
          hasilnya.push(await this.gambarManipulasi(data, tHasil, kertas));
          i = 0;
          this.skrng.pos[this.skrng.jenis]++;
          this.skrng.jenis = this.skrng.jenis == "kiri" ? "kanan" : "kiri";
          if (
            this.skrng.pos[this.skrng.jenis] >=
            this.kertas[this.skrng.jenis].isi.length
          )
            this.skrng.pos[this.skrng.jenis] = 0;
          kertas = this.kertas[this.skrng.jenis].isi[
            this.skrng.pos[this.skrng.jenis]
          ];
          tCanvas = siapinCanvas();
          tCtx = siapinContext();
        }
        if (newline) {
          console.log(this.skrng);
          if (el2.substr(0, 1) == "[" && el2.indexOf("]") != -1) {
            let nomor = el2.substr(1, el2.indexOf("]") - 1);
            el2 = el2.substr(el2.indexOf("]") + 1);
            el2 = el2.trimLeft();
            tCtx.fillText(
              nomor,
              kertas.koordinat.kontenNo1.x,
              kertas.koordinat.kontenNo1.y + i * kertas.koordinat.kontenMargin
            );
          }
          if (el2.substr(0, 1) == "<" && el2.indexOf(">") != -1) {
            let nomor = el2.substr(1, el2.indexOf(">") - 1);
            el2 = el2.substr(el2.indexOf(">") + 1);
            el2 = el2.trimLeft();
            tCtx.fillText(
              nomor,
              kertas.koordinat.kontenNo2.x,
              kertas.koordinat.kontenNo2.y + i * kertas.koordinat.kontenMargin
            );
          }
        }
        tCtx.fillText(
          el2,
          kertas.koordinat.konten.x,
          kertas.koordinat.konten.y + i * kertas.koordinat.kontenMargin
        );
        newline = false;
        i++;
      }
    }
    let tHasil = await this.imgLoader(tCanvas.toDataURL());
    hasilnya.push(await this.gambarManipulasi(data, tHasil, kertas));
    return hasilnya;
  }
  async gambarManipulasi(
    data: Idata,
    tHasil: HTMLImageElement,
    kertas: IkertasLembar
  ): Promise<HTMLCanvasElement> {
    // *latar
    let bg = await this.imgLoader(kertas.img);
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
    return mCanvas;
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
    return new Promise((res) => {
      img.onload = () => res(img);
      img.src = url;
    });
  }
}
