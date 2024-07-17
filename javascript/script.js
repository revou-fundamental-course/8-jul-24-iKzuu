// Anang Setiaji

function showPopup(message) { // function untuk menampilkan pop up + message
    document.getElementById('popupMessage').textContent = message;
    document.getElementById('overlay').style.display = 'block';
    const popup = document.getElementById('popup');
    popup.style.display = 'block';
    requestAnimationFrame(() => {
        popup.classList.add('show');
        popup.classList.remove('hide');
    });
}

function closePopup(){ // function untuk close pop up
    const popup = document.getElementById('popup');
    popup.classList.remove('show');
    popup.classList.add('hide');
    popup.addEventListener('transitionend', () => {
        popup.style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    }, { once: true});
}

function validateForm() { // function validasi form
    const selectedGender = document.querySelector('input[name="option"]:checked'); 
    let tinggi = document.getElementById('tinggi').value.trim(); // mengambil value dari input html dengan id='tinggi' dengan menghilangkan spasi di awal dan akhir
    let usia = document.getElementById('usia').value.trim(); // mengambil value dari input html dengan id='usia' dengan menghilangkan spasi di awal dan akhir
    let berat = document.getElementById('berat').value.trim(); // mengambil value dari input html dengan id='berat' dengan menghilangkan spasi di awal dan akhir

    if(!selectedGender) {
        showPopup("Silahkan pilih Jenis Kelamin");
        return;
    }

    if(tinggi === "" || berat === "" || usia === "") { // ketika input kosong atau "e"
        showPopup("Silahkan isi semua data"); // akan muncul popup dengan message
        return;
    }

    // validasi untuk tinggi badan: harus angka dan tidak boleh ada simbol
    let tggi = parseFloat(tinggi.replace(",", ".")); // mengganti koma dengan titik untuk format desimal
    if (isNaN(tggi) || !/^\d+(\.\d+)?$/.test(tinggi)) { // Memeriksa apakah tinggi adalah angka
        showPopup("Tinggi badan harus berupa angka yang valid");
        return;
    }

    // Validasi untuk usia: harus angka dan tidak boleh ada simbol
    let umur = parseInt(usia, 10); // Memeriksa apakah usia adalah angka bulat
    if (isNaN(umur) || !/^\d+$/.test(usia)) {
        showPopup("Usia harus berupa angka yang valid");
        return;
    }

    // validasi untuk berat badan: harus angka dan tidak boleh ada simbol
    let beratbdn = parseFloat(berat.replace(",", ".")); // sama seperti tinggi
    if(isNaN(beratbdn) || !/^\d+(\.\d+)?$/.test(berat)) { // sama seperti tinggi
        showPopup("Berat badan harus berupa angka yang valid");
        return;
    }


    if(usia < 18) { // menghandle jika usia yang user masukkan di bawah 18 tahun
        showPopup("Perhitungan BMI hanya untuk orang dewasa (usia 18 tahun ke atas)!");
        return;
    }

    // jika semua validasi lolos, lanjut ke perhitungan BMI
    hitungBadan();
}

