# flow warteg app

## Algoritma deskriptif

```penjelasan
1. program memeriksa apakah array menu truthy atau memiliki list menu
2. jika iya maka resolve dan menampilkan semua menu
3. jika tidak maka reject dan menuju catch dan program akan menampilkan pesan errr dan mengulangi await kembali
4. setelah resolve maka program selesai dan menuju await selanjutnya yaitu pilih menu.
5. pilih menu memiliki promise handle oleh resolve dan reject.
6. jika resolve maka akan menampilkan semua menu makanan dan menampilkan inputan atau question memilih menu lalu menyimpan nilai inputan menu index ke dalam resolve
7. jika reject maka akan masuk catch dan mengambil pesan pengembalian dari reject, lalu program looping kembali ke await sebelumnya
8. resolve(index menu) simpan dalam variabel hasilInput dan program selesai dan menuju await control menu
9. dari hasilInputIndex pada await pilih menu, program akan memilih sesuai index nama menu pada pengkondisian swith case jika 1 maka memilih makanan, jika 2 maka tampilkan riwayat cekout, jika 3 maka data user, jika 4 maka exit dan callback dari inputan question bakalan close()
10. jika sesuai index maka resolve dan menuju functionnya masing masing
11. misalkan index 0 yaitu belanja maka tampilkan function belanja
12. lalu terjadi proses menampilkan makanan, input memilih menu, lalu menanyakan kembali tambah makanan, kemudian program akan menyimpan/push ke dalam keranjang pembelian.
13. setelah dimasukkan kedalam keranjang maka panggil function checkOut dan konfirmasi pembayaran
14 jika Ya maka program akan push ke riwayat belanja, jika tidak akan menampilkan "terima kasih sudah datang"
15 lalu program kembali ke function utama dan menampilkan menu
```
