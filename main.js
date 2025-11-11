const BOT_TOKEN = '8328125073:AAEWoSW-yjqgPLq4uLPEKGyemwa2lr47x6I';
const CHAT_ID = '-4935605017';
const TELEGRAM_CHANNEL = 'https://t.me/megaaksiya2026';

const openModal = document.getElementById('openModal');
const formModal = document.getElementById('makon-modal');
const closeModal = document.getElementById('closeModal');
const makonForm = document.getElementById('makonForm');

openModal.addEventListener('click', () => formModal.classList.add('show'));
closeModal.addEventListener('click', () => formModal.classList.remove('show'));

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
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });

    formModal.classList.remove('show');
    makonForm.reset();
    window.location.href = TELEGRAM_CHANNEL;

  } catch (error) {
    alert("Xatolik yuz berdi, qayta urinib ko‘ring!");
    console.error(error);
  }
});
