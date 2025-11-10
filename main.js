const BOT_TOKEN = '8328125073:AAEWoSW-yjqgPLq4uLPEKGyemwa2lr47x6I';
const CHAT_ID   = '-4935605017';

// Elementlar
const openModalBtn = document.getElementById('openModal');
const formModal = document.getElementById('makon-modal');
const successModal = document.getElementById('successModal');
const closeModalBtn = document.getElementById('closeModal');
const makonForm = document.getElementById('makonForm');

// Modal ochish
openModalBtn.addEventListener('click', () => {
    formModal.classList.add('show');
});

// Modal yopish (x tugmasi)
closeModalBtn.addEventListener('click', () => {
    formModal.classList.remove('show');
});

// Muvaffaqiyat modalini yopish
document.querySelectorAll('#successModal .close').forEach(btn => {
    btn.addEventListener('click', () => {
        successModal.classList.remove('show');
    });
});

// Tashqariga bosganda yopish
window.addEventListener('click', (e) => {
    if (e.target === formModal) {
        formModal.classList.remove('show');
    }
    if (e.target === successModal) {
        successModal.classList.remove('show');
    }
});

// Formani yuborish
makonForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!name || !phone) {
        alert("Iltimos, barcha maydonlarni to‘ldiring!");
        return;
    }

    const message = `📝 Yangi so‘rov:\n👤 Ism: ${name}\n📞 Telefon: ${phone}\n🌐 Sayt: 2 oq sayt`;

    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });

        if (response.ok) {
            formModal.classList.remove('show');
            successModal.classList.add('show');
            makonForm.reset();
        } else {
            throw new Error('Telegram xizmati xatosi');
        }
    } catch (error) {
        alert("Xatolik yuz berdi, qayta urinib ko‘ring!");
        console.error(error);
    }
});