function hitungBadan() { // function untuk tombol Hitung BMI
    const selectedGender = document.querySelector('input[name="option"]:checked'); 
    let tinggi = parseFloat(document.getElementById('tinggi').value) / 100; // mengambil value dari input html dengan id='tinggi' yang kemudian di konversi menjadi meter menggunakan /100
    let usia = parseInt(document.getElementById('usia').value); // mengambil value dari input html dengan id='usia'
    let berat = parseFloat(document.getElementById('berat').value); // mengambil value dari input html dengan id='berat'

    const jenis = selectedGender.value; // mengambil value dari input radio jenis kelamin

    let bmi = berat / (tinggi * tinggi); // penghitungan BMI
    let hasil = bmi.toFixed(2); // toFixed(2) mengubah nilai 'bmi' menjadi string, dan menetapkan string memiliki dua angka desimal :)

    document.getElementById('angka-hasil').innerHTML = hasil; // menampilkan 
    document.getElementById('gender').innerHTML = 'Gender : ' + jenis;
    document.getElementById('umur').innerHTML = 'Usia : ' + usia;
    
    if (hasil < 18.5) { // kondisi ketika hasil BMI kurang dari 18.5
        document.getElementById('hasil').innerHTML = "Kekurangan Berat Badan"; // menampilkan hasil pada element html id='hasil'

        // menampilkan informasi mengenai hasil pada element html id='article-hasil'
        document.getElementById('article-hasil').innerHTML = "BMI kurang dari 18.5 dapat menunjukkan kekurangan berat badan. Ini menandakan bahwa berat badan seseorang relatif rendah untuk tinggi badan mereka. Kondisi ini dapat disebabkan oleh berbagai faktor seperti diet tidak seimbang, masalah kesehatan tertentu, atau pola makan yang tidak memadai. Kekurangan berat badan dapat memiliki dampak negatif pada kesehatan seperti penurunan energi, risiko rendahnya kadar lemak tubuh, dan masalah lainnya terkait gizi.";

        document.getElementById('anda-memiliki').innerHTML = "Badan anda terlalu kurus"; // menampilkan text pada element html id='anda-memiliki'

    } else if (hasil < 24.9) { // kondisi ketika hasil BMI kurang dari 24.9 atau sama dengan 18.5
        document.getElementById('hasil').innerHTML = "Berat Badan Normal (Ideal)";

        document.getElementById('article-hasil').innerHTML = "BMI antara 18.5 dan 24.9 umumnya dianggap sebagai berat badan normal atau ideal. Rentang ini menunjukkan bahwa berat badan seseorang seimbang dengan tinggi badan mereka secara proporsional. Memiliki BMI dalam kategori ini biasanya dikaitkan dengan risiko lebih rendah terhadap berbagai masalah kesehatan seperti penyakit jantung, diabetes, dan masalah kesehatan lainnya.";

        document.getElementById('anda-memiliki').innerHTML = "Anda memiliki berat badan ideal";

    } else if (hasil < 29.9) { // kondisi ketika hasil BMI kurang dari 29.9 atau samadengan 25.0
        document.getElementById('hasil').innerHTML = "Kelebihan Berat badan";

        document.getElementById('article-hasil').innerHTML = "BMI antara 25.0 dan 29.9 menunjukkan kelebihan berat badan. Ini menandakan bahwa seseorang memiliki berat badan yang lebih tinggi dari yang dianggap ideal untuk tinggi badan mereka. Kelebihan berat badan dapat meningkatkan risiko terhadap berbagai penyakit kronis seperti penyakit jantung, diabetes tipe 2, tekanan darah tinggi, dan beberapa jenis kanker. Perubahan gaya hidup termasuk diet sehat dan olahraga teratur sering kali direkomendasikan untuk mengurangi risiko kesehatan yang terkait dengan kelebihan berat badan.";

        document.getElementById('anda-memiliki').innerHTML = "Anda memiliki berat badan berlebih";

    } else { // kondisi ketika hasil BMI 30.0 atau lebih
        document.getElementById('hasil').innerHTML = "Kegemukan (Obesitas)";
        
        document.getElementById('article-hasil').innerHTML = "BMI 30.0 atau lebih menunjukkan obesitas. Obesitas merupakan kondisi yang serius dan menunjukkan bahwa seseorang memiliki jumlah lemak tubuh yang berlebihan. Obesitas dapat meningkatkan risiko terhadap sejumlah besar kondisi medis serius termasuk diabetes, penyakit jantung, stroke, osteoartritis, dan beberapa jenis kanker. Pengelolaan berat badan melalui diet sehat, aktivitas fisik, dan mungkin intervensi medis sering diperlukan untuk mengurangi risiko kesehatan yang terkait dengan obesitas.";

        document.getElementById('anda-memiliki').innerHTML = "Badan anda terlalu besar";
    }
}

function downloadHasil () {
    // mengumpulkan data yang ingin di download
    let hasil = document.getElementById('hasil').textContent;
    let angkaHasil = document.getElementById('angka-hasil').textContent.trim();
    let andaMemiliki = document.getElementById('anda-memiliki').textContent;
    let gender = document.getElementById('gender').textContent;
    let umur = document.getElementById('umur').textContent;
    let articleHasil = document.getElementById('article-hasil').textContent;

    if (angkaHasil === "hasil hitung akan di tampilkan disini") {
        showPopup("Harap hitung BMI terlebih dahulu sebelum mengunduh hasil.");
        return;
    }

    // hasil yang akan di tampilkanpada file.txt ketika di download
    let downloadContent =  `
        Hasil : ${hasil}
        Angka Hasil : ${angkaHasil}
        Berat Badan : ${andaMemiliki}

        ${gender}
        ${umur}

        Hasil Perhitungan :
        ${articleHasil}
    `

    // membuat object blob dari hasil yang akan di download
    let blob = new Blob([downloadContent], { type: 'text/plain' });

    let url = URL.createObjectURL(blob);

    let a = document.createElement('a');
    a.href = url;
    a.download = 'hasil_perhitungan_bmi.txt';
    a.click();

    URL.revokeObjectURL(url);
}

// membuat reset button
function resetButton() {
    // clear input form
    document.getElementById('tinggi').value = '';
    document.getElementById('umur').value = '';
    document.getElementById('berat').value = '';

    // reset hasil bmi
    document.getElementById('hasil').textContent = '';
    document.getElementById('angka-hasil').textContent = 'hasil hitung akan di tampilkan disini';
    document.getElementById('anda-memiliki').textContent = '';
    document.getElementById('gender').textContent = '';
    document.getElementById('umur').textContent = '';
    document.getElementById('article-hasil').textContent = '';
}