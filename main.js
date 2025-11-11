const BOT_TOKEN = '8328125073:AAEWoSW-yjqgPLq4uLPEKGyemwa2lr47x6I';
const CHAT_ID   = '-4935605017';

// Elementlar
const openModalBtn = document.getElementById('openModal');
const formModal = document.getElementById('makon-modal');
const closeModalBtn = document.getElementById('closeModal');
const makonForm = document.getElementById('makonForm');

// Modal ochish
openModalBtn.addEventListener('click', () => {
    formModal.classList.add('show');
});

// Modal yopish faqat × tugmasi
closeModalBtn.addEventListener('click', () => {
    formModal.classList.remove('show');
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
            makonForm.reset();

            // To'g'ridan-to'g'ri Telegram kanalga yo'naltirish
            window.open('https://t.me/megaaksiya2026', '_blank');
        } else {
            throw new Error('Telegram xizmati xatosi');
        }
    } catch (error) {
        alert("Xatolik yuz berdi, qayta urinib ko‘ring!");
        console.error(error);
    }
});
