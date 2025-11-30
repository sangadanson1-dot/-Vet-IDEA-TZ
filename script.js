// DARK MODE
const toggleTheme = () => {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  document.getElementById('theme-toggle').textContent = next === 'dark' ? '☀️' : '🌙';
};

document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  document.getElementById('theme-toggle').textContent = saved === 'dark' ? '☀️' : '🌙';
});

document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

// AI CHAT
const toggleChat = () => {
  const panel = document.getElementById('ai-chat-panel');
  panel.classList.toggle('active');
};

const addMessage = (text, sender) => {
  const messagesDiv = document.getElementById('chat-messages');
  const msgDiv = document.createElement('div');
  msgDiv.className = `msg ${sender}`;
  msgDiv.textContent = text;
  messagesDiv.appendChild(msgDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

const sendMessage = () => {
  const input = document.getElementById('user-input');
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, 'user');
  input.value = '';

  setTimeout(() => {
    let reply = "Asante kwa kuuliza! Kwa ushauri wa halisi, wasiliana nami kwa simu: 0776 011 896 — nitakusaidia mara moja.";
    
    const lower = text.toLowerCase();
    if (lower.includes('ecf') || lower.includes('east coast')) {
      reply = "ECF (East Coast Fever) husababishwa na buibui wa Theileria. Dalili: joto, macho yanauma, mapafu yanashinda kwa nguvu. Matibabu: Parvaquone (Ovitrel). Ukingo: Infection & Treatment Method (ITM).";
    } else if (lower.includes('chanjo') || lower.includes('vaccin')) {
      reply = "Ratiba ya chanjo ya ng’ombe Tanzania:\n• 3–6 miezi: CBPP\n• 4–8 miezi: ECF (kwa ITM)\n• Kila mwaka: FMD kama inapatikana.";
    } else if (lower.includes('maziwa') || lower.includes('mastitis')) {
      reply = "Mastitis: Ongeza usafi wa mkono na vifaa. Matibabu: Antibiotics za intramammary (Mastiplan). Fanya CMT kila mwezi.";
    } else if (lower.includes('jotoro') || lower.includes('bloat')) {
      reply = "Jotoro (Bloat): Fanya tundu la ndogo kwenye tumbo kwa kisu kilichosafishwa. Matibabu ya haraka: Anti-foaming agents (kama vegetable oil 200ml kwa ng'ombe mkubwa).";
    }

    addMessage(reply, 'ai');
  }, 600);
};

document.getElementById('user-input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      if (document.getElementById('ai-chat-panel').classList.contains('active')) {
        toggleChat();
      }
    }
  });
});
