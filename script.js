/* Wayne Ai — minimal but not embarrassing. */

const els = {
  sidebar: document.getElementById('sidebar'),
  menuBtn: document.getElementById('menuBtn'),
  themeBtn: document.getElementById('themeBtn'),
  exportBtn: document.getElementById('exportBtn'),
  clearAll: document.getElementById('clearAll'),

  navItems: [...document.querySelectorAll('.nav-item')],
  views: {
    chat: document.getElementById('view-chat'),
    history: document.getElementById('view-history'),
    settings: document.getElementById('view-settings')
  },

  chatList: document.getElementById('chatList'),
  form: document.getElementById('chatForm'),
  textarea: document.getElementById('message'),
  sendBtn: document.getElementById('sendBtn'),
  mode: document.getElementById('mode'),
  hint: document.getElementById('tokenHint'),

  attachBtn: document.getElementById('attachBtn'),
  fileInput: document.getElementById('fileInput'),
  preview: document.getElementById('preview'),

  sessionList: document.getElementById('sessionList'),
  newSessionBtn: document.getElementById('newSessionBtn'),

  apiEndpoint: document.getElementById('apiEndpoint'),
  apiKey: document.getElementById('apiKey'),
  modelName: document.getElementById('modelName'),
  saveSettings: document.getElementById('saveSettings'),
};

const STORAGE_KEYS = {
  settings: 'wayne-ai:settings',
  sessions: 'wayne-ai:sessions',
};
let sessionId = Date.now().toString();
let sessions = loadSessions();
if (!sessions[sessionId]) sessions[sessionId] = [];

// UI wiring
els.menuBtn.addEventListener('click', () => els.sidebar.classList.toggle('open'));
els.themeBtn.addEventListener('click', toggleTheme);
els.exportBtn.addEventListener('click', exportChat);
els.clearAll.addEventListener('click', () => {
  localStorage.removeItem(STORAGE_KEYS.sessions);
  localStorage.removeItem(STORAGE_KEYS.settings);
  sessions = {}; sessionId = Date.now().toString(); sessions[sessionId] = [];
  renderHistory(); els.chatList.innerHTML = '';
});

els.navItems.forEach(btn => btn.addEventListener('click', () => switchView(btn)));
function switchView(btn){
  els.navItems.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const target = btn.dataset.view;
  for (const k in els.views) els.views[k].classList.add('hidden');
  els.views[target].classList.remove('hidden');
  if (target === 'history') renderHistory();
}

function toggleTheme(){
  const dark = document.documentElement.dataset.theme !== 'light';
  document.documentElement.dataset.theme = dark ? 'light' : 'dark';
}

els.attachBtn.addEventListener('click', () => els.fileInput.click());
els.fileInput.addEventListener('change', handleFiles);
function handleFiles(){
  const files = [...els.fileInput.files];
  if (!files.length) return;
  els.preview.innerHTML = '';
  files.slice(0,3).forEach(f => {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(f);
    els.preview.appendChild(img);
  });
  els.preview.hidden = false;
}

autoGrow(els.textarea);
els.textarea.addEventListener('input', () => autoGrow(els.textarea));
els.textarea.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    els.sendBtn.click();
  }
});

// Settings
hydrateSettings();
els.saveSettings.addEventListener('click', saveSettings);
function hydrateSettings(){
  const s = loadSettings();
  els.apiEndpoint.value = s.endpoint || '';
  els.apiKey.value = s.key || '';
  els.modelName.value = s.model || 'gpt-5';
}
function saveSettings(){
  const s = {
    endpoint: els.apiEndpoint.value.trim(),
    key: els.apiKey.value.trim(),
    model: els.modelName.value.trim() || 'gpt-5'
  };
  localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(s));
  els.hint.textContent = 'Settings saved';
  setTimeout(()=> els.hint.textContent = 'Ready', 1200);
}
function loadSettings(){
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.settings) || '{}'); }
  catch { return {}; }
}

