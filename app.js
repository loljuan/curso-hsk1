(function(){
"use strict";
const $ = (s, r=document) => r.querySelector(s);
const app = $("#app"), modal = $("#modal");
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const shuffle = a => { a = a.slice(); for (let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
const pick = (a, n) => shuffle(a).slice(0, n);
const rnd = a => a[Math.floor(Math.random()*a.length)];

/* ---------- Almacenamiento local (solo comodidad) ---------- */
const store = {
  get(k, d){ try{ const v = localStorage.getItem("hsk1:"+k); return v ? JSON.parse(v) : d; }catch(e){ return d; } },
  set(k, v){ try{ localStorage.setItem("hsk1:"+k, JSON.stringify(v)); }catch(e){} }
};

/* ---------- Datos ---------- */
const WORDS = window.HSK_WORDS.map((w,i) => ({i, h:w[0], p:w[1], es:w[2], type:w[3], l:w[4], exh:w[5], exp:w[6], exes:w[7]}));
const LESSONS = window.HSK_LESSONS;
const STROKES = window.HSK_STROKES || {};
const CHARS = {};
const CHAR_ORDER = [];
WORDS.forEach(w => [...w.h].forEach(c => { if (!CHAR_ORDER.includes(c)) CHAR_ORDER.push(c); }));
CHAR_ORDER.forEach((c, idx) => {
  const d = window.HSK_CHARS[c] || ["", "", "", "", "", ""];
  const words = WORDS.filter(w => w.h.includes(c));
  const extras = (d[5]||"").split(";").filter(Boolean).map(s => { const [h,p,es] = s.split("|"); return {h,p,es}; })
    .filter(e => !words.some(w => w.h === e.h));
  CHARS[c] = { c, idx:idx+1, p:d[0], es:d[1], rad:d[2], radEs:d[3], tip:d[4], extras, words,
    strokes: STROKES[c] ? STROKES[c].strokes.length : null, l: Math.min(...words.map(w => w.l)) };
});
// Ejemplos de frases (palabras + lecciones) para buscar usos y generar ejercicios
const SENTENCES = [];
WORDS.forEach(w => { if (/[。？！]$/.test(w.exh)) SENTENCES.push({h:w.exh, p:w.exp, es:w.exes, l:w.l}); });
LESSONS.forEach(L => L.blocks.forEach(b => {
  if (b.t === "g" || b.t === "ex") (b.items||[]).forEach(it => { if (!it[0].startsWith("❌") && /[。？！]$/.test(it[0])) SENTENCES.push({h:it[0], p:it[1], es:it[2], l:L.n}); });
  if (b.t === "dialog") b.lines.forEach(x => SENTENCES.push({h:x[1], p:x[2], es:x[3], l:L.n}));
}));
const uniqSent = []; const seenS = new Set();
SENTENCES.forEach(s => { if (!seenS.has(s.h)) { seenS.add(s.h); uniqSent.push(s); } });

/* ---------- Pinyin ---------- */
const V = "aeiouüvāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜAEIOUÜĀÁǍÀĒÉĚÈĪÍǏÌŌÓǑÒŪÚǓÙ";
const SYL = new RegExp(`(?:zh|ch|sh|Zh|Ch|Sh|[bpmfdtnlgkhjqxrzcsywBPMFDTNLGKHJQXRZCSYW])?[${V}]+(?:ng(?![${V}])|n(?![${V}])|r(?![${V}]))?`, "g");
const TONEMAP = {};
"āēīōūǖĀĒĪŌŪ".split("").forEach(c => TONEMAP[c]=1);
"áéíóúǘÁÉÍÓÚ".split("").forEach(c => TONEMAP[c]=2);
"ǎěǐǒǔǚǍĚǏǑǓ".split("").forEach(c => TONEMAP[c]=3);
"àèìòùǜÀÈÌÒÙ".split("").forEach(c => TONEMAP[c]=4);
const toneOf = s => { for (const ch of s) if (TONEMAP[ch]) return TONEMAP[ch]; return 5; };
function py(p){
  return `<span class="py">${esc(p).replace(SYL, m => `<span class="t${toneOf(m)}">${m}</span>`)}</span>`;
}
const MARKS = {a:"āáǎà", e:"ēéěè", i:"īíǐì", o:"ōóǒò", u:"ūúǔù", "ü":"ǖǘǚǜ"};
function stripTones(s){
  return s.replace(/[ǖǘǚǜ]/g,"ü").normalize("NFD").replace(/[̀-̄̌]/g,"").normalize("NFC");
}
function setTone(syl, t){
  const base = stripTones(syl);
  if (t === 5) return base;
  const low = base.toLowerCase();
  let idx = low.indexOf("a"); if (idx < 0) idx = low.indexOf("e");
  if (idx < 0) idx = low.indexOf("ou");
  if (idx < 0) { for (let i=low.length-1;i>=0;i--) if ("iouü".includes(low[i])) { idx=i; break; } }
  if (idx < 0) return base;
  const v = low[idx]; let m = MARKS[v][t-1];
  if (base[idx] !== low[idx]) m = m.toUpperCase();
  return base.slice(0, idx) + m + base.slice(idx+1);
}
function retone(p){ // misma sílaba con otros tonos
  return p.replace(SYL, m => setTone(m, 1 + Math.floor(Math.random()*4)));
}
const norm = s => stripTones(String(s).toLowerCase()).replace(/ü/g,"u").replace(/v/g,"u").replace(/[\s'’\-0-9.,!?¿¡]/g,"");
const pyAccept = p => p.split("/").map(norm).filter(Boolean);
const EXAM = window.HSK_EXAM;

/* ---------- Voz ---------- */
let zhVoice = null, voiceChecked = false;
function loadVoices(){
  if (!("speechSynthesis" in window)) return;
  const vs = speechSynthesis.getVoices();
  zhVoice = vs.find(v => /zh[-_]CN/i.test(v.lang)) || vs.find(v => /^zh/i.test(v.lang) || /cmn/i.test(v.lang)) || null;
}
if ("speechSynthesis" in window) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
function say(text, rate){
  if (!("speechSynthesis" in window)) { notice("Tu navegador no permite reproducir voz."); return; }
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.replace(/[A-Z]$/,""));
    u.lang = "zh-CN"; if (zhVoice) u.voice = zhVoice; u.rate = rate || 0.8;
    speechSynthesis.speak(u);
    if (!zhVoice && !voiceChecked) { voiceChecked = true; setTimeout(() => { loadVoices(); if (!zhVoice) notice("No encuentro una voz china en tu sistema. Si no oyes nada, instala la voz «Chino (simplificado)» en los ajustes de voz de tu sistema o abre la página en Chrome/Edge."); }, 600); }
  } catch(e) {}
}
const ICON_SAY = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/></svg>`;
const sayBtn = (t, label) => `<button class="say" data-say="${esc(t)}" aria-label="Escuchar ${esc(label||t)}" title="Escuchar">${ICON_SAY}</button>`;
let noticeTimer;
function notice(msg){
  let n = $("#gnotice");
  if (!n) { n = document.createElement("div"); n.id = "gnotice"; n.className = "notice toast"; n.setAttribute("role", "status"); document.body.appendChild(n); }
  n.textContent = msg; n.hidden = false; clearTimeout(noticeTimer); noticeTimer = setTimeout(() => n.hidden = true, 7000);
}

/* Hanzi clicables */
function hz(text){
  return [...text].map(c => CHARS[c] ? `<span class="hz" data-c="${c}">${c}</span>` : esc(c)).join("");
}

/* ---------- Progreso ---------- */
const prog = () => store.get("progress", {lessons:{}, exam:0, ex:0});
const saveProg = p => store.set("progress", p);
const boxes = () => store.get("boxes", {});

/* ---------- Router ---------- */
let scrollTimer, restoring = false;
const saveScroll = () => { if (restoring) return; const h = location.hash || "#inicio"; const s = store.get("scroll", {}); s[h] = Math.round(window.scrollY); store.set("scroll", s); };
window.addEventListener("scroll", () => { clearTimeout(scrollTimer); scrollTimer = setTimeout(saveScroll, 300); }, {passive:true});
window.addEventListener("pagehide", saveScroll);
document.addEventListener("visibilitychange", () => { if (document.hidden) saveScroll(); });
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
function route(){
  const h = (location.hash || "#inicio").slice(1);
  closeModal();
  document.querySelectorAll("#tabs a").forEach(a => a.classList.toggle("on", h.startsWith(a.dataset.r)));
  if (h !== "inicio") store.set("last", "#"+h);
  if (h.startsWith("leccion-")) store.set("lastLesson", parseInt(h.split("-")[1], 10) || 0);
  const lt = document.querySelector('#tabs a[data-r="leccion"]'); if (lt) lt.href = "#leccion-" + store.get("lastLesson", 0);
  const y = (store.get("scroll", {})["#"+h]) || 0;
  restoring = true; window.scrollTo(0, 0);
  if (h.startsWith("leccion-")) { renderLesson(parseInt(h.split("-")[1], 10) || 0);
    [50, 300, 900].forEach(t => setTimeout(() => { if (y) window.scrollTo(0, y); }, t)); setTimeout(() => restoring = false, 1000); return; }
  setTimeout(() => restoring = false, 100);
  ({caracteres:renderChars, palabras:renderWords, tarjetas:renderCards, ejercicios:renderExercises, examen:renderExam}[h] || renderHome)();
}
window.addEventListener("hashchange", route);

/* ---------- Inicio ---------- */
function renderHome(){
  const p = prog(); const done = Object.keys(p.lessons).filter(k => p.lessons[k] >= 80).length;
  const b = boxes(); const knownC = CHAR_ORDER.filter(c => (b["c:"+c]||0) >= 2).length;
  const knownW = WORDS.filter(w => (b["w:"+w.h]||0) >= 2).length;
  const lastL = store.get("lastLesson", null);
  const next = lastL != null ? (LESSONS.find(L => L.n === lastL && !(p.lessons[L.n] >= 80)) || LESSONS.find(L => L.n > lastL && !(p.lessons[L.n] >= 80)) || LESSONS.find(L => !(p.lessons[L.n] >= 80)) || LESSONS[lastL]) : (LESSONS.find(L => !(p.lessons[L.n] >= 80)) || LESSONS[0]);
  const lastH = store.get("last", null);
  const lastLabel = h => !h ? "" : h.startsWith("#leccion-") ? "lección " + h.split("-")[1] : ({"#caracteres":"Caracteres","#palabras":"Palabras","#tarjetas":"Tarjetas","#ejercicios":"Ejercicios","#examen":"Examen"}[h] || "");
  const pyDone = Object.keys(store.get("pyok", {})).length;
  app.innerHTML = `
  ${lastH && lastLabel(lastH) ? `<div class="notice row" style="justify-content:space-between;margin-bottom:22px"><span>La última vez estabas en <b>${lastLabel(lastH)}</b>.</span><a class="btn small primary" href="${lastH}">Seguir donde lo dejé →</a></div>` : ""}`+`
  <section class="hero">
    <div>
      <div class="eyebrow">Mandarín desde cero · nivel 1</div>
      <h1>Tu curso completo de HSK 1</h1>
      <p class="lead">16 lecciones con pinyin, gramática y diálogos; las 151 palabras y los 178 caracteres del examen con su ficha, orden de trazos y todas las palabras que forman; ejercicios de todo el temario y un simulacro del examen.</p>
      <div class="row" style="margin-top:20px">
        <a class="btn primary" href="#leccion-${next.n}">${done ? "Continuar" : "Empezar"}: lección ${next.n}</a>
        <a class="btn" href="#caracteres">Ver los caracteres</a>
      </div>
    </div>
    <div class="big" aria-hidden="true">${tzgStatic("学")}</div>
  </section>
  <div class="stats">
    <div class="stat"><b>${done}/${LESSONS.length}</b><span>lecciones superadas</span><div class="bar"><i style="width:${done/LESSONS.length*100}%"></i></div></div>
    <div class="stat"><b>${knownC}/${CHAR_ORDER.length}</b><span>caracteres dominados</span><div class="bar"><i style="width:${knownC/CHAR_ORDER.length*100}%"></i></div></div>
    <div class="stat"><b>${knownW}/${WORDS.length}</b><span>palabras dominadas</span><div class="bar"><i style="width:${knownW/WORDS.length*100}%"></i></div></div>
    <div class="stat"><b>${pyDone}/${CHAR_ORDER.length + WORDS.length}</b><span>pinyin escritos bien (maratón)</span><div class="bar"><i style="width:${pyDone/(CHAR_ORDER.length + WORDS.length)*100}%"></i></div></div>
    <div class="stat"><b>${p.exam || "—"}</b><span>mejor nota del simulacro (de 200)</span><div class="bar"><i style="width:${(p.exam||0)/2}%"></i></div></div>
  </div>
  <p class="muted" style="font-size:.88rem">Una lección cuenta como superada cuando sacas un 80 % en su test. Un carácter o palabra cuenta como dominado al acertarlo dos veces seguidas en las tarjetas. El progreso se guarda solo en este navegador.</p>
  <div class="section-h"><h2>Temario</h2><span class="muted">Sigue el orden: cada lección usa lo anterior.</span></div>
  <div class="syllabus">
    ${LESSONS.map(L => { const s = p.lessons[L.n]; const nw = WORDS.filter(w => w.l === L.n).length;
      return `<a class="lcard ${s>=80?"done":""}" href="#leccion-${L.n}">
        <span class="num">${L.n}</span>
        <span><h3>${esc(L.title)}</h3><span class="zh">${L.zh}</span></span>
        <span class="st">${nw ? nw+" palabras<br>" : ""}${s!=null ? "test: "+s+" %" : "sin hacer"}</span></a>`; }).join("")}
  </div>
  <div class="section-h"><h2>Cómo estudiar</h2></div>
  <div class="syllabus">
    <div class="panel stack"><h3>1 · Aprende</h3><p class="muted">Lee la lección, escucha cada ejemplo y pulsa sobre cualquier carácter para ver su ficha.</p></div>
    <div class="panel stack"><h3>2 · Comprueba</h3><p class="muted">Haz el test al final de la lección. Si no llegas al 80 %, repasa la gramática y repítelo.</p></div>
    <div class="panel stack"><h3>3 · Memoriza</h3><p class="muted">Repasa con las tarjetas 10 minutos al día. Las que fallas vuelven antes.</p></div>
    <div class="panel stack"><h3>4 · Practica</h3><p class="muted">Usa los ejercicios mezclados y, al final, haz el simulacro de examen hasta superar 120 puntos con margen.</p></div>
  </div>
  <div class="section-h"><h2>Pasar tu progreso a otro dispositivo</h2></div>
  <div class="panel stack" id="sync">
    <p class="muted">Tu progreso se guarda en cada dispositivo por separado. Para pasarlo del PC al iPhone (o al revés): copia aquí tu código, mándatelo (WhatsApp, Notas, correo…) y pégalo en el otro dispositivo. Se suma a lo que ya tengas: nunca borra aciertos.</p>
    <div class="row"><button class="btn primary" id="syncout">Copiar mi código de progreso</button><span class="muted" id="syncmsg"></span></div>
    <textarea id="synccode" rows="3" readonly hidden aria-label="Tu código de progreso"></textarea>
    <label for="syncin"><b>Pegar un código de otro dispositivo</b></label>
    <textarea id="syncin" rows="3" placeholder="Pega aquí el código que empieza por HSK1…" aria-label="Código de progreso para importar"></textarea>
    <div class="row"><button class="btn" id="syncgo">Importar progreso</button></div>
  </div>`;
  bindSync();
}

/* ---------- Exportar / importar progreso ---------- */
const SYNC_KEYS = ["progress","boxes","pyok","last","lastLesson","excfg","fccfg","charview"];
async function packProgress(){
  const data = {}; SYNC_KEYS.forEach(k => { const v = store.get(k, null); if (v != null) data[k] = v; });
  const bytes = new TextEncoder().encode(JSON.stringify(data));
  const b64 = u8 => { let s = ""; for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000)); return btoa(s); };
  if (window.CompressionStream) {
    try { const z = new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(new CompressionStream("deflate-raw"))).arrayBuffer()); return "HSK1z:" + b64(z); } catch(e) {}
  }
  return "HSK1:" + b64(bytes);
}
async function unpackProgress(code){
  code = code.replace(/\s+/g, "");
  const m = code.match(/^(HSK1z?):(.+)$/); if (!m) throw new Error("formato");
  const bin = atob(m[2]); const u8 = Uint8Array.from(bin, c => c.charCodeAt(0));
  let bytes = u8;
  if (m[1] === "HSK1z") bytes = new Uint8Array(await new Response(new Blob([u8]).stream().pipeThrough(new DecompressionStream("deflate-raw"))).arrayBuffer());
  return JSON.parse(new TextDecoder().decode(bytes));
}
function mergeProgress(inc){
  const p = prog(), ip = inc.progress || {};
  Object.entries(ip.lessons || {}).forEach(([k,v]) => { p.lessons[k] = Math.max(p.lessons[k] || 0, v); });
  p.exam = Math.max(p.exam || 0, ip.exam || 0); saveProg(p);
  const b = boxes(); Object.entries(inc.boxes || {}).forEach(([k,v]) => { b[k] = Math.max(b[k] || 0, v); }); store.set("boxes", b);
  const o = store.get("pyok", {}); Object.keys(inc.pyok || {}).forEach(k => o[k] = true); store.set("pyok", o);
  ["last","lastLesson","excfg","fccfg","charview"].forEach(k => { if (inc[k] != null) store.set(k, inc[k]); });
}
function bindSync(){
  const msg = $("#syncmsg");
  $("#syncout").onclick = async () => {
    const code = await packProgress(); const ta = $("#synccode"); ta.value = code; ta.hidden = false;
    try { await navigator.clipboard.writeText(code); msg.textContent = "Copiado. Pégalo en el otro dispositivo."; }
    catch(e) { ta.focus(); ta.select(); msg.textContent = "Selecciona el texto de abajo y cópialo."; }
  };
  $("#syncgo").onclick = async () => {
    const v = $("#syncin").value.trim(); if (!v) { notice("Pega primero el código."); return; }
    try { mergeProgress(await unpackProgress(v)); notice("Progreso importado."); renderHome(); }
    catch(e) { notice("Ese código no es válido. Cópialo entero, empieza por HSK1."); }
  };
}

function tzgStatic(c){
  return `<div class="tzg" style="margin:0 auto;width:200px;height:200px">${gridSvg()}<div class="hw" style="display:grid;place-items:center;font-size:150px;line-height:1;color:var(--ink)">${c}</div></div>`;
}
function gridSvg(){
  return `<svg class="grid" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><g stroke="var(--grid)" stroke-width=".6" stroke-dasharray="2 2" fill="none"><line x1="0" y1="50" x2="100" y2="50"/><line x1="50" y1="0" x2="50" y2="100"/><line x1="0" y1="0" x2="100" y2="100"/><line x1="100" y1="0" x2="0" y2="100"/></g></svg>`;
}

/* ---------- Lección ---------- */
function exRow(it){
  const bad = it[0].startsWith("❌");
  return `<div class="ex"><div>${bad ? "" : sayBtn(it[0])}</div><div><div class="zh">${hz(it[0])}</div><div class="pp">${bad?"":py(it[1])}</div><div class="es">${esc(it[2])}</div></div></div>`;
}
function renderBlock(b){
  switch (b.t) {
    case "p": return `<p>${b.html}</p>`;
    case "tip": return `<div class="tip">${b.html}</div>`;
    case "ex": return `<div class="gbox"><div class="exlist">${b.items.map(exRow).join("")}</div></div>`;
    case "g": return `<div class="gbox"><div class="gt"><h3>${esc(b.title)}</h3></div>${b.html?`<div class="gx">${b.html}</div>`:""}${b.items&&b.items.length?`<div class="exlist" style="border-top:1px solid var(--line)">${b.items.map(exRow).join("")}</div>`:""}</div>`;
    case "table": return `<div class="tbl"><table><thead><tr>${b.head.map(h=>`<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${b.rows.map(r=>`<tr>${r.map(c=>`<td>${fmtCell(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
    case "dialog": return `<div class="dialog" id="dlg"><div class="dh"><h3>Diálogo</h3><div class="row"><button class="btn small" data-toggle="hide-py">Pinyin</button><button class="btn small" data-toggle="hide-es">Traducción</button><button class="btn small" data-sayall="1">▶ Escuchar todo</button></div></div>
      ${b.lines.map(l=>`<div class="dl"><div class="who">${esc(l[0])}</div><div><div class="zh">${hz(l[1])}</div><div class="pp">${py(l[2])}</div><div class="es">${esc(l[3])}</div></div>${sayBtn(l[1])}</div>`).join("")}</div>`;
    case "tones": return `<div class="tones">${[["mā","妈","mamá",1,"M4 8 L60 8"],["má","麻","cáñamo",2,"M4 36 L60 6"],["mǎ","马","caballo",3,"M4 18 L28 38 L60 8"],["mà","骂","regañar",4,"M4 6 L60 38"],["ma","吗","¿…?",5,""]].map(t=>`
      <button class="tone" data-say="${t[1]}"><svg viewBox="0 0 64 44" aria-hidden="true"><g stroke="var(--line)" stroke-width="1"><line x1="0" y1="6" x2="64" y2="6"/><line x1="0" y1="22" x2="64" y2="22"/><line x1="0" y1="38" x2="64" y2="38"/></g>${t[4]?`<path d="${t[4]}" stroke="var(--t${t[3]})" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`:`<circle cx="32" cy="30" r="5" fill="var(--t5)"/>`}</svg>
      <span class="s t${t[3]}">${t[0]}</span><span class="c">${t[1]}</span><span class="muted" style="font-size:.8rem">${t[2]}</span></button>`).join("")}</div><p class="muted" style="font-size:.9rem">Pulsa cada tono para escucharlo. Las líneas indican la altura de la voz: arriba = aguda, abajo = grave.</p>`;
    case "pinyin": return `<div class="gbox"><div class="gt"><h3>Iniciales (21)</h3></div><div class="gx stack">
      ${[["Labiales","b p m f"],["Alveolares","d t n l"],["Velares","g k h"],["Palatales","j q x"],["Retroflejas","zh ch sh r"],["Dentales","z c s"]].map(g=>`<div class="row"><span class="muted" style="width:96px">${g[0]}</span><div class="pygrid">${g[1].split(" ").map(s=>`<span>${s}</span>`).join("")}</div></div>`).join("")}
      </div><div class="gt" style="border-top:1px solid var(--line)"><h3>Finales (las más usadas)</h3></div><div class="gx stack">
      ${[["Simples","a o e i u ü"],["Compuestas","ai ei ao ou ia ie ua uo üe iao iou(-iu) uai uei(-ui)"],["Nasales","an en in ün ian uan üan uen(-un) ang eng ing ong iang uang iong"],["Especial","er"]].map(g=>`<div class="row"><span class="muted" style="width:96px">${g[0]}</span><div class="pygrid">${g[1].split(" ").map(s=>`<span>${s}</span>`).join("")}</div></div>`).join("")}
      </div></div><div class="tip">Sin inicial, <b>i</b> se escribe <b>y</b> (yī, yě) y <b>u</b> se escribe <b>w</b> (wǒ, wǔ). Tras j, q, x la <b>ü</b> pierde los puntos: jù, qù, xué (pero nǚ, lǜ los conservan).</div>`;
    case "strokes": return `<div class="tbl"><table><thead><tr><th>Trazo</th><th>Nombre</th><th>Cómo se hace</th><th>Ejemplo</th></tr></thead><tbody>
      ${[["一","横 héng","horizontal, de izquierda a derecha","十"],["丨","竖 shù","vertical, de arriba abajo","中"],["丿","撇 piě","diagonal hacia abajo a la izquierda","人"],["㇏","捺 nà","diagonal hacia abajo a la derecha","八"],["丶","点 diǎn","punto corto","小"],["㇀","提 tí","subida hacia la derecha","我"],["𠃍","折 zhé","giro en ángulo","口"],["亅","钩 gōu","gancho al final","你"]].map(r=>`<tr><td class="han" style="font-size:1.6rem">${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td class="han" style="font-size:1.5rem">${hz(r[3])}</td></tr>`).join("")}</tbody></table></div>
      <p class="muted" style="font-size:.9rem">Pulsa el carácter de ejemplo para ver la animación de su orden de trazos.</p>`;
    case "radicals": return `<h3>Radicales frecuentes en el HSK 1</h3><div class="radgrid">${window.HSK_RADICALS.map(r=>`<div class="rad"><div class="r">${r[0]}</div><div class="muted" style="font-size:.88rem">${esc(r[1])}</div><div class="e">${r[2].split(" ").map(c=>hz(c)).join(" ")}</div></div>`).join("")}</div>`;
  }
  return "";
}
function fmtCell(c){
  // Cell text like "我 wǒ — yo": colorea el pinyin y hace clicables los caracteres
  return esc(c).replace(/[一-鿿]/g, ch => CHARS[ch] ? `<span class="hz han" data-c="${ch}">${ch}</span>` : `<span class="han">${ch}</span>`)
    .replace(SYL, m => /[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/i.test(m) ? `<span class="py t${toneOf(m)}">${m}</span>` : m);
}
function renderLesson(n){
  const L = LESSONS.find(x => x.n === n) || LESSONS[0];
  const vocab = WORDS.filter(w => w.l === L.n);
  const p = prog();
  app.innerHTML = `
  <div class="lesson-head">
    <div class="eyebrow">Lección ${L.n} de ${LESSONS.length-1}</div>
    <h1>${esc(L.title)}</h1>
    <div class="zh">${hz(L.zh)}</div>
    <p class="muted"><b>Objetivo:</b> ${esc(L.goal)}</p>
  </div>
  <div class="lesson">
    <div class="lesson-body">
      ${L.blocks.map(renderBlock).join("")}
      <div class="panel stack" id="lquiz"></div>
    </div>
    <aside class="aside">
      ${vocab.length ? `<div class="panel" style="padding:14px"><div class="row" style="justify-content:space-between;margin-bottom:8px"><h3>Vocabulario (${vocab.length})</h3></div>
        <div class="vocab">${vocab.map(w=>`<div class="vrow" data-w="${w.i}"><span class="h">${w.h}</span><span><div>${py(w.p)}</div><div class="m">${esc(w.es)}</div></span>${sayBtn(w.h)}</div>`).join("")}</div></div>
        <a class="btn" href="#ejercicios" data-practice="${L.n}">Practicar esta lección</a>
        <a class="btn" href="#tarjetas" data-cards="${L.n}">Tarjetas de esta lección</a>` : `<div class="panel muted" style="font-size:.92rem">Esta lección no introduce vocabulario: prepara el terreno para las siguientes.</div>`}
      ${p.lessons[L.n]!=null ? `<div class="chip acc" style="align-self:flex-start">Tu mejor test: ${p.lessons[L.n]} %</div>` : ""}
    </aside>
  </div>
  <div class="lesson-nav">
    ${L.n>0 ? `<a class="btn" href="#leccion-${L.n-1}">← Lección ${L.n-1}</a>` : "<span></span>"}
    ${L.n<LESSONS.length-1 ? `<a class="btn primary" href="#leccion-${L.n+1}">Lección ${L.n+1} →</a>` : `<a class="btn primary" href="#examen">Hacer el simulacro →</a>`}
  </div>`;
  lessonQuiz(L);
}
function lessonQuiz(L){
  const box = $("#lquiz");
  // preguntas de gramática escritas + preguntas de vocabulario generadas
  const vocab = WORDS.filter(w => w.l === L.n);
  const qs = L.quiz.map(q => ({prompt:esc(q.q), opts:q.o, a:q.a, han:q.o.some(o => /[一-鿿]/.test(o))}));
  pick(vocab, Math.min(4, vocab.length)).forEach(w => qs.push(genMeaning(w)));
  // Escribir pinyin: 3 palabras y 3 caracteres de la lección
  pick(vocab, Math.min(3, vocab.length)).forEach(w => qs.push(genType(w)));
  pick([...new Set(vocab.flatMap(w => [...w.h]))], Math.min(3, vocab.length)).forEach(c => qs.push(genType(CHARS[c])));
  let i = 0, ok = 0;
  const start = () => {
    box.innerHTML = `<div class="row" style="justify-content:space-between"><h2>Test de la lección</h2><span class="muted">${qs.length} preguntas · 80 % para superarla</span></div><div id="qz"></div>`;
    step();
  };
  const step = () => {
    const q = qs[i]; const el = $("#qz");
    if (!q) {
      const pct = Math.round(ok/qs.length*100); const p = prog();
      p.lessons[L.n] = Math.max(p.lessons[L.n]||0, pct); saveProg(p);
      el.innerHTML = `<div class="stack"><div class="score">${pct} %</div><p>${pct>=80 ? "¡Lección superada! Puedes pasar a la siguiente." : "Te falta un poco. Repasa la gramática de arriba y vuelve a intentarlo."}</p><div class="row"><button class="btn" id="qretry">Repetir el test</button>${L.n<LESSONS.length-1?`<a class="btn primary" href="#leccion-${L.n+1}">Siguiente lección →</a>`:""}</div></div>`;
      $("#qretry").onclick = () => { i=0; ok=0; qs.sort(()=>Math.random()-.5); start(); };
      return;
    }
    askOne(el, q, i+1, qs.length, good => { if (good) ok++; i++; step(); });
  };
  start();
}

/* ---------- Pregunta de opción múltiple genérica ---------- */
function renderMC(el, q, num, total, done){
  const order = shuffle(q.opts.map((o, k) => k));
  el.innerHTML = `<div class="q">
    <div class="qhead"><span class="chip">${num} / ${total}</span>${q.audio?`<button class="btn small" id="qplay">${ICON_SAY.replace('aria-hidden','style="width:16px;height:16px" aria-hidden')} Escuchar otra vez</button>`:""}</div>
    <div class="prompt">${q.prompt}</div>
    <div class="opts">${order.map(k=>`<button class="opt ${q.han?"han":""}" data-k="${k}">${q.optHtml ? q.optHtml[k] : esc(q.opts[k])}</button>`).join("")}</div>
    <div id="qfb"></div></div>`;
  if (q.audio) { $("#qplay", el).onclick = () => say(q.audio); setTimeout(() => say(q.audio), 250); }
  el.querySelectorAll(".opt").forEach(b => b.onclick = () => {
    const k = +b.dataset.k, good = k === q.a;
    el.querySelectorAll(".opt").forEach(x => { x.disabled = true; if (+x.dataset.k === q.a) x.classList.add("ok"); });
    if (!good) b.classList.add("ko");
    $("#qfb", el).innerHTML = `<div class="fb ${good?"ok":"ko"}"><b>${good?"¡Correcto!":"No es correcto."}</b> ${q.explain||""}</div><div style="margin-top:10px"><button class="btn primary" id="qnext">Siguiente →</button></div>`;
    if (q.onAnswer) q.onAnswer(good);
    const nx = $("#qnext", el); nx.focus(); nx.onclick = () => done(good);
  });
}

/* ---------- Escribir el pinyin (sin tonos) ---------- */
function genType(item){ // item: palabra o carácter
  return item.c ? {kind:"type", h:item.c, p:item.p, es:item.es, key:"c:"+item.c} : {kind:"type", h:item.h, p:item.p, es:item.es, key:"w:"+item.h};
}
function renderType(el, q, num, total, done){
  el.innerHTML = `<div class="q"><div class="qhead"><span class="chip">${num} / ${total}</span><span class="muted">Escribe el pinyin sin tonos</span></div>
    ${q.head||""}
    <div class="bigq">${q.h}</div>
    ${q.hideMeaning ? "" : `<div class="muted" style="text-align:center;margin-top:-8px">${esc(q.es)}</div>`}
    <form class="typerow" id="tform" autocomplete="off"><input id="tin" type="text" inputmode="latin" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="pinyin sin tonos" aria-label="Escribe el pinyin"><button class="btn primary" id="tgo">Comprobar</button><button type="button" class="btn" id="tskip">No lo sé</button></form>
    <p class="muted" style="text-align:center;font-size:.85rem">Sin tildes ni números. Los espacios dan igual. Para la ü puedes escribir u o v (nü → nu / nv).</p>
    <div id="qfb"></div></div>`;
  const inp = $("#tin", el); setTimeout(() => inp.focus(), 50);
  let answered = false;
  const finish = (good, typed) => {
    answered = true; inp.readOnly = true; inp.classList.add(good ? "ok" : "ko");
    $("#tgo", el).hidden = true; $("#tskip", el).hidden = true;
    say(q.h);
    $("#qfb", el).innerHTML = `<div class="fb ${good?"ok":"ko"}"><b>${good?"¡Correcto!":"La respuesta es:"}</b> ${hz(q.h)} ${py(q.p)} <span class="muted">(${esc(pyAccept(q.p)[0])})</span> = ${esc(q.es)}${!good && typed ? `<br><span class="muted">Escribiste: ${esc(typed)}</span>` : ""}</div><div style="margin-top:10px"><button class="btn primary" id="qnext">Siguiente →</button></div>`;
    const nx = $("#qnext", el); nx.focus(); nx.onclick = () => done(good, `${hz(q.h)} ${py(q.p)} = ${esc(q.es)} (pinyin)`);
    if (q.onAnswer) q.onAnswer(good);
  };
  $("#tform", el).onsubmit = e => { e.preventDefault(); if (answered) return; const v = inp.value.trim(); if (!v) { inp.focus(); return; } finish(pyAccept(q.p).includes(norm(v)), v); };
  $("#tskip", el).onclick = () => { if (!answered) finish(false, ""); };
}

/* ---------- Grupo de relacionar (A–F), como en el examen real ---------- */
function renderGroup(el, g, num, total, done){
  const L = "ABCDEF";
  el.innerHTML = `<div class="q"><div class="qhead"><span class="chip">${num}–${num+g.items.length-1} / ${total}</span>${g.head||""}</div>
    <div class="muted">${g.instr}</div>
    <div class="pics">${g.opts.map((o,k)=>`<div class="pic"><span class="lt">${L[k]}</span>${o}</div>`).join("")}</div>
    <div class="grp">${g.items.map((it,j)=>`<div class="gi" id="gi${j}"><span class="chip">${num+j}</span><div class="gq">${it.html}</div>
      <select id="gs${j}" aria-label="Respuesta de la pregunta ${num+j}"><option value="">Elige…</option>${g.opts.map((o,k)=>`<option value="${k}">${L[k]}</option>`).join("")}</select></div>`).join("")}</div>
    <div class="row"><button class="btn primary" id="gcheck">Comprobar</button></div><div id="qfb"></div></div>`;
  $("#gcheck", el).onclick = () => {
    const res = g.items.map((it,j) => +($("#gs"+j, el).value || -1) === it.a);
    g.items.forEach((it,j) => { const gi = $("#gi"+j, el); gi.classList.add(res[j]?"ok":"ko"); $("#gs"+j, el).disabled = true;
      gi.insertAdjacentHTML("beforeend", `<div class="fbx">${res[j]?"✓":"✗ Correcta: <b>"+L[it.a]+"</b>"} · ${it.explain||""}</div>`); });
    $("#gcheck", el).hidden = true;
    const n = res.filter(Boolean).length;
    $("#qfb", el).innerHTML = `<div class="fb ${n===res.length?"ok":"ko"}"><b>${n} de ${res.length} correctas.</b></div><div style="margin-top:10px"><button class="btn primary" id="qnext">Siguiente →</button></div>`;
    const nx = $("#qnext", el); nx.focus(); nx.onclick = () => done(res, g.items.map((it,j) => res[j] ? null : it.explain));
  };
}
const askOne = (el, q, num, total, done) => q.kind === "type" ? renderType(el, q, num, total, done) : renderMC(el, q, num, total, good => done(good, q.explain));

/* ---------- Generadores de ejercicios ---------- */
const sameType = (w, pool) => { const s = pool.filter(x => x !== w && x.type === w.type); return s.length >= 3 ? s : pool.filter(x => x !== w); };
const wordExplain = w => `${hz(w.h)} ${py(w.p)} = ${esc(w.es)}`;
function genMeaning(w, pool=WORDS){
  const ds = pick(sameType(w, pool).filter(x => x.es !== w.es), 3);
  return {prompt:`¿Qué significa <span class="han">${hz(w.h)}</span>?`, opts:[w.es, ...ds.map(d=>d.es)], a:0, explain:wordExplain(w), w};
}
function genRecognize(w, pool=WORDS){
  const ds = pick(sameType(w, pool).filter(x => x.h !== w.h), 3);
  return {prompt:`¿Cómo se escribe «${esc(w.es)}»?`, opts:[w.h, ...ds.map(d=>d.h)], a:0, han:true, explain:wordExplain(w), w};
}
function genPinyin(w, pool=WORDS){
  const ds = pick(pool.filter(x => x.h !== w.h && x.h.length === w.h.length && norm(x.p) !== norm(w.p)), 3);
  return {prompt:`¿Cómo se lee <span class="han">${hz(w.h)}</span>?`, opts:[w.p, ...ds.map(d=>d.p)], optHtml:[w.p, ...ds.map(d=>d.p)].map(py), a:0, explain:wordExplain(w), w};
}
function genTone(w){
  const set = new Set([w.p]); let guard = 0;
  while (set.size < 4 && guard++ < 60) set.add(retone(w.p));
  const opts = [...set];
  if (opts.length < 2) return null;
  return {prompt:`¿Con qué tonos se dice <span class="han">${hz(w.h)}</span> (${esc(w.es)})?`, opts, optHtml:opts.map(py), a:0, explain:wordExplain(w), w, audio:null, playFirst:true};
}
function genListen(w, pool=WORDS){
  const ds = pick(pool.filter(x => x.h !== w.h && x.h.length === w.h.length), 3);
  if (ds.length < 3) ds.push(...pick(pool.filter(x => x.h !== w.h && !ds.includes(x)), 3 - ds.length));
  return {prompt:`Escucha y elige la palabra que oyes.`, opts:[w.h, ...ds.map(d=>d.h)], a:0, han:true, audio:w.h, explain:wordExplain(w), w};
}
function genCharMissing(w){
  const cs = [...w.h]; if (cs.length < 2) return null;
  const k = Math.floor(Math.random()*cs.length); const c = cs[k];
  const shown = cs.map((x,j) => j===k ? "＿" : x).join("");
  const ds = pick(CHAR_ORDER.filter(x => x !== c && !w.h.includes(x)), 3);
  return {prompt:`Completa la palabra «${esc(w.es)}»: <span class="han" style="font-size:1.6rem">${shown}</span> <span class="muted">(${py(w.p)})</span>`, opts:[c, ...ds], a:0, han:true, explain:wordExplain(w), w};
}
function genCharMeaning(c){
  const C = CHARS[c]; const ds = pick(CHAR_ORDER.filter(x => x !== c), 3).map(x => CHARS[x].es);
  return {prompt:`¿Qué significa el carácter <span class="han" style="font-size:1.8rem">${hz(c)}</span>?`, opts:[C.es, ...ds], a:0, explain:`${hz(c)} ${py(C.p)} = ${esc(C.es)}`, c};
}
// Segmentación de frases en palabras (para ordenar)
const DICT = new Set(WORDS.map(w => w.h));
Object.values(CHARS).forEach(C => C.extras.forEach(e => DICT.add(e.h)));
["你们","他们","她们","这个","那个","哪个","这儿","那儿","哪儿","这些","那些","没有","不是","星期一","星期五","星期六","一点儿","名字","几点","吃饭","做饭","回家","开车","看书","喝茶","说汉语","西班牙人","中国人","北京人","了吗","的时候","什么时候","这里","那里","也","吧","要","两","给","等","忙","新","走","进","还","件","只","把","到"].forEach(x => DICT.add(x));
function segment(s){
  const out = []; let i = 0; const cs = [...s];
  while (i < cs.length) {
    let len = Math.min(5, cs.length - i), found = 1;
    for (; len > 1; len--) { if (DICT.has(cs.slice(i, i+len).join(""))) { found = len; break; } }
    out.push(cs.slice(i, i+found).join("")); i += found;
  }
  // une la puntuación al token anterior
  const res = [];
  out.forEach(t => { if (/^[，。？！、：]$/.test(t) && res.length) res[res.length-1] += t; else res.push(t); });
  return res;
}
function genOrder(s){
  const toks = segment(s.h);
  if (toks.length < 3 || toks.length > 8) return null;
  return {kind:"order", s, toks};
}
const PARTS = ["了","的","吗","呢","很","不","没","都","在","个","本","几","和","是","有","会","能","想","太","怎么","什么","谁","哪儿","多少"];
function genBlank(s){
  const toks = segment(s.h);
  const cand = toks.map((t,k) => [t.replace(/[，。？！]$/,""),k]).filter(([t]) => PARTS.includes(t));
  if (!cand.length) return null;
  const [t,k] = rnd(cand);
  const shown = toks.map((x,j) => j===k ? x.replace(t, "（　）") : x).join("");
  const ds = pick(PARTS.filter(x => x !== t && x.length === t.length), 3);
  return {prompt:`Completa la frase: <div class="han" style="font-size:1.5rem;margin-top:6px">${shown}</div><div class="muted" style="font-weight:400">${esc(s.es)}</div>`, opts:[t, ...ds], a:0, han:true, explain:`${hz(s.h)}<br>${py(s.p)}`};
}
function genTranslate(s, pool){
  const ds = pick(pool.filter(x => x.h !== s.h && x.es !== s.es), 3);
  return {prompt:`¿Qué significa?<div class="han" style="font-size:1.5rem;margin-top:6px">${hz(s.h)}</div>`, opts:[s.es, ...ds.map(d=>d.es)], a:0, explain:`${py(s.p)}`};
}

/* ---------- Página de ejercicios ---------- */
const EX_TYPES = [
  ["type","Escribe el pinyin","Ves un carácter o palabra y escribes su pinyin sin tonos."],
  ["photo","Examen: frase e imagen","Lees una frase y eliges la imagen, como en el examen."],
  ["listen4","Examen: escucha y responde","Oyes una frase y una pregunta y eliges la respuesta."],
  ["meaning","Significado","Ves la palabra en chino y eliges su significado."],
  ["recognize","Reconocer","Ves el significado y eliges los caracteres."],
  ["pinyin","Lectura (pinyin)","Eliges la pronunciación correcta."],
  ["tone","Tonos","Distingues los tonos correctos de una palabra."],
  ["listen","Escucha","Oyes una palabra y eliges cuál es."],
  ["missing","Carácter que falta","Completas una palabra con el carácter correcto."],
  ["charmean","Caracteres sueltos","El significado de cada carácter por separado."],
  ["blank","Gramática: completa","Eliges la partícula o palabra que falta en una frase."],
  ["order","Ordena la frase","Colocas las palabras en el orden correcto."],
  ["translate","Comprensión de frases","Lees una frase y eliges su traducción."],
  ["write","Escritura","Dibujas el carácter trazo a trazo."]
];
let pendingPractice = null;
function renderExercises(){
  const saved = store.get("excfg", {types:["type","photo","listen4","meaning","recognize","listen","blank","order"], from:3, to:15, n:15});
  if (pendingPractice != null) { saved.from = saved.to = pendingPractice; pendingPractice = null; }
  const lessonOpts = sel => LESSONS.filter(L => L.n >= 3).map(L => `<option value="${L.n}" ${L.n===sel?"selected":""}>${L.n}. ${esc(L.title)}</option>`).join("");
  app.innerHTML = `
  <div class="lesson-head"><div class="eyebrow">Práctica</div><h1>Ejercicios</h1><p class="muted">Elige qué quieres practicar y de qué lecciones. Las preguntas se generan cada vez, así que nunca son iguales.</p></div>
  ${marathonPanel()}
  <div class="panel stack" id="excfg" style="margin-top:18px">
    <h2>Ejercicios mezclados</h2>
    <h3>Tipos de ejercicio</h3>
    <div class="cfg">${EX_TYPES.map(t=>`<label><input type="checkbox" id="ext-${t[0]}" value="${t[0]}" ${saved.types.includes(t[0])?"checked":""}><span><b>${t[1]}</b><small>${t[2]}</small></span></label>`).join("")}</div>
    <div class="row">
      <label class="row">Desde <select id="exfrom">${lessonOpts(saved.from)}</select></label>
      <label class="row">hasta <select id="exto">${lessonOpts(saved.to)}</select></label>
      <label class="row">Preguntas <select id="exn">${[10,15,20,30,50].map(n=>`<option ${n===saved.n?"selected":""}>${n}</option>`).join("")}</select></label>
    </div>
    <div class="row"><button class="btn primary" id="exgo">Empezar</button><button class="btn" id="exall">Marcar todos</button></div>
  </div>
  <div class="panel" id="exrun" hidden></div>`;
  bindMarathon();
  $("#exall").onclick =() => document.querySelectorAll("#excfg input[type=checkbox]").forEach(c => c.checked = true);
  $("#exgo").onclick = () => {
    const types = [...document.querySelectorAll("#excfg input:checked")].map(c => c.value);
    let from = +$("#exfrom").value, to = +$("#exto").value; if (from > to) [from, to] = [to, from];
    const n = +$("#exn").value;
    if (!types.length) { notice("Elige al menos un tipo de ejercicio."); return; }
    store.set("excfg", {types, from, to, n});
    runExercises(types, from, to, n);
  };
}
function buildQuestion(type, words, sents){
  const w = rnd(words); const allW = WORDS;
  switch (type) {
    case "type": { if (Math.random() < .5) return genType(w); const cs = [...new Set(words.flatMap(x => [...x.h]))]; return genType(CHARS[rnd(cs)]); }
    case "photo": return genPhoto(rnd(EXAM.picSent), false);
    case "listen4": return genListen4(rnd(EXAM.listen4));
    case "meaning": return genMeaning(w, allW);
    case "recognize": return genRecognize(w, allW);
    case "pinyin": return genPinyin(w, allW);
    case "tone": { const q = genTone(w); if (q) q.audio = w.h; return q; }
    case "listen": return genListen(w, allW);
    case "missing": return genCharMissing(rnd(words.filter(x => x.h.length > 1)) || w);
    case "charmean": { const cs = [...new Set(words.flatMap(x => [...x.h]))]; return genCharMeaning(rnd(cs)); }
    case "blank": return sents.length ? genBlank(rnd(sents)) : null;
    case "order": return sents.length ? genOrder(rnd(sents)) : null;
    case "translate": return sents.length ? genTranslate(rnd(sents), uniqSent) : null;
    case "write": { const cs = [...new Set(words.flatMap(x => [...x.h]))].filter(c => STROKES[c]); return {kind:"write", c:rnd(cs)}; }
  }
}
function runExercises(types, from, to, n){
  const words = WORDS.filter(w => w.l >= from && w.l <= to);
  const sents = uniqSent.filter(s => s.l >= from && s.l <= to);
  const qs = []; let guard = 0; const seen = new Set();
  while (qs.length < n && guard++ < n*30) {
    const q = buildQuestion(types[(qs.length + Math.floor(guard / 8)) % types.length], words, sents);
    if (!q) continue;
    const key = (q.kind||"")+(q.prompt||"")+(q.s?q.s.h:"")+(q.c||"")+(q.audio||"")+(q.h||"");
    if (seen.has(key)) continue; seen.add(key); qs.push(q);
  }
  $("#excfg").hidden = true; const box = $("#exrun"); box.hidden = false;
  let i = 0, ok = 0; const wrong = [];
  const next = () => {
    if (i >= qs.length) {
      const pct = Math.round(ok/qs.length*100);
      box.innerHTML = `<div class="stack"><div class="eyebrow">Resultado</div><div class="score">${ok} / ${qs.length}</div><p>${pct>=90?"¡Excelente!":pct>=70?"Muy bien, sigue así.":"Repasa las lecciones y vuelve a intentarlo."}</p>
        ${wrong.length?`<h3>Para repasar</h3><div class="review">${wrong.map(x=>`<div class="fb ko">${x}</div>`).join("")}</div>`:""}
        <div class="row"><button class="btn primary" id="exagain">Otra ronda</button><button class="btn" id="excfgb">Cambiar ajustes</button></div></div>`;
      $("#exagain").onclick = () => runExercises(types, from, to, n);
      $("#excfgb").onclick = () => renderExercises();
      return;
    }
    const q = qs[i]; const done = (good, review) => { if (good) ok++; else if (review) wrong.push(review); i++; next(); };
    if (q.kind === "order") return renderOrder(box, q, i+1, qs.length, done);
    if (q.kind === "write") return renderWrite(box, q, i+1, qs.length, done);
    askOne(box, q, i+1, qs.length, done);
  };
  next();
}
function renderOrder(el, q, num, total, done){
  const target = q.toks.join("");
  let pool = shuffle(q.toks.map((t,k) => ({t,k}))); if (pool.map(x=>x.t).join("") === target && q.toks.length > 2) pool = pool.reverse();
  const chosen = [];
  const draw = () => {
    el.innerHTML = `<div class="q"><div class="qhead"><span class="chip">${num} / ${total}</span><span class="muted">Ordena la frase</span></div>
      <div class="prompt">«${esc(q.s.es)}»</div>
      <div class="tokens" id="ochosen">${chosen.map((x,j)=>`<button class="tok" data-j="${j}">${x.t}</button>`).join("") || `<span class="muted" style="align-self:center">Pulsa las palabras en orden</span>`}</div>
      <div class="tokens" style="border-style:solid;background:var(--sunk)">${pool.map((x,j)=>`<button class="tok" data-p="${j}">${x.t}</button>`).join("")}</div>
      <div class="row"><button class="btn primary" id="ocheck" ${pool.length?"disabled":""}>Comprobar</button><button class="btn" id="oreset">Borrar</button></div><div id="qfb"></div></div>`;
    el.querySelectorAll("[data-p]").forEach(b => b.onclick = () => { chosen.push(pool.splice(+b.dataset.p,1)[0]); draw(); });
    el.querySelectorAll("[data-j]").forEach(b => b.onclick = () => { pool.push(chosen.splice(+b.dataset.j,1)[0]); draw(); });
    $("#oreset", el).onclick = () => { pool.push(...chosen.splice(0)); draw(); };
    $("#ocheck", el).onclick = () => {
      const good = chosen.map(x=>x.t).join("") === target;
      say(q.s.h);
      $("#ocheck", el).disabled = true; $("#oreset", el).disabled = true; el.querySelectorAll(".tok").forEach(b => b.disabled = true);
      $("#qfb", el).innerHTML = `<div class="fb ${good?"ok":"ko"}"><b>${good?"¡Correcto!":"Orden correcto:"}</b><div class="han" style="font-size:1.3rem">${hz(q.s.h)}</div>${py(q.s.p)}</div><div style="margin-top:10px"><button class="btn primary" id="qnext">Siguiente →</button></div>`;
      $("#qnext", el).onclick = () => done(good, `${hz(q.s.h)} — ${esc(q.s.es)}`);
    };
  };
  draw();
}
function writerColors(){
  const cs = getComputedStyle(document.documentElement);
  return {ink:cs.getPropertyValue("--ink").trim()||"#1b2320", acc:cs.getPropertyValue("--accent").trim()||"#1d6b58", line:cs.getPropertyValue("--line").trim()||"#d8dfda", bad:cs.getPropertyValue("--bad").trim()||"#b3261e"};
}
function makeWriter(el, c, size, extra){
  if (!window.HanziWriter || !STROKES[c]) { el.innerHTML = `<div style="display:grid;place-items:center;height:100%;font-family:var(--f-han);font-size:${size*0.7}px">${c}</div>`; return null; }
  const k = writerColors();
  return HanziWriter.create(el, c, Object.assign({width:size, height:size, padding:12, showOutline:true, strokeColor:k.ink, radicalColor:k.acc, outlineColor:k.line, highlightColor:k.acc, drawingColor:k.ink, strokeAnimationSpeed:1.1, delayBetweenStrokes:220, charDataLoader:(ch, ok) => ok(STROKES[ch])}, extra||{}));
}
function renderWrite(el, q, num, total, done){
  const C = CHARS[q.c];
  el.innerHTML = `<div class="q"><div class="qhead"><span class="chip">${num} / ${total}</span><span class="muted">Escritura</span></div>
    <div class="prompt">Escribe el carácter ${py(C.p)} — «${esc(C.es)}» <span class="muted" style="font-weight:400">(${C.strokes} trazos)</span></div>
    <div class="writebox"><div class="tzg" style="width:240px;height:240px">${gridSvg()}<div class="hw" id="wq"></div></div></div>
    <p class="muted" style="text-align:center;font-size:.9rem">Dibuja con el ratón o el dedo. Si fallas 3 veces un trazo, verás una pista.</p>
    <div class="row" style="justify-content:center"><button class="btn" id="whint">Ver animación</button><button class="btn" id="wskip">No lo sé</button></div><div id="qfb"></div></div>`;
  const wr = makeWriter($("#wq", el), q.c, 236, {showOutline:false, showCharacter:false});
  let finished = false;
  const finish = (good, mistakes) => {
    if (finished) return; finished = true;
    $("#qfb", el).innerHTML = `<div class="fb ${good?"ok":"ko"}"><b>${good?"¡Bien escrito!":"Repásalo:"}</b> ${hz(q.c)} ${py(C.p)} = ${esc(C.es)}${mistakes!=null?` · ${mistakes} errores`:""}</div><div style="margin-top:10px"><button class="btn primary" id="qnext">Siguiente →</button></div>`;
    $("#qnext", el).onclick = () => done(good, `${hz(q.c)} ${py(C.p)} = ${esc(C.es)} (escritura)`);
  };
  if (wr) wr.quiz({showHintAfterMisses:3, onComplete: s => finish(s.totalMistakes <= 3, s.totalMistakes)});
  $("#whint", el).onclick = () => { if (wr) { wr.cancelQuiz(); wr.showOutline(); wr.animateCharacter({onComplete:()=>{ wr.hideCharacter(); wr.quiz({showHintAfterMisses:2, onComplete:s=>finish(false, s.totalMistakes)}); }}); } };
  $("#wskip", el).onclick = () => { if (wr) { wr.cancelQuiz(); wr.showCharacter(); } finish(false); };
}

/* ---------- Caracteres ---------- */
function renderChars(){
  const st = store.get("charview", {sort:"orden", q:""});
  app.innerHTML = `
  <div class="lesson-head"><div class="eyebrow">Los ${CHAR_ORDER.length} caracteres del HSK 1</div><h1>Caracteres</h1>
  <p class="muted">Pulsa un carácter para ver su ficha: pronunciación, significado, radical, orden de trazos animado, práctica de escritura y todas las palabras que forma.</p></div>
  <div class="toolbar">
    <input type="search" id="csearch" placeholder="Busca por carácter, pinyin (sin tonos) o significado" value="${esc(st.q)}" aria-label="Buscar carácter">
    <select id="csort" aria-label="Ordenar"><option value="orden">Orden del curso</option><option value="pinyin">Alfabético (pinyin)</option><option value="trazos">Número de trazos</option><option value="usos">Más palabras formadas</option></select>
    <span class="muted" id="ccount"></span>
  </div>
  <div class="cgrid" id="cgrid"></div>`;
  $("#csort").value = st.sort;
  const draw = () => {
    const q = $("#csearch").value.trim(), s = $("#csort").value; store.set("charview", {sort:s, q});
    const b = boxes();
    let list = CHAR_ORDER.map(c => CHARS[c]);
    if (q) { const nq = norm(q); list = list.filter(C => C.c === q || q.includes(C.c) || norm(C.p).includes(nq) || norm(C.es).includes(nq)); }
    if (s === "pinyin") list.sort((a,b) => norm(a.p).localeCompare(norm(b.p)) || toneOf(a.p) - toneOf(b.p));
    if (s === "trazos") list.sort((a,b) => (a.strokes||0) - (b.strokes||0));
    if (s === "usos") list.sort((a,b) => (b.words.length+b.extras.length) - (a.words.length+a.extras.length));
    $("#ccount").textContent = `${list.length} caracteres`;
    $("#cgrid").innerHTML = list.map(C => `<div class="ccard ${(b["c:"+C.c]||0)>=2?"known":""}" data-c="${C.c}" role="button" tabindex="0" aria-label="${C.c} ${esc(C.p)}"><span class="n">${s==="trazos"?C.strokes+" tr.":C.idx}</span><span class="g">${C.c}</span><span class="p">${py(C.p)}</span><span class="m">${esc(C.es)}</span></div>`).join("") || `<p class="muted">No hay resultados para «${esc(q)}».</p>`;
  };
  $("#csearch").oninput = draw; $("#csort").onchange = draw; draw();
}

function openChar(c){
  const C = CHARS[c]; if (!C) return;
  const sentences = uniqSent.filter(s => s.h.includes(c)).slice(0, 8);
  const mark = h => [...h].map(x => x === c ? `<b>${x}</b>` : (CHARS[x] ? `<span class="hz" data-c="${x}">${x}</span>` : x)).join("");
  const radC = CHARS[C.rad] && C.rad !== c;
  showModal(`
    <div class="mhead">
      <div class="stack" style="align-items:center;gap:10px">
        <div class="tzg">${gridSvg()}<div class="hw" id="hw"></div></div>
        <div class="row" style="justify-content:center"><button class="btn small" id="hwanim">▶ Animar</button><button class="btn small" id="hwquiz">✍ Practicar</button>${sayBtn(c)}</div>
      </div>
      <div class="info">
        <div class="eyebrow">Carácter ${C.idx} de ${CHAR_ORDER.length} · lección ${C.l}</div>
        <div class="bigpy">${py(C.p)}</div>
        <div class="mean">${esc(C.es)}</div>
        <dl class="facts">
          <dt>Trazos</dt><dt>Radical</dt><dt>Palabras</dt>
          <dd>${C.strokes||"—"}</dd><dd><span class="han ${radC?"hz":""}" ${radC?`data-c="${C.rad}"`:""} style="font-size:1.15rem">${C.rad}</span> ${esc(C.radEs)}</dd><dd>${C.words.length} HSK 1 · ${C.extras.length} más</dd>
        </dl>
        ${C.tip?`<div class="tip" style="font-size:.93rem">${esc(C.tip)}</div>`:""}
        <p class="muted" style="font-size:.82rem" id="hwmsg">En la animación, el radical se marca en color.</p>
      </div>
    </div>
    <div class="mbody">
      <div class="stack" style="gap:8px"><h3>Palabras del HSK 1 con ${c}</h3>
        <div class="uses">${C.words.map(w=>`<div class="use" data-w="${w.i}" style="cursor:pointer"><span class="h">${mark(w.h)}</span><span class="d">${py(w.p)} · ${esc(w.es)} <span class="chip">L${w.l}</span></span>${sayBtn(w.h)}</div>`).join("")}</div></div>
      ${C.extras.length?`<div class="stack" style="gap:8px"><h3>Otras palabras útiles con ${c}</h3><p class="muted" style="font-size:.88rem">No entran en el HSK 1, pero te ayudan a ver cómo se combina este carácter (muchas son del HSK 2 y 3).</p>
        <div class="uses">${C.extras.map(e=>`<div class="use"><span class="h">${mark(e.h)}</span><span class="d">${py(e.p)} · ${esc(e.es)}</span>${sayBtn(e.h)}</div>`).join("")}</div></div>`:""}
      ${sentences.length?`<div class="stack" style="gap:8px"><h3>Frases del curso con ${c}</h3><div class="gbox"><div class="exlist">${sentences.map(s=>`<div class="ex"><div>${sayBtn(s.h)}</div><div><div class="zh">${mark(s.h)}</div><div class="pp">${py(s.p)}</div><div class="es">${esc(s.es)}</div></div></div>`).join("")}</div></div></div>`:""}
      <div class="row" style="justify-content:space-between">
        ${C.idx>1?`<button class="btn small" data-c="${CHAR_ORDER[C.idx-2]}">← ${CHAR_ORDER[C.idx-2]}</button>`:"<span></span>"}
        ${C.idx<CHAR_ORDER.length?`<button class="btn small" data-c="${CHAR_ORDER[C.idx]}">${CHAR_ORDER[C.idx]} →</button>`:""}
      </div>
    </div>`);
  const wr = makeWriter($("#hw"), c, 216);
  if (wr) { setTimeout(() => wr.animateCharacter(), 300);
    $("#hwanim").onclick = () => { wr.cancelQuiz(); wr.showOutline(); wr.animateCharacter(); $("#hwmsg").textContent = "En la animación, el radical se marca en color."; };
    $("#hwquiz").onclick = () => { wr.showOutline(); wr.quiz({showHintAfterMisses:2, onComplete:s => { $("#hwmsg").textContent = s.totalMistakes ? `¡Terminado con ${s.totalMistakes} errores! Inténtalo otra vez.` : "¡Perfecto, sin errores!"; }}); $("#hwmsg").textContent = "Dibuja los trazos en orden sobre la cuadrícula."; };
  } else { $("#hwanim").disabled = true; $("#hwquiz").disabled = true; }
}
function openWord(i){
  const w = WORDS[i];
  const others = WORDS.filter(x => x !== w && [...w.h].some(c => x.h.includes(c))).slice(0, 10);
  showModal(`
    <div class="mhead" style="grid-template-columns:1fr">
      <div class="info">
        <div class="eyebrow">Palabra HSK 1 · ${esc(w.type)} · lección ${w.l}</div>
        <div class="row"><span class="han" style="font-size:3.6rem;line-height:1.1">${w.h}</span>${sayBtn(w.h)}</div>
        <div class="bigpy">${py(w.p)}</div><div class="mean">${esc(w.es)}</div>
      </div>
    </div>
    <div class="mbody">
      <div class="stack" style="gap:8px"><h3>Ejemplo</h3><div class="gbox"><div class="exlist">${exRow([w.exh, w.exp, w.exes])}</div></div></div>
      <div class="stack" style="gap:8px"><h3>Carácter a carácter</h3><div class="breakdown">${[...w.h].map(c => CHARS[c] ? `<div class="bk" data-c="${c}" role="button" tabindex="0"><div class="g">${c}</div>${py(CHARS[c].p)}<div class="muted" style="font-size:.82rem">${esc(CHARS[c].es)}</div></div>` : "").join("")}</div></div>
      ${others.length?`<div class="stack" style="gap:8px"><h3>Palabras relacionadas</h3><div class="uses">${others.map(x=>`<div class="use" data-w="${x.i}" style="cursor:pointer"><span class="h">${x.h}</span><span class="d">${py(x.p)} · ${esc(x.es)}</span>${sayBtn(x.h)}</div>`).join("")}</div></div>`:""}
      <div><a class="btn small" href="#leccion-${w.l}">Ir a la lección ${w.l}</a></div>
    </div>`);
}
function showModal(html){
  modal.innerHTML = `<div class="mbox" role="dialog" aria-modal="true"><button class="mclose" aria-label="Cerrar">×</button>${html}</div>`;
  modal.hidden = false; modal.scrollTop = 0; document.body.style.overflow = "hidden";
  $(".mclose", modal).onclick = closeModal; $(".mclose", modal).focus();
}
function closeModal(){ if (!modal.hidden) { modal.hidden = true; modal.innerHTML = ""; document.body.style.overflow = ""; } }
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

/* ---------- Palabras ---------- */
function renderWords(){
  const types = [...new Set(WORDS.map(w => w.type))].sort();
  app.innerHTML = `
  <div class="lesson-head"><div class="eyebrow">Vocabulario oficial</div><h1>Las ${WORDS.length} palabras del HSK 1</h1>
  <p class="muted">Cada palabra lleva su pinyin, su significado y un ejemplo. Pulsa una para verla carácter a carácter.</p></div>
  <div class="toolbar">
    <input type="search" id="wsearch" placeholder="Busca en chino, pinyin o español" aria-label="Buscar palabra">
    <select id="wlesson" aria-label="Lección"><option value="">Todas las lecciones</option>${LESSONS.filter(L=>WORDS.some(w=>w.l===L.n)).map(L=>`<option value="${L.n}">${L.n}. ${esc(L.title)}</option>`).join("")}</select>
    <select id="wtype" aria-label="Tipo"><option value="">Todos los tipos</option>${types.map(t=>`<option>${esc(t)}</option>`).join("")}</select>
    <span class="muted" id="wcount"></span>
  </div>
  <div class="wlist" id="wlist"></div>`;
  const draw = () => {
    const q = $("#wsearch").value.trim(), l = $("#wlesson").value, t = $("#wtype").value; const nq = norm(q);
    const list = WORDS.filter(w => (!l || w.l == l) && (!t || w.type === t) && (!q || w.h.includes(q) || norm(w.p).includes(nq) || norm(w.es).includes(nq)));
    $("#wcount").textContent = `${list.length} palabras`;
    $("#wlist").innerHTML = list.map(w => `<div class="wcard" data-w="${w.i}" role="button" tabindex="0"><span class="h">${w.h}</span><span style="min-width:0"><div>${py(w.p)}</div><div class="m">${esc(w.es)}</div></span>${sayBtn(w.h)}</div>`).join("") || `<p class="muted">Sin resultados.</p>`;
  };
  ["wsearch","wlesson","wtype"].forEach(id => $("#"+id).addEventListener(id==="wsearch"?"input":"change", draw)); draw();
}

/* ---------- Tarjetas ---------- */
let pendingCards = null;
function renderCards(){
  const cfg = store.get("fccfg", {kind:"w", lesson:"", dir:"zh"});
  if (pendingCards != null) { cfg.lesson = String(pendingCards); pendingCards = null; }
  app.innerHTML = `
  <div class="lesson-head"><div class="eyebrow">Repaso espaciado</div><h1>Tarjetas</h1>
  <p class="muted">Mira la tarjeta, intenta recordar y dale la vuelta. Si la sabes, sube de caja y tardará más en volver; si no, vuelve a la caja 0.</p></div>
  <div class="toolbar">
    <select id="fckind" aria-label="Tipo"><option value="w">Palabras</option><option value="c">Caracteres</option></select>
    <select id="fclesson" aria-label="Lección"><option value="">Todas las lecciones</option>${LESSONS.filter(L=>WORDS.some(w=>w.l===L.n)).map(L=>`<option value="${L.n}">${L.n}. ${esc(L.title)}</option>`).join("")}</select>
    <select id="fcdir" aria-label="Dirección"><option value="zh">Chino → español</option><option value="es">Español → chino</option><option value="au">Solo audio → chino</option></select>
    <button class="btn small" id="fcreset">Reiniciar progreso</button>
  </div>
  <div class="fc-wrap" id="fc"></div>`;
  $("#fckind").value = cfg.kind; $("#fclesson").value = cfg.lesson; $("#fcdir").value = cfg.dir;
  let current = null, flipped = false, resetArm = false;
  const deck = () => {
    const l = $("#fclesson").value;
    return $("#fckind").value === "w"
      ? WORDS.filter(w => !l || w.l == l).map(w => ({key:"w:"+w.h, h:w.h, p:w.p, es:w.es, ex:w}))
      : CHAR_ORDER.filter(c => !l || CHARS[c].words.some(w => w.l == l)).map(c => ({key:"c:"+c, h:c, p:CHARS[c].p, es:CHARS[c].es, c}));
  };
  const nextCard = () => {
    const b = boxes(); const d = deck();
    const minBox = Math.min(...d.map(x => b[x.key]||0));
    // Prioriza las cajas bajas: elige entre las de caja mínima (y a veces una de la siguiente)
    let cand = d.filter(x => (b[x.key]||0) <= minBox + (Math.random() < .25 ? 1 : 0));
    if (current && cand.length > 1) cand = cand.filter(x => x.key !== current.key);
    current = rnd(cand); flipped = false; draw();
  };
  const draw = () => {
    const b = boxes(); const d = deck(); const dir = $("#fcdir").value;
    const counts = [0,0,0,0,0]; d.forEach(x => counts[Math.min(4, b[x.key]||0)]++);
    const c = current;
    const front = dir === "zh" ? `<div class="front">${c.h}</div>` : dir === "es" ? `<div class="front es">${esc(c.es)}</div>` : `<div class="front es">🔊</div><div class="muted">Escucha y piensa cómo se escribe</div>`;
    $("#fc").innerHTML = `
      <div class="boxes">${counts.map((n,k)=>`<span>Caja ${k}${k===4?"+":""}: ${n}</span>`).join("")}</div>
      <div class="fc" id="fccard" role="button" tabindex="0" aria-label="Dar la vuelta">${front}
        ${flipped ? `<div class="back">${dir!=="zh"?`<div class="han" style="font-size:3.6rem;line-height:1.1">${c.h}</div>`:""}<div style="font-size:1.4rem">${py(c.p)}</div>${dir==="zh"||dir==="au"?`<div style="font-size:1.1rem">${esc(c.es)}</div>`:""}</div>` : `<div class="muted" style="font-size:.9rem">Pulsa para ver la respuesta</div>`}
      </div>
      <div class="row" style="justify-content:center">
        ${flipped ? `<button class="btn" data-g="0">No lo sabía</button><button class="btn" data-g="1">Me costó</button><button class="btn primary" data-g="2">Lo sabía</button>` : `<button class="btn primary" id="fcflip">Ver respuesta</button>`}
        ${sayBtn(c.h)}
        <button class="btn small" id="fcinfo">Ficha</button>
      </div>`;
    const flip = () => { flipped = true; say(c.h); draw(); };
    $("#fccard").onclick = () => { if (!flipped) flip(); };
    $("#fccard").onkeydown = e => { if ((e.key === "Enter" || e.key === " ") && !flipped) { e.preventDefault(); flip(); } };
    if ($("#fcflip")) $("#fcflip").onclick = flip;
    $("#fcinfo").onclick = () => c.c ? openChar(c.c) : openWord(c.ex.i);
    document.querySelectorAll("[data-g]").forEach(btn => btn.onclick = () => {
      const g = +btn.dataset.g; const bb = boxes(); const cur = bb[c.key]||0;
      bb[c.key] = g === 0 ? 0 : g === 1 ? cur : cur + 1; store.set("boxes", bb); nextCard();
    });
    if (dir === "au" && !flipped) setTimeout(() => say(c.h), 200);
  };
  const save = () => { store.set("fccfg", {kind:$("#fckind").value, lesson:$("#fclesson").value, dir:$("#fcdir").value}); current = null; nextCard(); };
  ["fckind","fclesson","fcdir"].forEach(id => $("#"+id).onchange = save);
  $("#fcreset").onclick = () => {
    if (!resetArm) { resetArm = true; $("#fcreset").textContent = "Pulsa otra vez para borrar"; setTimeout(() => { resetArm = false; const r = $("#fcreset"); if (r) r.textContent = "Reiniciar progreso"; }, 3000); return; }
    store.set("boxes", {}); resetArm = false; $("#fcreset").textContent = "Reiniciar progreso"; notice("Progreso de las tarjetas borrado."); nextCard();
  };
  nextCard();
}

/* ---------- Maratón de pinyin: todos los caracteres y palabras ---------- */
function marathonItems(kind){
  const cs = CHAR_ORDER.map(c => ({key:"c:"+c, item:CHARS[c]}));
  const ws = WORDS.map(w => ({key:"w:"+w.h, item:w}));
  return kind === "c" ? cs : kind === "w" ? ws : cs.concat(ws);
}
function marathonPanel(){
  const ok = store.get("pyok", {}); const all = marathonItems("a");
  const n = all.filter(x => ok[x.key]).length;
  return `<div class="panel stack" id="mara">
    <div class="row" style="justify-content:space-between"><h2>Maratón de pinyin</h2><span class="chip acc">${n} / ${all.length} dominados</span></div>
    <p class="muted">Escribe el pinyin (sin tonos) de los ${CHAR_ORDER.length} caracteres y las ${WORDS.length} palabras, uno por uno. Los que aciertas quedan marcados; los que fallas vuelven a salir al final. Puedes parar cuando quieras: tu avance se guarda.</p>
    <div class="mara" aria-hidden="true">${all.map(x => `<i class="${ok[x.key]?"on":""}"></i>`).join("")}</div>
    <div class="row">
      <select id="marakind" aria-label="Qué practicar"><option value="a">Caracteres y palabras</option><option value="c">Solo caracteres</option><option value="w">Solo palabras</option></select>
      <select id="maraord" aria-label="Orden"><option value="r">Orden aleatorio</option><option value="o">Orden del curso</option></select>
      <label class="row"><input type="checkbox" id="marahide" style="accent-color:var(--accent)"> Ocultar el significado</label>
      <button class="btn primary" id="marago">${n ? "Continuar" : "Empezar"}</button>
      <button class="btn small" id="marareset">Reiniciar</button>
    </div>
  </div>`;
}
function bindMarathon(){
  let arm = false;
  $("#marago").onclick = () => runMarathon($("#marakind").value, $("#maraord").value === "r", $("#marahide").checked);
  $("#marareset").onclick = () => {
    if (!arm) { arm = true; $("#marareset").textContent = "Pulsa otra vez para borrar"; setTimeout(() => { arm = false; const r = $("#marareset"); if (r) r.textContent = "Reiniciar"; }, 3000); return; }
    store.set("pyok", {}); renderExercises();
  };
}
function runMarathon(kind, random, hideMeaning){
  const ok = store.get("pyok", {});
  let queue = marathonItems(kind).filter(x => !ok[x.key]);
  if (!queue.length) { notice("¡Ya los tienes todos! Pulsa Reiniciar para volver a empezar."); return; }
  if (random) queue = shuffle(queue);
  $("#mara").hidden = true; $("#excfg").hidden = true; const box = $("#exrun"); box.hidden = false;
  const total = marathonItems(kind).length; let streak = 0, done = 0, fails = 0;
  const next = () => {
    const okNow = store.get("pyok", {});
    const have = marathonItems(kind).filter(x => okNow[x.key]).length;
    if (!queue.length) { box.innerHTML = `<div class="stack"><div class="score">${have} / ${total}</div><p>¡Maratón completado!</p><div class="row"><button class="btn primary" id="maraback">Volver</button></div></div>`; $("#maraback").onclick = renderExercises; return; }
    const cur = queue.shift();
    const q = genType(cur.item); q.hideMeaning = hideMeaning;
    q.head = `<div class="row" style="justify-content:space-between"><span class="muted">Dominados: <b>${have}</b> / ${total} · Racha: ${streak} · Fallos: ${fails}</span><button class="btn small" id="marastop">Parar y guardar</button></div>`;
    renderType(box, q, have + 1, total, good => {
      done++;
      if (good) { const o = store.get("pyok", {}); o[cur.key] = true; store.set("pyok", o); streak++; }
      else { streak = 0; fails++; queue.splice(Math.min(queue.length, 5 + Math.floor(Math.random()*5)), 0, cur); }
      next();
    });
    $("#marastop", box).onclick = () => renderExercises();
  };
  next();
}

/* ---------- Simulacro de examen (formato oficial HSK 1) ---------- */
const PICS = EXAM.pics;
const PIC_WORDS = Object.keys(PICS).map(h => WORDS.find(w => w.h === h)).filter(Boolean);
const emo = e => `<span class="emo">${e}</span>`;
const optPy = (o, showPy) => { const [h, p] = o.split("|"); return `<span class="han" style="font-size:1.3rem">${h}</span>${showPy && p ? `<br><span style="font-size:.9rem">${py(p)}</span>` : ""}`; };
function genPhoto(s, listening){
  const ds = pick([...new Set(EXAM.picSent.map(x => x[3]))].filter(e => e !== s[3]), 2);
  const opts = [s[3], ...ds];
  return {prompt: listening ? "Escucha la frase y elige la imagen correcta." : `<span class="han" style="font-size:1.4rem">${hz(s[0])}</span>`, opts, optHtml:opts.map(emo), a:0, audio: listening ? s[0] : null, explain:`${hz(s[0])} ${py(s[1])} — ${esc(s[2])} ${s[3]}`};
}
function genListen4(x, showPy=true){
  return {prompt:`Escucha la frase y la pregunta.<div class="muted" style="font-weight:400;margin-top:4px">★ ${hz(x[2])}${showPy?` <span>${py(x[3])}</span>`:""}</div>`, opts:x[4].map(o => o.split("|")[0]), optHtml:x[4].map(o => optPy(o, true)), a:x[5], han:true, audio:`${x[0]}问：${x[2]}`, explain:`${hz(x[0])} ${py(x[1])}<br>问：${hz(x[2])} → <b>${x[4][x[5]].split("|")[0]}</b>`};
}
const PARTS_INFO = {
  L1:["听力","第一部分","Escucharás una palabra dos veces. ¿Coincide con la imagen? Marca ✓ o ✗."],
  L2:["听力","第二部分","Escucharás una frase. Elige la imagen que le corresponde (A, B o C)."],
  L3:["听力","第三部分","Escucharás cinco diálogos. Relaciona cada uno con una imagen (A–F)."],
  L4:["听力","第四部分","Escucharás una frase y una pregunta (★). Elige la respuesta correcta."],
  R1:["阅读","第一部分","¿La palabra coincide con la imagen? Marca ✓ o ✗."],
  R2:["阅读","第二部分","Relaciona cada frase con una imagen (A–F)."],
  R3:["阅读","第三部分","Relaciona cada pregunta con su respuesta (A–F)."],
  R4:["阅读","第四部分","Elige la palabra que falta en cada frase (A–F)."],
  PY:["拼音","Extra","Escribe el pinyin sin tonos. No forma parte del examen oficial y se puntúa aparte."]
};
const partHead = k => `<span class="partbar"><span class="zhp">${PARTS_INFO[k][0]} · ${PARTS_INFO[k][1]}</span></span>`;
function buildPart(k, showPy){
  const L = "ABCDEF";
  const tf = w => { const yes = Math.random() < .5; const pic = yes ? PICS[w.h] : PICS[rnd(PIC_WORDS.filter(x => PICS[x.h] !== PICS[w.h])).h];
    return {single:true, q:{prompt:`${k==="R1" ? `<span class="han" style="font-size:1.8rem">${w.h}</span>${showPy?` <span>${py(w.p)}</span>`:""}` : "Escucha:"}<div style="margin-top:6px">${emo(pic)}</div>`, opts:["✓","✗"], a:yes?0:1, audio:k==="L1"?w.h:null, explain:`${hz(w.h)} ${py(w.p)} = ${esc(w.es)} ${PICS[w.h]}`}}; };
  const distinctPics = (arr, getE, n) => { const out = [], seen = new Set(); shuffle(arr).forEach(x => { if (out.length < n && !seen.has(getE(x))) { seen.add(getE(x)); out.push(x); } }); return out; };
  const pictureGroup = (items, getE, extraPool) => {
    const extra = rnd(extraPool.filter(e => !items.some(x => getE(x) === e)));
    const pics = shuffle(items.map(getE).concat([extra]));
    return pics;
  };
  switch (k) {
    case "L1": case "R1": return pick(PIC_WORDS, 5).map(tf);
    case "L2": return pick(EXAM.picSent, 5).map(s => ({single:true, q:genPhoto(s, true)}));
    case "L3": {
      const ds = distinctPics(EXAM.dialogs, d => d[3], 5);
      const pics = pictureGroup(ds, d => d[3], Object.values(PICS));
      return [{group:true, g:{instr:PARTS_INFO.L3[2], opts:pics.map(emo), items:ds.map((d,j) => ({html:`<div class="row">${sayBtn(d[0][1]+d[1][1], "diálogo")}<span class="muted">Diálogo ${j+1}</span></div>`, a:pics.indexOf(d[3]), explain:`${esc(d[0][0])}：${hz(d[0][1])} ${esc(d[1][0])}：${hz(d[1][1])}<br>${py(d[2])}`}))}}];
    }
    case "L4": return pick(EXAM.listen4, 5).map(x => ({single:true, q:genListen4(x, showPy)}));
    case "R2": {
      const ss = distinctPics(EXAM.picSent, s => s[3], 5);
      const pics = pictureGroup(ss, s => s[3], EXAM.picSent.map(s => s[3]));
      return [{group:true, g:{instr:PARTS_INFO.R2[2], opts:pics.map(emo), items:ss.map(s => ({html:`<span class="han">${hz(s[0])}</span>${showPy?`<br>${py(s[1])}`:""}`, a:pics.indexOf(s[3]), explain:`${esc(s[2])}`}))}}];
    }
    case "R3": {
      const qa = pick(EXAM.qa, 6); const used = qa.slice(0,5);
      const ans = shuffle(qa.map(x => x[2]));
      return [{group:true, g:{instr:PARTS_INFO.R3[2], opts:ans.map(a => { const x = qa.find(y => y[2] === a); return `<span class="han">${hz(a)}</span>${showPy?`<span style="font-size:.85rem">${py(x[3])}</span>`:""}`; }),
        items:used.map(x => ({html:`<span class="han">${hz(x[0])}</span>${showPy?`<br>${py(x[1])}`:""}`, a:ans.indexOf(x[2]), explain:`${hz(x[0])} → ${hz(x[2])}`}))}}];
    }
    case "R4": {
      const set = rnd(EXAM.bank); const sents = pick(set[1], 5);
      return [{group:true, g:{instr:PARTS_INFO.R4[2], opts:set[0].map(o => optPy(o, showPy)), items:sents.map(s => ({html:`<span class="han">${hz(s[0])}</span>`, a:s[2], explain:`${py(s[1])}`}))}}];
    }
    case "PY": {
      const items = shuffle(CHAR_ORDER.map(c => CHARS[c]).concat(WORDS)).slice(0, 10);
      return items.map(it => ({single:true, q:genType(it)}));
    }
  }
}
function renderExam(){
  const p = prog();
  app.innerHTML = `
  <div class="lesson-head"><div class="eyebrow">Simulacro · formato oficial</div><h1>Examen HSK 1</h1>
  <p class="muted">Igual que el examen real: 40 preguntas en 8 partes (20 de 听力 comprensión oral y 20 de 阅读 lectura), 5 puntos cada una, 200 en total. Se aprueba con 120. Las fotos del examen se representan con imágenes emoji. Al final hay una sección extra de pinyin.</p></div>
  <div class="panel stack" id="examstart">
    <div class="tbl"><table><thead><tr><th>Parte</th><th>Preguntas</th><th>Qué hay que hacer</th></tr></thead><tbody>
      ${Object.keys(PARTS_INFO).map(k => `<tr><td class="han">${PARTS_INFO[k][0]} ${PARTS_INFO[k][1]}</td><td>${k==="PY"?10:5}</td><td>${PARTS_INFO[k][2]}</td></tr>`).join("")}</tbody></table></div>
    <div class="row">
      <label class="row"><input type="checkbox" id="exampy" checked style="accent-color:var(--accent)"> Pinyin en la lectura (el examen real lo incluye)</label>
      <label class="row"><input type="checkbox" id="exampyx" checked style="accent-color:var(--accent)"> Incluir la sección extra de pinyin</label>
    </div>
    <div class="row">
      <button class="btn primary" id="examgo">Examen completo</button>
      <select id="exampart" aria-label="Practicar una parte">${Object.keys(PARTS_INFO).map(k => `<option value="${k}">${PARTS_INFO[k][0]} ${PARTS_INFO[k][1]}</option>`).join("")}</select>
      <button class="btn" id="exampartgo">Practicar solo esa parte</button>
      ${p.exam?`<span class="chip acc">Mejor nota: ${p.exam} / 200</span>`:""}
    </div>
  </div>
  <div class="panel" id="examrun" hidden></div>`;
  $("#examgo").onclick = () => runExam(["L1","L2","L3","L4","R1","R2","R3","R4"].concat($("#exampyx").checked ? ["PY"] : []), $("#exampy").checked, true);
  $("#exampartgo").onclick = () => runExam([$("#exampart").value], $("#exampy").checked, false);
}
function runExam(parts, showPy, full){
  const units = [];
  parts.forEach(k => buildPart(k, showPy).forEach(u => { u.part = k; units.push(u); }));
  const total = units.reduce((s,u) => s + (u.group ? u.g.items.length : 1), 0);
  $("#examstart").hidden = true; const box = $("#examrun"); box.hidden = false;
  const results = []; let i = 0, num = 1;
  const next = () => {
    if (i >= units.length) return showResults();
    const u = units[i]; const head = partHead(u.part);
    if (u.group) {
      renderGroup(box, Object.assign({head}, u.g), num, total, (res, revs) => { res.forEach((r,j) => results.push({part:u.part, good:r, review:revs[j]})); num += res.length; i++; next(); });
    } else {
      const q = Object.assign({}, u.q);
      if (q.kind !== "type") q.prompt = `<div class="muted" style="font-weight:400;font-size:.9rem;margin-bottom:6px">${PARTS_INFO[u.part][2]}</div>${q.prompt}`;
      q.head = q.kind === "type" ? head : undefined;
      if (q.kind !== "type") q.prompt = head + "<div style='margin-top:6px'>" + q.prompt + "</div>";
      askOne(box, q, num, total, (good, rev) => { results.push({part:u.part, good, review:good ? null : (rev || q.explain)}); num++; i++; next(); });
    }
  };
  const showResults = () => {
    const main = results.filter(r => r.part !== "PY"), pyR = results.filter(r => r.part === "PY");
    const okMain = main.filter(r => r.good).length;
    const score = okMain * 5;
    const lis = main.filter(r => r.part[0] === "L"), rea = main.filter(r => r.part[0] === "R");
    const pts = a => a.filter(r => r.good).length * 5;
    if (full) { const p = prog(); p.exam = Math.max(p.exam||0, score); saveProg(p); }
    const byPart = Object.keys(PARTS_INFO).filter(k => results.some(r => r.part === k)).map(k => { const a = results.filter(r => r.part === k); return `<tr><td class="han">${PARTS_INFO[k][0]} ${PARTS_INFO[k][1]}</td><td>${a.filter(r=>r.good).length} / ${a.length}</td></tr>`; }).join("");
    box.innerHTML = `<div class="stack"><div class="eyebrow">Resultado</div>
      ${full ? `<div class="score">${score} / 200</div>
      <p><b>${score>=120?"Aprobado":"Todavía no apruebas"}</b> · 听力 ${pts(lis)}/100 · 阅读 ${pts(rea)}/100${pyR.length?` · Pinyin ${pyR.filter(r=>r.good).length}/${pyR.length}`:""}</p>
      <div class="bar" style="height:10px"><i style="width:${score/2}%"></i></div>
      <p class="muted">${score>=160?"Estás preparado para el examen real.":score>=120?"Apruebas: repasa los fallos para tener más margen.":"Repasa las lecciones de las preguntas falladas y vuelve a intentarlo."}</p>`
      : `<div class="score">${results.filter(r=>r.good).length} / ${results.length}</div>`}
      <div class="tbl"><table><thead><tr><th>Parte</th><th>Aciertos</th></tr></thead><tbody>${byPart}</tbody></table></div>
      ${results.some(r=>!r.good)?`<h3>Preguntas falladas</h3><div class="review">${results.filter(r=>!r.good).map(r=>`<div class="fb ko"><span class="chip">${PARTS_INFO[r.part][0]} ${PARTS_INFO[r.part][1]}</span> ${r.review||""}</div>`).join("")}</div>`:""}
      <div class="row"><button class="btn primary" id="exam2">Otro simulacro</button></div></div>`;
    $("#exam2").onclick = () => renderExam();
  };
  next();
}


/* ---------- Delegación de eventos ---------- */
document.addEventListener("click", e => {
  const s = e.target.closest("[data-say]"); if (s) { e.stopPropagation(); say(s.dataset.say); return; }
  const c = e.target.closest("[data-c]"); if (c) { openChar(c.dataset.c); return; }
  const w = e.target.closest("[data-w]"); if (w) { openWord(+w.dataset.w); return; }
  const t = e.target.closest("[data-toggle]"); if (t) { $("#dlg").classList.toggle(t.dataset.toggle); return; }
  const sa = e.target.closest("[data-sayall]"); if (sa) { const txt = [...document.querySelectorAll("#dlg .dl .zh")].map(x => x.textContent).join("。"); say(txt, .75); return; }
  const pr = e.target.closest("[data-practice]"); if (pr) { pendingPractice = +pr.dataset.practice; if (location.hash === "#ejercicios") route(); return; }
  const cd = e.target.closest("[data-cards]"); if (cd) { pendingCards = +cd.dataset.cards; if (location.hash === "#tarjetas") route(); return; }
});
document.addEventListener("keydown", e => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const el = e.target.closest("[data-c][role=button],[data-w][role=button]"); if (!el) return;
  e.preventDefault(); el.click();
});

// iPhone: desbloquea la voz con el primer toque y evita que el teclado tape la casilla del pinyin
document.addEventListener("touchend", function unlock(){
  try { if ("speechSynthesis" in window) { const u = new SpeechSynthesisUtterance(" "); u.volume = 0; speechSynthesis.speak(u); } } catch(e) {}
  document.removeEventListener("touchend", unlock);
}, {passive:true});
document.addEventListener("focusin", e => { if (e.target.matches("input,textarea")) setTimeout(() => e.target.scrollIntoView({block:"center", behavior:"smooth"}), 300); });
// App instalable: funciona sin conexión
if (window.HSK_PWA && "serviceWorker" in navigator) { window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {})); }

// Al abrir el curso sin dirección concreta, vuelve a donde lo dejaste
(function resume(){
  const last = store.get("last", null);
  if (!location.hash && last && last !== "#inicio") { history.replaceState(null, "", last); }
  route();
})();
})();
