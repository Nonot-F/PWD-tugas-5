
// 1. OBJECT DAN ARRAY

// Object menggunakan literal
let produk1 = {
    id: 1,
    nama: "Baju seragam",
    harga: 100000,
    stok: 5
};

// Object menggunakan new Object()
let produk2 = new Object();
produk2.id = 2;
produk2.nama = "celana";
produk2.harga = 200000;
produk2.stok = 10;

// Array of Object
let produk = [
    produk1,
    produk2,
    {
        id: 3,
        nama: "topi",
        harga: 80000,
        stok: 8
    },
    {
        id: 4,
        nama: "rok",
        harga: 150000,
        stok: 0
    },
    {
        id: 5,
        nama: "dasi",
        harga: 20000,
        stok: 4
    }
];

// Array keranjang
let keranjang = [];


// 2. DOM SELECTION

let daftarProduk = document.getElementById("daftarProduk");

let daftarKeranjang = document.querySelector("#daftarKeranjang");

let jumlahItem = document.getElementsByClassName("keranjang")[0];

let totalHarga = document.getElementById("totalHarga");

let hasilRingkasan = document.querySelector("#hasilRingkasan");


// 3. MENAMPILKAN PRODUK

function tampilkanProduk() {

    daftarProduk.innerHTML = "";

    for (let i = 0; i < produk.length; i++) {

        let card = document.createElement("div");
        card.className = "produk";

        let nama = document.createElement("h3");
        nama.appendChild(
            document.createTextNode(produk[i].nama)
        );

        let harga = document.createElement("p");
        harga.appendChild(
            document.createTextNode(
                "Harga: Rp " + produk[i].harga.toLocaleString("id-ID")
            )
        );

        let stok = document.createElement("p");
        stok.appendChild(
            document.createTextNode("Stok: " + produk[i].stok)
        );

        let tombol = document.createElement("button");
        tombol.appendChild(
            document.createTextNode("Tambah ke Keranjang")
        );

        tombol.onclick = function() {
            tambahKeranjang(produk[i].id);
        };

        // Menandai produk yang stoknya habis
        if (produk[i].stok === 0) {
            card.style.backgroundColor = "#ffe0e0";
            card.style.color = "red";
            tombol.disabled = true;
        }

        card.appendChild(nama);
        card.appendChild(harga);
        card.appendChild(stok);
        card.appendChild(tombol);

        daftarProduk.appendChild(card);
    }
}


// 4. MENAMBAHKAN PRODUK KE KERANJANG

function tambahKeranjang(id) {

    let barang = produk.find(p => p.id === id);

    if (barang.stok === 0) {
        alert("Maaf, stok produk habis!");
        return;
    }

    // Mengurangi stok
    barang.stok--;

    // Menambahkan produk menggunakan push()
    keranjang.push({
        id: barang.id,
        nama: barang.nama,
        harga: barang.harga
    });

    tampilkanProduk();
    tampilkanKeranjang();
}


// 5. MENAMPILKAN KERANJANG

function tampilkanKeranjang() {

    daftarKeranjang.innerHTML = "";

    for (let i = 0; i < keranjang.length; i++) {

        let item = document.createElement("li");

        let teks = document.createTextNode(
            keranjang[i].nama + " - Rp " +
            keranjang[i].harga.toLocaleString("id-ID")
        );

        item.appendChild(teks);

        let tombolHapus = document.createElement("button");

        tombolHapus.appendChild(
            document.createTextNode("Hapus")
        );

        tombolHapus.onclick = function() {
            hapusItem(i);
        };

        item.appendChild(tombolHapus);
        daftarKeranjang.appendChild(item);
    }

    hitungTotal();
}


// 6. MENGHAPUS ITEM MENGGUNAKAN removeChild()

function hapusItem(index) {

    let yakin = confirm("Apakah yakin ingin menghapus item ini?");

    if (yakin) {

        let itemDihapus = keranjang[index];

        // Mengembalikan stok produk
        let barang = produk.find(p => p.id === itemDihapus.id);
        barang.stok++;

        // Menghapus data dari array
        keranjang.splice(index, 1);

        // Menghapus elemen menggunakan removeChild()
        let itemHTML = daftarKeranjang.children[index];
        daftarKeranjang.removeChild(itemHTML);

        tampilkanProduk();
        tampilkanKeranjang();
    }
}


// 7. MEMBATALKAN ITEM TERAKHIR MENGGUNAKAN pop()

document.getElementById("batalTerakhir").onclick = function() {

    if (keranjang.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }

    let yakin = confirm("Batalkan item terakhir?");

    if (yakin) {

        let item = keranjang.pop();

        let barang = produk.find(p => p.id === item.id);
        barang.stok++;

        tampilkanProduk();
        tampilkanKeranjang();
    }
};


// 8. MENGHITUNG TOTAL HARGA

function hitungTotal() {

    let total = 0;

    for (let i = 0; i < keranjang.length; i++) {
        total += keranjang[i].harga;
    }

    totalHarga.innerHTML =
        "Total: Rp " + total.toLocaleString("id-ID");

    jumlahItem.innerHTML =
        "Jumlah Item: " + keranjang.length;
}


// 9. MENGOSONGKAN KERANJANG

document.getElementById("kosongkan").onclick = function() {

    if (keranjang.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }

    let yakin = confirm("Apakah ingin mengosongkan keranjang?");

    if (yakin) {

        for (let i = 0; i < keranjang.length; i++) {
            let barang = produk.find(
                p => p.id === keranjang[i].id
            );

            barang.stok++;
        }

        keranjang = [];

        tampilkanProduk();
        tampilkanKeranjang();
    }
};


// 10. CHECKOUT MENGGUNAKAN prompt()

document.getElementById("checkout").onclick = function() {

    if (keranjang.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }

    let namaPembeli = prompt("Masukkan nama pembeli:");

    if (namaPembeli === null || namaPembeli.trim() === "") {
        alert("Checkout dibatalkan. Nama harus diisi!");
        return;
    }

    let daftarItem = [];

    let total = 0;

    for (let i = 0; i < keranjang.length; i++) {

        daftarItem.push(keranjang[i].nama);

        total += keranjang[i].harga;
    }

    // Menggabungkan nama produk menggunakan join()
    hasilRingkasan.innerHTML =
        "<h3>Pesanan Berhasil!</h3>" +
        "<p>Nama Pembeli: " + namaPembeli + "</p>" +
        "<p>Daftar Item: " + daftarItem.join(", ") + "</p>" +
        "<p>Total Harga: Rp " +
        total.toLocaleString("id-ID") + "</p>";

    // Mengosongkan keranjang setelah checkout
    keranjang = [];

    tampilkanKeranjang();
    tampilkanProduk();

    alert("Terima kasih sudah berbelanja!");
};


// 11. MENAMPILKAN PRODUK PERTAMA KALI

tampilkanProduk();
tampilkanKeranjang();
