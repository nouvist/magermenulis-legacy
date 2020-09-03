import { Ikertas, vector } from "./kertas";
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
    pos: number;
  } = { jenis: "kiri", pos: 0 };
  constructor(kertas?: Ikertas, font?: Ifont) {
    this.kertas = kertas;
    this.font = font;
  }

  async pratinjau(data: Idata): Promise<HTMLCanvasElement> {
    return await this.gambar(data);
  }

  async gaskan(data: Idata): Promise<HTMLCanvasElement[]> {
    let result = await Promise.all([this.gambar(data)]);
    return result;
  }
  async gambar(data: Idata): Promise<HTMLCanvasElement> {
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
    data.konten.split("\n").forEach((el) => {
      let wrap = wrapText(el);
      console.log(wrap);
      wrap.forEach((el2) => {
        tCtx.fillText(
          el2,
          kertas.koordinat.konten.x,
          kertas.koordinat.konten.y + i * kertas.koordinat.kontenMargin
        );
        i++;
      });
    });

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
    let tHasil = await this.imgLoader(tCanvas.toDataURL());
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
    return new Promise((res, rej) => {
      img.onload = () => res(img);
      img.src = url;
    });
  }
}
