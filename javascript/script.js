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
    let tinggi = parseFloat(document.getElementById('tinggi').value) / 100; // mengambil value dari input html dengan id='tinggi' yang kemudian di konversi menjadi meter menggunakan /100
    let usia = parseInt(document.getElementById('usia').value); // mengambil value dari input html dengan id='usia'
    let berat = parseFloat(document.getElementById('berat').value); // mengambil value dari input html dengan id='berat'

    if(!selectedGender) {
        showPopup("Silahkan pilih Jenis Kelamin");
        return;
    }

    if(isNaN(usia) || isNaN(berat) || isNaN(tinggi)) { // ketika input kosong atau "e"
        showPopup("Silahkan isi semua data"); // akan muncul popup dengan message
        return;
    }

    if(parseInt(usia) < 18) { // menghandle jika usia yang user masukkan di bawah 18 tahun
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
