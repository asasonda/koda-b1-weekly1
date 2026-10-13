const { rejects } = require("node:assert");
const { resolve } = require("node:dns");

const url = "https://jsonplaceholder.typicode.com/users";
const { createInterface } = require("node:readline");
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

// array
const home = ["Menu Utama", "Riwayat", "Data User", "exit"];
const menu = [
  {
    nama: "Nasi Putih",
    harga: 4000,
    kategori: "Makanan",
  },
  {
    nama: "Ayam Gulai",
    harga: 8000,
    kategori: "Makanan",
  },
  {
    nama: "Telur Dadar",
    harga: 5000,
    kategori: "Makanan",
  },
  {
    nama: "Tempe Orek",
    harga: 4000,
    kategori: "Makanan",
  },
  {
    nama: "Ikan Goreng",
    harga: 8000,
    kategori: "Makanan",
  },
  {
    nama: "Tahu dan Tempe",
    harga: 6000,
    kategori: "Makanan",
  },
  {
    nama: "Telur Balado",
    harga: 4000,
    kategori: "Makanan",
  },
  {
    nama: "Air Putih",
    harga: 0,
    kategori: "Minuman",
  },
  {
    nama: "Kopi Hitam",
    harga: 4000,
    kategori: "Minuman",
  },
  {
    nama: "Teh Manis Panas/Dingin",
    harga: 4000,
    kategori: "Minuman",
  },
];
const riwayat = [];

// cek array menggunakan instanceof dan cek array.isarray
// console.log(menu instanceof Array)
// console.log(Array.isArray(riwayat))

// objeck dan method
const keranjang = {
  pembeli: "",
  belanja: [],
  ringkasan: function () {
    console.log("Pembeli: ", this.pembeli);
    console.log("Jumlah Belanjaan: ", this.belanja.length);
    let totalBayar = null;
    for (let i = 0; i < keranjang.belanja.length; i++) {
      totalBayar += keranjang.belanja[i].total;
      console.log(
        `- ${keranjang.belanja[i].nama} - Rp${keranjang.belanja[i].harga} (x${keranjang.belanja[i].jumlah}) = Rp${keranjang.belanja[i].total}`,
      );
    }
    console.log(`Total bayar: Rp${totalBayar}`);
    return totalBayar;
  },
};

async function pembelian(nama) {
  while (true) {
    try {
      await tampilkanMenu();
      const hasilInputMenu = await pilihMenu();
      await controlMenu(hasilInputMenu, nama);
      // await belanja(nama);
      break;
    } catch (err) {
      console.log("===========================");
      console.error("Error: ", err);
      console.log("Silahkan pilih menu kembali");
      console.log("===========================");
    }
  }
}

pembelian("Budi");

// promise handle resolve, reject tampilan menu
function tampilkanMenu() {
  return new Promise((resolve, reject) => {
    if (menu) {
      console.log("---------------------------");
      console.log("     Selamat di Warteg     ");
      console.log("---------------------------");
      home.forEach((menu, index) => {
        console.log(`${index + 1}. ${menu}`);
      });
      resolve();
    } else {
      reject("menu tidak muncul, coba lagi");
    }
  });
}

// promise handling resolve dan reject pilih menu
function pilihMenu() {
  return new Promise((resolve, reject) => {
    console.log("================================");
    rl.question("Pilih Menu: ", function (pilihan) {
      const pilihHome = Number(pilihan);
      if (
        Number.isInteger(pilihHome) &&
        pilihHome >= 1 &&
        pilihHome <= home.length
      ) {
        resolve(home[pilihHome - 1]);
      } else {
        reject("Pilihan Menu Tidak Tersedia");
      }
    });
  });
}

// promise handing resolve control menu
function controlMenu(hasilInputMenu, nama) {
  return new Promise((resolve) => {
    switch (hasilInputMenu) {
      case "Menu Utama":
        resolve(belanja(nama));
        break;
      case "Riwayat":
        resolve(riwayatTransaksi(nama));
        break;
      case "Data User":
        resolve(dataUser(url, nama));
        break;
      case "exit":
        rl.close();
        break;
    }
  });
}