// History
els.newSessionBtn?.addEventListener('click', () => {
  sessionId = Date.now().toString();
  sessions[sessionId] = [];
  saveSessions();
  renderHistory();
  els.navItems.find(n => n.dataset.view==='chat').click();
  els.chatList.innerHTML = '';
});
function loadSessions(){
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.sessions) || '{}'); }
  catch { return {}; }
}
function saveSessions(){
  localStorage.setItem(STORAGE_KEYS.sessions, JSON.stringify(sessions));
}
function renderHistory(){
  els.sessionList.innerHTML = '';
  const ids = Object.keys(sessions).sort((a,b)=> b.localeCompare(a));
  ids.forEach(id => {
    const li = document.createElement('li');
    const first = sessions[id][0]?.content?.slice(0,60) || 'New session';
    const count = sessions[id].length;
    li.innerHTML = `
      <span>${first}</span>
      <span class="meta">${new Date(+id).toLocaleString()} • ${count} msgs</span>
    `;
    li.addEventListener('click', () => {
      sessionId = id;
      loadSessionToView();
      els.navItems.find(n => n.dataset.view==='chat').click();
    });
    els.sessionList.appendChild(li);
  });
}
function loadSessionToView(){
  els.chatList.innerHTML = '';
  (sessions[sessionId] || []).forEach(m => addMessage(m.role, m.content));
}

// Messaging
els.form.addEventListener('submit', onSend);
els.sendBtn.addEventListener('click', () => els.form.requestSubmit());

async function onSend(e){
  e.preventDefault();
  const text = els.textarea.value.trim();
  if (!text && !els.fileInput.files.length) return;

  const userMsg = { role:'user', content: text };
  addMessage('user', text);
  pushSession(userMsg);

  els.textarea.value = '';
  els.preview.hidden = true;
  els.fileInput.value = '';
  autoGrow(els.textarea);

  const thinking = addMessage('assistant', '…');
  thinking.classList.add('typing');

  try {
    const reply = await callApi(text, els.mode.value);
    updateMessage(thinking, reply || "No content. Your model owes you a refund.");
    pushSession({ role:'assistant', content: reply });
  } catch (err){
    updateMessage(thinking, `Error: ${err.message || err}`);
  }
}

function addMessage(role, content){
  const tpl = document.getElementById('msg-template').content.cloneNode(true);
  const item = tpl.querySelector('.msg');
  if (role === 'user') item.classList.add('me');
  tpl.querySelector('.bubble').textContent = content;
  els.chatList.appendChild(tpl);
  els.chatList.scrollTop = els.chatList.scrollHeight;
  return els.chatList.lastElementChild;
}
function updateMessage(el, content){
  el.classList.remove('typing');
  el.querySelector('.bubble').textContent = content;
  els.chatList.scrollTop = els.chatList.scrollHeight;
}
function pushSession(msg){
  sessions[sessionId] = sessions[sessionId] || [];
  sessions[sessionId].push(msg);
  saveSessions();
}

function autoGrow(t){
  t.style.height = 'auto';
  t.style.height = Math.min(t.scrollHeight, 160) + 'px';
}

/* API hook — replace with your backend when you stop procrastinating. */
async function callApi(prompt, mode){
  const { endpoint, key, model } = loadSettings();

  // If endpoint not set, simulate a local reply. Cute, but temporary.
  if (!endpoint){
    await sleep(400);
    return fakeReply(prompt, mode);
  }

  const payload = {
    model: model || 'gpt-5',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: prompt }
    ],
    stream: false
  };

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(key ? { 'Authorization': `Bearer ${key}` } : {})
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok){
    let text = await res.text();
    throw new Error(text || res.statusText);
  }

  const data = await res.json().catch(()=> ({}));
  // Try to be flexible with shapes
  return data?.choices?.[0]?.message?.content
      || data?.message
      || data?.output
      || JSON.stringify(data);
}

/* helpers */
const sleep = ms => new Promise(r => setTimeout(r, ms));
function fakeReply(prompt, mode){
  const map = {
    text: `သင့်မေးခွန်း: "${prompt}"\nဒီဟာ local demo reply ပါ — Settings ထဲမှာ API Endpoint ထည့်ပြီး တကယ့် reply ရယူပါ။`,
    code: `// pseudo-code\nfunction answer(q){\n  return "Demo: " + q;\n}`,
    image: `Image mode: attached files will be sent with your prompt once an endpoint exists.`
  };
  return map[mode] || map.text;
}

// Export chat as JSON
function exportChat(){
  const blob = new Blob([ JSON.stringify(sessions[sessionId]||[], null, 2) ], { type:'application/json' });
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement('a'), { href:url, download:`wayne-ai-${sessionId}.json` });
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=> URL.revokeObjectURL(url), 500);
}

// Load last session into view on first run
loadSessionToView();
