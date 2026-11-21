function switchTab(tabName, btnEl) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + tabName).classList.add('active');
  if (btnEl) {
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
  }
}

function sendMessage() {
  const input = document.getElementById('msgInput');
  const text = input.value.trim();
  if (!text) return;

  const chatBox = document.getElementById('chatBox');
  const msgDiv = document.createElement('div');
  msgDiv.className = 'msg sent';
  msgDiv.innerHTML = `
    <div class="original-text">${text}</div>
    <div class="translated-text">[অনূদিত বার্তা]: ${text}</div>
    <div class="msg-footer">
      <div class="reactions">
        <span onclick="react(this)">❤️</span>
        <span onclick="react(this)">😢</span>
        <span onclick="react(this)">😂</span>
        <span onclick="react(this)">😡</span>
        <span onclick="react(this)">👍</span>
        <span onclick="react(this)">😳</span>
      </div>
      <div class="msg-actions">
        <button onclick="copyMsg(this)">Copy</button>
      </div>
    </div>
  `;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
  input.value = '';
}

function react(el) {
  el.style.transform = 'scale(1.3)';
  setTimeout(() => (el.style.transform = 'scale(1)'), 200);
}

function copyMsg(btn) {
  const text = btn.closest('.msg').querySelector('.translated-text').innerText;
  navigator.clipboard.writeText(text);
  btn.innerText = 'Copied!';
  setTimeout(() => (btn.innerText = 'Copy'), 1500);
}

function startCall() {
  switchTab('calls');
}

function acceptCall() {
  document.getElementById('callStatus').innerText = 'কল সংযুক্ত (লাইভ অনুবাদ চালু)';
}

function endCall() {
  document.getElementById('callStatus').innerText = 'কল শেষ হয়েছে';
  setTimeout(() => switchTab('messages'), 800);
}

let muted = false;
function toggleMute() {
  muted = !muted;
  document.getElementById('muteBtn').innerText = muted ? '🔇 আনমিউট' : '🎤 মিউট';
}

let speaker = false;
function toggleSpeaker() {
  speaker = !speaker;
  document.getElementById('speakerBtn').innerText = speaker ? '📢 স্পিকার অন' : '🔊 স্পিকার';
}

function setVoiceMode(mode) {
  document.getElementById('btnTranslatedVoice').classList.toggle('active', mode === 'translated');
  document.getElementById('btnOriginalVoice').classList.toggle('active', mode === 'original');
}

function updateListenLang() {
  const val = document.getElementById('listenLangSelect').value;
  document.getElementById('activeLangDisplay').innerText = 'শুনছেন: ' + val;
}

function copyInvite() {
  const link = document.getElementById('inviteLink');
  link.select();
  navigator.clipboard.writeText(link.value);
  alert('ইনভাইট লিংক কপি হয়েছে!');
}
