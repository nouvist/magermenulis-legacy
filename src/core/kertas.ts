export class vector {
  x: number;
  y: number;
  constructor(x?: number, y?: number) {
    this.x = x;
    this.y = y;
  }
}
export class vector3 {
  x: number;
  y: number;
  z: number;
  constructor(x?: number, y?: number, z?: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}
export interface IkertasLembar {
  img: string;
  besar: vector;
  koordinat: {
    manipulasi: {
      posisi: vector;
      besar: vector;
      rotasi: number;
      kurva: vector[];
    };
    besar: vector;
    nomor: vector;
    tanggal: vector;
    kosong: vector;
    konten: vector;
    kontenNo1: vector;
    kontenNo2: vector;
    kontenJumlah: number;
    kontenMargin: number;
    kontenBaris: number
    kontenLebar: number;
    kontenSkala: number;
  };
}
export interface Ikertas {
  pembuat?: {
    nama?: string;
    ig?: string;
  };
  kiri: {
    ada: boolean;
    isi?: IkertasLembar[];
  };
  kanan: {
    ada: boolean;
    isi?: IkertasLembar[];
  };
}