function belanja(nama) {
  console.log("====================================");
  console.log("------ Pilihan Menu Makanan --------");
  console.log("------------------------------------");
  menu.forEach((makanan, index) => {
    console.log(`${index + 1}. ${makanan.nama} - Rp${makanan.harga}`);
  });
  keranjang.pembeli = nama;
  console.log("------------------------------------");
  rl.question("Pilih makanan: ", function (pilihMakanan) {
    // console.log(typeof pilihMakanan)
    const makanan = Number(pilihMakanan);
    if (makanan > 0 && makanan <= menu.length) {
      console.log(`${menu[makanan - 1].nama} - Rp${menu[makanan - 1].harga}`);
      rl.question("Jumlah: ", function (jumlah) {
        // console.log(typeof jumlah)
        const banyak = Number(jumlah);
        console.log(
          `${menu[makanan - 1].nama} - Rp${menu[makanan - 1].harga} (x${banyak})`,
        );

        let total = menu[pilihMakanan - 1].harga * banyak;
        keranjang.belanja.push({
          nama: menu[makanan - 1].nama,
          harga: menu[makanan - 1].harga,
          jumlah: banyak,
          total: total,
        });

        rl.question("tambah makanan?(y/n)", function (tambah) {
          const lowerTambah = tambah.toLowerCase();
          if (lowerTambah === "y") {
            belanja(nama);
            return;
          } else {
            // let totalBayar = null;
            console.log("===================================");
            console.log("keranjang: ");
            console.log("Memproses...");
            setTimeout(() => {
              keranjang.ringkasan();
              checkOut(nama);
            }, 2000);
            console.log("Detai:");
          }
        });
      });
    } else {
      console.log("==============================");
      console.log("Makanan TIDAK TERSEDIA");
      console.log("==============================");
      belanja(nama);
    }
  });
}

function checkOut(nama) {
  console.log("====================================");
  rl.question("Konfirmasi Pembayaran(y/n): ", function (jadi) {
    // console.log(typeof jadi)
    if (jadi.toUpperCase() === "Y") {
      console.log("================================");
      console.log("---Terima Kasih sudah belanja---");
      // cetakStrukBelanja(nama);

      setTimeout(() => {
        pembelian(nama);
      }, 2000);

      riwayat.push({
        ...keranjang,
        status: "Pembayaran Lunas",
      });
    } else {
      console.log("================================");
      console.log("---Terima kasih Sudah datang---\n");
      pembelian(nama);
    }
  });
}

function riwayatTransaksi(nama) {
  const cariKeranjang = riwayat.find((keranjang) => keranjang.pembeli === nama);
  if (!cariKeranjang) {
    console.log("Tidak ada riwayat Transaksi");
    rl.question("keluar menu(y/n): ", function (keluar2) {
      // console.log(typeof keluar2)
      if (keluar2.toUpperCase() === "Y") {
        pembelian(nama);
        return;
      } else {
        riwayatTransaksi(nama);
      }
    });
    return;
  }
  const { pembeli, belanja, status } = cariKeranjang;
  console.log(`Pembeli: ${pembeli}`);

  const arrayBelanjaan = [...belanja];
  let totalPembayaran = null

  let l = 0;
  do {
    const { nama: makanan, harga, jumlah, total } = arrayBelanjaan[l];
    console.log(`${l + 1}. ${makanan} - Rp${harga} (x${jumlah}) - ${total}`);
    totalPembayaran += total;
    l++;
  } while (l < arrayBelanjaan.length);

  // console.log(arrayBelanjaan)

  console.log(`Total: Rp${totalPembayaran}`);
  console.log(`Status: ${status}`);
  console.log("=====================================");
  rl.question("keluar menu(y/n): ", function (keluarMenu2) {
    if (keluarMenu2.toUpperCase() === "Y") {
      pembelian(nama);
      return;
    } else {
      riwayatTransaksi(nama);
    }
  });
}

function dataUser(url, nama) {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const arrayNamaUser = [];
      data.forEach((item) => {
        arrayNamaUser.push({
          name: item.name,
          phone: item.phone,
        });
      });
      arrayNamaUser.forEach((items, index) => {
        console.log(`${index + 1}. ${items.name} - ${items.phone}`);
      });
      console.log("=====================================");
      rl.question("keluar menu(y/n): ", function (keluar) {
        if (keluar.toUpperCase() === "Y") {
          pembelian(nama);
          return;
        } else {
          dataUser(url, nama);
        }
      });
    })
    .catch((err) => {
      console.error("Error: ", err);
    });
}
