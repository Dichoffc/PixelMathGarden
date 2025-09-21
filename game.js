// game.js

const questionBoard = document.getElementById('question-text');
const potContainer = document.getElementById('plant-pot-container');
const messageBox = document.getElementById('message-box');
const heartContainer = document.getElementById('heart-container');

let playerLives = 3;
let currentAnswer;

// Fungsi untuk membuat soal dan menampilkan pilihan jawaban
function generateQuestion(type) {
    let num1, num2, questionText, answer;

    switch (type) {
        case 'plant':
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            answer = num1 + num2;
            questionText = `${num1} + ${num2} = ?`;
            break;
        case 'water':
            num1 = Math.floor(Math.random() * 15) + 5;
            num2 = Math.floor(Math.random() * 5) + 1;
            answer = num1 - num2;
            questionText = `${num1} - ${num2} = ?`;
            break;
        case 'harvest':
            num1 = Math.floor(Math.random() * 5) + 2;
            num2 = Math.floor(Math.random() * 5) + 2;
            answer = num1 * num2;
            questionText = `${num1} * ${num2} = ?`;
            break;
    }

    currentAnswer = answer;
    questionBoard.textContent = questionText;
    displayAnswerOptions(answer);
}

// Fungsi untuk menampilkan pilihan jawaban di pot bunga
function displayAnswerOptions(correctAnswer) {
    potContainer.innerHTML = ''; // Bersihkan pot sebelumnya
    let answers = [correctAnswer];
    while (answers.length < 3) {
        let wrongAnswer = Math.floor(Math.random() * 20) + 1;
        if (!answers.includes(wrongAnswer) && wrongAnswer !== correctAnswer) {
            answers.push(wrongAnswer);
        }
    }
    
    answers.sort(() => Math.random() - 0.5); // Acak posisi jawaban

    answers.forEach(ans => {
        const potDiv = document.createElement('div');
        potDiv.className = 'plant-pot';
        potDiv.innerHTML = `<span>${ans}</span>`;
        potDiv.addEventListener('click', () => checkAnswer(ans));
        potContainer.appendChild(potDiv);
    });
}

// Fungsi untuk memeriksa jawaban pemain
function checkAnswer(playerAnswer) {
    if (playerAnswer === currentAnswer) {
        showMessage("Jawaban benar! Bunga tumbuh mekar! 🌱", "correct");
        // Di sini tambahkan logika untuk "menanam", "menyiram", atau "memanen"
    } else {
        playerLives--;
        updateLivesDisplay();
        showMessage("Jawaban salah. Coba lagi!", "wrong");
        if (playerLives <= 0) {
            endGame();
        }
    }
}

// Fungsi untuk memperbarui tampilan nyawa
function updateLivesDisplay() {
    const hearts = heartContainer.querySelectorAll('.heart');
    hearts.forEach((heart, index) => {
        if (index < playerLives) {
            heart.style.opacity = 1;
        } else {
            heart.style.opacity = 0.3;
        }
    });
}

// Fungsi untuk menampilkan pesan di message box
function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.style.display = 'block';
    if (type === 'correct') {
        messageBox.style.backgroundColor = 'rgba(124, 252, 0, 0.8)';
    } else if (type === 'wrong') {
        messageBox.style.backgroundColor = 'rgba(255, 99, 71, 0.8)';
    }
    // Sembunyikan pesan setelah beberapa detik
    setTimeout(() => {
        messageBox.style.display = 'none';
    }, 2000);
}

// Fungsi untuk mengakhiri game
function endGame() {
    setTimeout(() => {
        alert("Game Over! Kamu kehabisan nyawa.");
        location.reload(); // Muat ulang halaman untuk memulai ulang
    }, 500);
}

// Event Listeners untuk tombol-tombol aksi
document.getElementById('plant-button').addEventListener('click', () => {
    generateQuestion('plant');
});

document.getElementById('water-button').addEventListener('click', () => {
    generateQuestion('water');
});

document.getElementById('harvest-button').addEventListener('click', () => {
    generateQuestion('harvest');
});

// Inisialisasi tampilan awal
window.onload = () => {
    updateLivesDisplay();
    questionBoard.textContent = "Pilih aksi untuk mulai!";
};
