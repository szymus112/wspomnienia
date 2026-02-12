// DATA STARTU
const startDate = new Date(2025, 10, 9, 0, 0, 0);

function updateTimer() {
    const daysEl = document.getElementById('days');
    if (!daysEl) return; // Jeśli nie jesteśmy na stronie main.html

    const now = new Date();
    const diff = now - startDate;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    
    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours;
    document.getElementById('minutes').innerText = minutes;
    document.getElementById('seconds').innerText = seconds;
}

if (document.getElementById('days')) {
    setInterval(updateTimer, 1000);
    updateTimer();
}

// OBSŁUGA MULTIMEDIÓW
const audio = document.getElementById('bg-music');
const musicIcon = document.getElementById('music-icon');

if (audio) {
    audio.volume = 0.2;
    // Automatyczne odtwarzanie po wejściu na main.html
    window.addEventListener('load', () => {
        audio.play().catch(e => console.log("Autoplay blocked, waiting for interaction"));
    });
}

function toggleMusic() {
    if (audio.paused) {
        audio.play();
        musicIcon.className = "fas fa-volume-up";
    } else {
        audio.pause();
        musicIcon.className = "fas fa-volume-mute";
    }
}

// FUNKCJE MODALA
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const modalCaption = document.getElementById('modal-caption');

function openModal(element) {
    const img = element.querySelector('img');
    modal.style.display = "flex";
    modalImg.src = img.src;
    modalCaption.innerText = img.alt;
    document.body.style.overflow = "hidden";
}

function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

function openReasonModal(title, text) {
    const modal = document.getElementById('description-modal');
    document.getElementById('desc-title').innerText = title;
    document.getElementById('desc-text').innerText = text;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // blokuje przewijanie tła
}

function closeDescModal() {
    document.getElementById('description-modal').style.display = 'none';
    document.body.style.overflow = 'auto'; // przywraca przewijanie
}

let currentCouponId = null;

function askCoupon(id, title) {
    if (localStorage.getItem(id)) return;
    currentCouponId = id;
    document.getElementById('modal-coupon-title').innerText = "" + title;
    document.getElementById('coupon-modal').style.display = 'flex';
    
    document.getElementById('confirm-coupon-btn').onclick = function() {
        executeUseCoupon(currentCouponId);
    };
}

function closeCouponModal() {
    document.getElementById('coupon-modal').style.display = 'none';
}

function executeUseCoupon(id) {
    const card = document.getElementById(id);
    if (card) {
        card.classList.add('used');
        const badge = card.querySelector('.status-badge');
        if (badge) badge.innerText = "WYKORZYSTANO ✅";
        localStorage.setItem(id, 'used');
    }
    closeCouponModal();
}

function resetCoupons() {
    if(confirm("Zresetować wszystkie kupony?")) {
        ['coupon-1', 'coupon-2', 'coupon-3'].forEach(id => localStorage.removeItem(id));
        location.reload();
    }
}

// Sprawdzanie stanu przy starcie
window.addEventListener('DOMContentLoaded', () => {
    ['coupon-1', 'coupon-2', 'coupon-3'].forEach(id => {
        if (localStorage.getItem(id)) {
            const card = document.getElementById(id);
            if(card) {
                card.classList.add('used');
                const badge = card.querySelector('.status-badge');
                if (badge) badge.innerText = "WYKORZYSTANO ✅";
            }
        }
    });
});

let noCount = 0;
const messages = [
    "Na pewno?", 
    "Chyba się pomyliłaś...", 
    "Pomyśl jeszcze raz! ❤️", 
    "Zastanów się dobrze!", 
    "Serio? :(", 
    "Nie przyjmuję takiej odpowiedzi!"
];

function handleNo() {
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    
    // Zwiększamy licznik kliknięć w NIE
    noCount++;
    
    // Zmieniamy tekst na przycisku NIE
    if (noCount < messages.length) {
        noBtn.innerText = messages[noCount];
    } else {
        noBtn.innerText = "Dobra, poddaję się...";
        noBtn.style.display = 'none'; // Przycisk znika po kilku próbach
    }
    
    // Powiększamy przycisk TAK przy każdej próbie kliknięcia NIE
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
    yesBtn.style.fontSize = (currentSize * 1.2) + "px";
    yesBtn.style.padding = (parseFloat(window.getComputedStyle(yesBtn).padding) * 1.1) + "px";
}

function celebrate() {
    const modal = document.getElementById('final-modal');
    modal.style.display = 'flex';
    
    // Opcjonalnie: możesz tu dodać konfetti, jeśli chcesz!
}

function closeFinalModal() {
    document.getElementById('final-modal').style.display = 'none';
}