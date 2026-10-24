import { useState, useEffect } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
:root{--bg:#090911;--bg2:#10101c;--fg:#f4f2ee;--mut:#9a98a8;--line:#24243a;--acc:#ffc58a;--acc2:#b9a0ff}
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--fg);font-family:'Space Grotesk',system-ui,sans-serif;line-height:1.6}
a{color:inherit;text-decoration:none}
.w{max-width:1120px;margin:0 auto;padding:0 24px}
.mono{font-family:'IBM Plex Mono',monospace;font-size:.78rem;letter-spacing:.08em}
.eb{color:var(--acc);margin:0}
nav{position:sticky;top:0;z-index:20;background:rgba(9,9,17,.88);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
nav .w{display:flex;align-items:center;justify-content:space-between;height:64px}
.logo{font-weight:700;letter-spacing:.2em}.logo i{color:var(--acc);font-style:normal}
nav ul{display:flex;gap:26px;list-style:none;margin:0;padding:0}nav ul a{color:var(--mut);font-size:.9rem}nav ul a:hover{color:var(--fg)}
.btn{display:inline-block;background:var(--fg);color:var(--bg);padding:12px 22px;font:500 .92rem inherit;font-family:inherit;border:1px solid var(--fg);cursor:pointer}
.btn.o{background:none;color:var(--fg);border-color:var(--line)}.btn.o:hover{border-color:var(--acc)}
:focus-visible{outline:2px solid var(--acc);outline-offset:3px}
@media(max-width:760px){nav ul{display:none}}
.hero{display:grid;grid-template-columns:1.1fr 1fr;align-items:center;gap:30px;padding:90px 0}
@media(max-width:900px){.hero{grid-template-columns:1fr}}
.hero h1{font-size:clamp(2.8rem,7vw,5.8rem);line-height:.98;letter-spacing:-.04em;margin:18px 0 26px}
.hero h1 em{font-style:normal;color:var(--acc)}
.hero p.l{color:var(--mut);font-size:1.1rem;max-width:46ch}
.cta{display:flex;gap:12px;flex-wrap:wrap;margin-top:30px}
.spin{transform-origin:260px 260px;animation:spin 24s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
@media(prefers-reduced-motion:reduce){.spin,.mq div{animation:none}}
.mq{border-block:1px solid var(--line);overflow:hidden;white-space:nowrap;padding:16px 0;color:var(--mut)}
.mq div{display:inline-block;animation:mq 30s linear infinite}
.mq span{margin:0 22px}.mq span::after{content:'◆';margin-left:44px;color:var(--acc);font-size:.6rem}
@keyframes mq{to{transform:translateX(-50%)}}
section{padding:96px 0}.alt{background:var(--bg2)}
h2{font-size:clamp(2rem,5vw,3.6rem);line-height:1.04;letter-spacing:-.03em;margin:12px 0 18px}
h2 span{color:var(--mut)}.lead{color:var(--mut);max-width:52ch}
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:48px}
@media(max-width:860px){.g3{grid-template-columns:1fr}}
.card{border:1px solid var(--line);background:var(--bg2);overflow:hidden}
.card svg{display:block;width:100%;height:auto}
.card .t{padding:20px}.card h3{margin:6px 0 4px;font-size:1.25rem}.card p{margin:0;color:var(--mut);font-size:.92rem}
.svc{margin-top:40px;border-top:1px solid var(--line)}
.row{border-bottom:1px solid var(--line)}
.row button{all:unset;box-sizing:border-box;width:100%;cursor:pointer;display:flex;justify-content:space-between;align-items:center;padding:28px 0;font-size:clamp(1.5rem,3.6vw,2.6rem);font-weight:500;letter-spacing:-.02em}
.row button:focus-visible{outline:2px solid var(--acc)}
.row.open button{color:var(--acc)}
.row .pm{width:38px;height:38px;border:1px solid var(--line);border-radius:50%;display:grid;place-items:center;font-size:1.2rem;color:var(--mut);flex:none}
.row.open .pm{background:var(--acc);color:var(--bg);border-color:var(--acc)}
.dd{display:flex;justify-content:space-between;gap:24px;flex-wrap:wrap;padding:0 0 30px}
.dd p{margin:0;max-width:44ch;color:var(--mut)}
.tags{display:flex;gap:8px;flex-wrap:wrap}.tags span{border:1px solid var(--line);padding:8px 12px;color:var(--mut)}
.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:28px;margin-top:52px}
@media(max-width:860px){.steps{grid-template-columns:1fr 1fr}}@media(max-width:520px){.steps{grid-template-columns:1fr}}
.steps>div{border-top:1px solid var(--acc);padding-top:18px}
.steps big{display:block;font-size:2.6rem;font-weight:700;color:var(--line);line-height:1}
.steps h3{margin:12px 0 6px}.steps p{margin:0;color:var(--mut);font-size:.92rem}
.price{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:48px}
@media(max-width:860px){.price{grid-template-columns:1fr}}
.pc{border:1px solid var(--line);padding:30px;display:flex;flex-direction:column;gap:14px;background:var(--bg)}
.pc.hot{border-color:var(--acc)}.pc h3{margin:0;font-size:1.7rem}
.pc .n{font-size:2.1rem;font-weight:700}.pc .n small{font-size:.8rem;color:var(--mut);font-weight:400}
.pc ul{list-style:none;padding:0;margin:0;color:var(--mut);font-size:.94rem;flex:1}
.pc li{padding:5px 0 5px 18px;position:relative}.pc li::before{content:'✓';position:absolute;left:0;color:var(--acc)}
.contact{display:grid;grid-template-columns:1fr 1fr;gap:56px}
@media(max-width:860px){.contact{grid-template-columns:1fr;gap:36px}}
.cl{margin-top:28px;border-top:1px solid var(--line)}
.cl a{display:block;padding:18px 0;border-bottom:1px solid var(--line)}
.cl small{display:block;color:var(--mut)}.cl strong{font-size:1.2rem;font-weight:500;overflow-wrap:anywhere}
form{border:1px solid var(--line);background:var(--bg2);padding:30px;display:grid;gap:18px}
label{display:grid;gap:6px;color:var(--mut);font-size:.85rem}
input,select,textarea{background:none;border:0;border-bottom:1px solid var(--line);color:var(--fg);font:inherit;font-size:1rem;padding:8px 0;border-radius:0;width:100%}
select option{color:#14141f}textarea{min-height:100px;resize:vertical}
input:focus,select:focus,textarea:focus{outline:0;border-color:var(--acc)}
footer{border-top:1px solid var(--line);padding:40px 0;color:var(--mut);font-size:.88rem}
footer .w{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap}
.wa{position:fixed;right:20px;bottom:20px;width:56px;height:56px;border-radius:50%;background:#22c55e;display:grid;place-items:center;box-shadow:0 6px 20px rgba(0,0,0,.35);z-index:30}
.wa svg{width:28px;height:28px;fill:#fff}
.nr{display:flex;gap:10px;align-items:center}
.nr .ph{display:flex;gap:8px;align-items:center;border:1px solid var(--line);padding:11px 16px;color:var(--fg)}
.nr .ph:hover{border-color:var(--acc)}
@media(max-width:1000px){.nr .ph{display:none}}
.hero2{position:relative;overflow:hidden;background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:80px 80px}
.hero2::before{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 15% 25%,rgba(255,197,138,.09),transparent 55%),linear-gradient(transparent 65%,var(--bg))}
.hero2 .in{position:relative;display:grid;grid-template-columns:1fr 1.12fr;gap:48px;align-items:center;max-width:1240px;margin:0 auto;padding:84px 24px 70px}
@media(max-width:980px){.hero2 .in{grid-template-columns:1fr;padding-top:56px}}
.dot{display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--acc);margin-right:10px}
.hero2 h1{font-size:clamp(3.1rem,7vw,6.2rem);line-height:.94;letter-spacing:-.045em;font-weight:700;margin:22px 0 30px}
.hero2 h1 em{font-style:normal;color:#d9a066}
.orb{display:inline-block;width:70px;height:32px;margin-left:16px;vertical-align:middle;position:relative;border:1px solid #6a6a88;border-radius:50%;transform:rotate(-8deg)}
.orb::after{content:"";position:absolute;left:50%;top:50%;width:22px;height:22px;margin:-11px;border-radius:50%;background:#7fa9d6}
.hero2 .l{color:var(--mut);font-size:1.08rem;max-width:44ch;margin:0}
.bld{color:var(--mut);margin:44px 0 0}.bld b{color:var(--fg);margin-left:6px}.bld .cur{animation:blink 1s steps(1) infinite}
@keyframes blink{50%{opacity:0}}
.shot{position:relative;padding:34px 0 10px}
.frame{border:1px solid #2c2c44;border-radius:16px;overflow:hidden;background:#0b0b16;box-shadow:0 40px 90px rgba(0,0,0,.55)}
.frame svg{display:block;width:100%;height:auto}
.pill{position:absolute;display:flex;gap:8px;align-items:center;border:1px solid #33334d;background:rgba(9,9,17,.9);border-radius:999px;padding:7px 14px;color:var(--mut);z-index:2}
.pill b{color:var(--fg)}.pill i{width:6px;height:6px;border-radius:50%;background:#7fa9d6}
.pill.lcp i{background:var(--acc)}
.cap{position:absolute;left:0;right:0;bottom:10px;display:flex;justify-content:space-between;align-items:flex-end;padding:60px 22px 18px;background:linear-gradient(transparent,rgba(5,5,10,.92));border-radius:0 0 16px 16px}
.cap h3{margin:4px 0 0;font-size:1.3rem}
.cap .tg{border:1px solid var(--acc);border-radius:999px;padding:7px 14px;color:var(--fg)}
.logo{display:flex;align-items:center;gap:10px}
.studio .in{display:grid;grid-template-columns:1.1fr 1fr;gap:64px}
@media(max-width:900px){.studio .in{grid-template-columns:1fr;gap:36px}}
.q{font-size:clamp(2rem,4.2vw,3.5rem);line-height:1.08;letter-spacing:-.03em;font-weight:500;margin:26px 0 22px}
.est{display:flex;align-items:center;gap:14px;color:var(--mut)}.est::before{content:"";width:56px;height:1px;background:var(--mut)}
.pr>div{border-bottom:1px solid var(--line);padding:24px 0}.pr>div:first-child{padding-top:0}
.pr .rn{font-family:'IBM Plex Mono',monospace;color:var(--acc);font-size:.75rem}
.pr h3{margin:6px 0 6px;font-size:1.25rem}.pr p{margin:0;color:var(--mut);font-size:.95rem}
.stats{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid var(--line);margin-top:80px;background:rgba(255,255,255,.015)}
.stats>div{padding:32px;border-right:1px solid var(--line)}.stats>div:last-child{border:0}
.stats b{display:block;font-size:3rem;font-weight:700;letter-spacing:-.03em;line-height:1.1}.stats b i{font-style:normal;color:#d9a066}
.stats span{color:var(--mut)}
@media(max-width:760px){.stats{grid-template-columns:1fr 1fr}.stats>div{border-bottom:1px solid var(--line)}}
.wx{text-align:right;color:#55546a;margin:22px 0 0}
@media(prefers-reduced-motion:reduce){.bld .cur{animation:none}}
`;

/* ---------- Artwork (inline SVG "images") ---------- */
const Stars = ({ n = 40, w = 520, h = 520 }) =>
  Array.from({ length: n }, (_, i) => (
    <circle key={i} cx={(i * 197) % w} cy={(i * 331) % h} r={(i % 3) * 0.5 + 0.6} fill="#fff" opacity={0.25 + (i % 5) * 0.12} />
  ));

const Frame = ({ children, grad }) => (
  <svg viewBox="0 0 400 250" role="img" aria-hidden="true">
    <defs>{grad}</defs>
    <rect width="400" height="250" fill="#0b0b16" />
    <rect x="0" y="0" width="400" height="22" fill="#14142a" />
    {[12, 26, 40].map((x) => <circle key={x} cx={x} cy="11" r="3.5" fill="#3a3a5a" />)}
    <rect x="110" y="5" width="180" height="12" rx="6" fill="#0b0b16" />
    {children}
  </svg>
);

function Villa() {
  return (
    <Frame grad={<linearGradient id="v" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2a1440" /><stop offset=".55" stopColor="#ff9a56" /><stop offset="1" stopColor="#ffd08a" /></linearGradient>}>
      <rect y="22" width="400" height="228" fill="url(#v)" />
      <circle cx="285" cy="150" r="26" fill="#fff2cf" />
      <rect y="170" width="400" height="80" fill="#10213a" />
      <path d="M0 190q50-10 100 0t100 0 100 0 100 0v60H0z" fill="#16304f" />
      <path d="M0 185l70-30 70 30z M60 185h120v40H60z" fill="#120a1e" />
      <rect x="82" y="195" width="30" height="30" fill="#ffc58a" opacity=".85" />
      <path d="M330 170v-50M330 120q-20-10-34-2M330 120q20-10 34-2M330 120q-8-18-8-30M330 120q8-18 10-28" stroke="#0a0f1a" strokeWidth="4" fill="none" />
      <text x="24" y="70" fill="#fff" fontFamily="serif" fontSize="26">Villa Serena</text>
      <rect x="24" y="82" width="64" height="16" fill="#ffc58a" />
    </Frame>
  );
}
function Clinic() {
  return (
    <Frame grad={<linearGradient id="c" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0d2b3a" /><stop offset="1" stopColor="#0b6e6a" /></linearGradient>}>
      <rect y="22" width="400" height="228" fill="url(#c)" />
      <text x="24" y="68" fill="#fff" fontFamily="sans-serif" fontWeight="700" fontSize="24">Care that</text>
      <text x="24" y="96" fill="#7ff0d6" fontFamily="sans-serif" fontWeight="700" fontSize="24">fits your day.</text>
      <rect x="24" y="112" width="96" height="24" fill="#7ff0d6" />
      <rect x="220" y="50" width="156" height="180" rx="10" fill="#0a1a26" stroke="#2c7a78" />
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} x={234 + (i % 4) * 34} y={90 + Math.floor(i / 4) * 34} width="28" height="26" rx="5" fill={i === 6 ? "#7ff0d6" : "#16384a"} />
      ))}
      <rect x="234" y="62" width="100" height="10" rx="5" fill="#2c7a78" />
    </Frame>
  );
}
function Bot() {
  return (
    <Frame grad={<linearGradient id="b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#120c24" /><stop offset="1" stopColor="#2f1d63" /></linearGradient>}>
      <rect y="22" width="400" height="228" fill="url(#b)" />
      <rect x="40" y="48" width="190" height="38" rx="14" fill="#2a2150" />
      <rect x="54" y="62" width="120" height="8" rx="4" fill="#b9a0ff" />
      <rect x="170" y="100" width="190" height="38" rx="14" fill="#b9a0ff" />
      <rect x="184" y="114" width="140" height="8" rx="4" fill="#1a1236" />
      <rect x="40" y="152" width="210" height="38" rx="14" fill="#2a2150" />
      <rect x="54" y="166" width="150" height="8" rx="4" fill="#b9a0ff" />
      <rect x="40" y="206" width="320" height="26" rx="13" fill="#0e0a1e" stroke="#4a3a8a" />
      <circle cx="344" cy="219" r="9" fill="#ffc58a" />
    </Frame>
  );
}

const WORDS = ["CLINIC", "REAL ESTATE", "RESTAURANT", "E-COMMERCE", "SCHOOL"];
function Typer() {
  const [i, setI] = useState(0), [n, setN] = useState(0), [del, setDel] = useState(false);
  useEffect(() => {
    const w = WORDS[i];
    const t = setTimeout(() => {
      if (!del) { n < w.length ? setN(n + 1) : setDel(true); }
      else if (n > 0) setN(n - 1);
      else { setDel(false); setI((i + 1) % WORDS.length); }
    }, !del && n === w.length ? 1400 : del ? 50 : 90);
    return () => clearTimeout(t);
  }, [n, del, i]);
  return <p className="mono bld">✦ Currently building for <b>{WORDS[i].slice(0, n)}</b><span className="cur">_</span></p>;
}

function HeroShot() {
  const frond = (x, y, d) => `M${x} ${y}q${d * 22} -28 ${d * 58} -8M${x} ${y}q${d * 14} -40 ${d * 44} -34M${x} ${y}q${d * -6} -34 ${d * -34} -38M${x} ${y}q${d * -26} -14 ${d * -52} 8`;
  return (
    <svg viewBox="0 0 680 410" role="img" aria-label="Villa Serena hospitality website on a sunset beach">
      <defs>
        <linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#150d28" /><stop offset=".4" stopColor="#4a2150" /><stop offset=".75" stopColor="#d9683a" /><stop offset="1" stopColor="#ffb36b" /></linearGradient>
        <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3a2442" /><stop offset="1" stopColor="#0a1020" /></linearGradient>
        <linearGradient id="pool" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffb36b" stopOpacity=".85" /><stop offset=".5" stopColor="#7a3f6a" /><stop offset="1" stopColor="#1a1830" /></linearGradient>
        <radialGradient id="sg"><stop offset="0" stopColor="#ffd9a0" stopOpacity=".6" /><stop offset="1" stopColor="#ffb36b" stopOpacity="0" /></radialGradient>
      <filter id="gr"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" /><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .08 0" /></filter>
        <radialGradient id="vg" cx=".5" cy=".5" r=".75"><stop offset=".55" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".6" /></radialGradient>
        <radialGradient id="lt"><stop offset="0" stopColor="#ffd9a0" stopOpacity=".9" /><stop offset="1" stopColor="#ffb36b" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="680" height="410" fill="#0b0b16" />
      <rect width="680" height="44" fill="#13132a" />
      {[18, 34, 50].map((x) => <circle key={x} cx={x} cy="22" r="4" fill="#3a3a5a" />)}
      <rect x="190" y="10" width="300" height="24" rx="12" fill="#0b0b16" /><text x="340" y="26" fill="#8d8ba6" fontSize="10" fontFamily="monospace" textAnchor="middle">noorix.in/villa-serena</text>
      <rect y="44" width="680" height="206" fill="url(#sk)" />
      <circle cx="520" cy="228" r="95" fill="url(#sg)" /><circle cx="520" cy="232" r="19" fill="#fff0c8" />
      <path d="M0 250V236Q90 214 180 238T360 242T540 240T680 234V250Z" fill="#1a1228" />
      <rect y="250" width="680" height="160" fill="url(#sea)" />
      {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={508 - k * 6} y={256 + k * 12} width={24 + k * 12} height="3" fill="#ffb36b" opacity={0.6 - k * 0.1} />)}
      <path d="M130 312L680 292V352L96 376Z" fill="url(#pool)" />
      <path d="M0 330L128 310L92 410H0Z" fill="#0a0a12" />
      <rect x="0" y="196" width="190" height="118" fill="#0d0a16" /><rect x="0" y="190" width="206" height="8" fill="#16111f" />
      {[14, 62, 110].map((x) => <rect key={x} x={x} y="222" width="36" height="56" fill="#ffc58a" opacity=".72" />)}
      <path d="M40 352l60-10 6 14-60 10z" fill="#1c1a2c" /><path d="M24 372l70-12 4 12-70 12z" fill="#1c1a2c" />
      {Array.from({ length: 22 }, (_, k) => <circle key={k} cx={(k * 97) % 680} cy={50 + ((k * 53) % 70)} r=".8" fill="#fff" opacity={0.2 + (k % 4) * 0.12} />)}
      {Array.from({ length: 14 }, (_, k) => <path key={k} d={`M${40 + k * 44} ${262 + (k % 4) * 22}h${24 + (k % 3) * 14}`} stroke="#ffb36b" strokeOpacity={0.12 + (k % 3) * 0.06} strokeWidth="1.5" />)}
      <path d="M215 250Q300 222 392 236Q430 242 450 256L450 268Q330 276 215 266Z" fill="#110c1c" />
      <path d="M215 250Q300 222 392 236Q430 242 450 256" fill="none" stroke="#ffb36b" strokeOpacity=".35" />
      {[250, 290, 330, 372, 410].map((x, k) => <ellipse key={x} cx={x} cy={238 - (k % 2) * 4} rx="16" ry="10" fill="#0c0814" />)}
      <path d="M522 296L566 292L552 356L496 362Z" fill="#ffd9a0" opacity=".22" />
      <path d="M130 312L680 292" stroke="#ffd9a0" strokeOpacity=".5" />
      {[[150, 326], [214, 320], [60, 300]].map(([x, y]) => <g key={x}><circle cx={x} cy={y} r="26" fill="url(#lt)" opacity=".5" /><circle cx={x} cy={y} r="3" fill="#ffe3b0" /></g>)}
      <ellipse cx="610" cy="392" rx="90" ry="20" fill="#08070e" /><ellipse cx="660" cy="372" rx="50" ry="22" fill="#0b0912" />
      <g stroke="#07060d" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M586 330Q594 280 604 232" strokeWidth="6" /><path d={frond(604, 232, 1)} /><path d={frond(604, 232, -1)} />
        <path d="M640 340Q648 300 656 262" strokeWidth="5" /><path d={frond(656, 262, 1)} /><path d={frond(656, 262, -1)} />
        <path d="M520 336Q526 306 534 284" strokeWidth="4" /><path d={frond(534, 284, 1)} /><path d={frond(534, 284, -1)} />
      </g>
      <text x="20" y="72" fill="#f4eadb" fontSize="9" letterSpacing="3" fontFamily="Georgia,serif">VILLA SERENA</text>
      {["STAY", "EXPERIENCES", "DINING", "WELLNESS"].map((t, k) => <text key={t} x={300 + k * 62} y="72" fill="#d8cbb8" fontSize="6.5" letterSpacing="1.5" fontFamily="sans-serif">{t}</text>)}
      <rect x="590" y="62" width="70" height="16" fill="#c9a064" opacity=".8" />
      <text x="20" y="118" fill="#ffd9a8" fontSize="6.5" letterSpacing="2" fontFamily="sans-serif">A DIFFERENT SHADE OF PARADISE</text>
      <text x="16" y="168" fill="#f4eadb" fontSize="58" fontFamily="Georgia,serif">Villa Serena</text>
      <text x="20" y="190" fill="#d8cbb8" fontSize="6.5" letterSpacing="2" fontFamily="sans-serif">PRIVATE VILLAS · UNTAMED BEAUTY</text>
      <text x="20" y="212" fill="#f0e4d0" fontSize="9" fontFamily="Georgia,serif">A curated collection of beachside villas,</text>
      <text x="20" y="225" fill="#f0e4d0" fontSize="9" fontFamily="Georgia,serif">where tropical calm meets quiet luxury.</text>
      <circle cx="30" cy="262" r="10" fill="none" stroke="#f4eadb" opacity=".8" /><path d="M27 257l9 5-9 5z" fill="#f4eadb" />
      <rect x="226" y="338" width="330" height="26" fill="#0b0b16" opacity=".55" />
      {["CHECK-IN", "CHECK-OUT", "GUESTS"].map((t, k) => <text key={t} x={240 + k * 100} y="354" fill="#b9b3c8" fontSize="6" letterSpacing="1" fontFamily="sans-serif">{t}</text>)}
      <rect x="476" y="342" width="72" height="18" fill="#c9a064" opacity=".6" />
      <rect y="44" width="680" height="366" fill="url(#vg)" /><rect y="44" width="680" height="366" filter="url(#gr)" />
    </svg>
  );
}

/* ---------- Data ---------- */
const works = [
  { Art: Villa, tag: "Web development", title: "Villa Rentals Platform", text: "Booking-ready site with live availability and a 0.9s load." },
  { Art: Clinic, tag: "WordPress", title: "Clinic & Appointments", text: "Editable WordPress site with online booking and WhatsApp follow-up." },
  { Art: Bot, tag: "AI", title: "Support Chatbot", text: "An AI assistant trained on a store’s own catalogue and FAQs." },
];
const services = [
  { t: "Web Development", p: "Hand-coded, responsive websites and web apps that load fast and turn visitors into enquiries.", tags: ["Custom UI", "React / Node", "Web apps"] },
  { t: "WordPress", p: "Custom themes, WooCommerce stores and sites your team can edit without calling a developer.", tags: ["Custom themes", "WooCommerce", "Speed & SEO"] },
  { t: "AI Solutions", p: "Chatbots, lead-qualifying assistants and workflow automation that save hours every week.", tags: ["Chatbots", "Automation", "AI integrations"] },
];
const steps = [
  ["01", "Day 1–3", "Discover", "We learn your goals and customers before deciding what the site looks like."],
  ["02", "Week 1–2", "Design", "Clickable screens you can react to, not a PDF."],
  ["03", "Week 2–4", "Build", "Responsive, accessible code with progress shared every few days."],
  ["04", "Ongoing", "Launch & grow", "We deploy, measure and keep improving after handover."],
];
const plans = [
  { tag: "Local brands", name: "Launchpad", price: "Rs 25,000", note: "starting", list: ["Up to 5 custom pages", "Mobile-first design", "WhatsApp + contact form", "Basic SEO"] },
  { tag: "Most chosen · WordPress", name: "Orbit", price: "Rs 60,000", note: "starting", hot: true, list: ["Up to 12 pages, custom design", "WordPress CMS you can edit", "Speed & Core Web Vitals", "Lead tracking setup", "60 days support"] },
  { tag: "Stores, apps & AI", name: "Deep Space", price: "Custom", note: "scoped", list: ["Web app or online store", "AI chatbot or automation", "Integrations and dashboards", "Ongoing retainer"] },
];
const fields = ["Clinics", "Restaurants", "Real estate", "Education", "E-commerce", "Fitness", "Legal", "Hospitality"];
const EMAIL = "bushrarao572@gmail.com";
const PHONE = "+92 3704392735"; // change me
const WA = "https://wa.me/923286866351"; // change me

/* ---------- App ---------- */
export default function App() {
  const [open, setOpen] = useState(0);
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const d = new FormData(e.target);
    const body = `Name: ${d.get("n")}\nContact: ${d.get("c")}\nService: ${d.get("s")}\n\n${d.get("m")}`;
    setSent(true);
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("New project brief – " + d.get("s"))}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <style>{css}</style>
      <nav><div className="w">
        <a className="logo" href="#top"><svg width="30" height="22" viewBox="0 0 30 22" aria-hidden="true"><ellipse cx="15" cy="11" rx="13" ry="6" fill="none" stroke="#d9a066" transform="rotate(-18 15 11)" /><circle cx="15" cy="11" r="4" fill="#d9a066" /><circle cx="26" cy="7" r="1.6" fill="#7fa9d6" /></svg>NOOR<i>I</i>X</a>
        <ul className="mono">{["work", "studio", "services", "process", "pricing", "contact"].map((s) => <li key={s}><a href={`#${s}`}>{s[0].toUpperCase() + s.slice(1)}</a></li>)}</ul>
        <div className="nr"><a className="ph mono" href={`tel:${PHONE.replace(/\s/g, "")}`}>☎ {PHONE}</a><a className="btn mono" href="#contact">START A PROJECT →</a></div>
      </div></nav>

      <header className="hero2" id="top"><div className="in">
        <div>
          <p className="mono" style={{ color: "var(--mut)", margin: 0 }}><span className="dot" />WEB DEVELOPMENT · WORDPRESS · AI · OPEN FOR PROJECTS</p>
          <h1>Websites that <em>light</em> businesses up<span className="orb" aria-hidden="true" />.</h1>
          <p className="l">Noorix designs and engineers premium websites, WordPress stores and AI tools for businesses that take their brand seriously. Beautiful on the surface, fast underneath.</p>
          <div className="cta">
            <a className="btn mono" href="#work">SEE SELECTED WORK →</a>
            <a className="btn o mono" href={`tel:${PHONE.replace(/\s/g, "")}`}>☎ {PHONE}</a>
            <a className="btn o" href={WA} aria-label="WhatsApp">💬</a>
          </div>
          <Typer />
        </div>
        <div>
          <div className="shot">
            <span className="pill mono" style={{ left: 0, top: 0 }}><i />LIGHTHOUSE <b>99</b></span>
            <div className="frame"><HeroShot /></div>
            <div className="cap">
              <div><span className="mono" style={{ color: "var(--mut)" }}>CASE 01 · HOSPITALITY</span><h3>Villa Serena</h3></div>
              <span className="tg mono">HOSPITALITY WEBSITE</span>
            </div>
            <span className="pill lcp mono" style={{ right: -10, bottom: 70 }}><i />LCP <b>0.9s</b></span>
          </div>
          <p className="wx mono">WORKING WORLDWIDE</p>
        </div>
      </div></header>

      <div className="mq mono" aria-hidden="true"><div>{[...fields, ...fields].map((f, i) => <span key={i}>{f}</span>)}</div></div>

      <section id="work"><div className="w">
        <p className="mono eb">Portfolio</p>
        <h2>Selected <span>digital experiences</span></h2>
        <p className="lead">A fraction of what we ship. Replace these with your real projects.</p>
        <div className="g3">
          {works.map(({ Art, tag, title, text }) => (
            <article className="card" key={title}><Art /><div className="t"><span className="mono eb">{tag}</span><h3>{title}</h3><p>{text}</p></div></article>
          ))}
        </div>
      </div></section>

      <section id="studio" className="studio"><div className="w in">
        <div>
          <svg width="40" height="30" viewBox="0 0 30 22" aria-hidden="true"><ellipse cx="15" cy="11" rx="13" ry="6" fill="none" stroke="#d9a066" transform="rotate(-18 15 11)" /><circle cx="15" cy="11" r="4" fill="#d9a066" /></svg>
          <p className="q">“We build websites that make your business impossible to miss.”</p>
          <div className="est mono">THE NOORIX STUDIO · EST. 2026</div>
          <p className="lead" style={{ marginTop: 28 }}>We’re a deliberately small studio. The person you talk to on the first call is the person designing and coding your site, which is why our work doesn’t look like anyone else’s and why clients keep coming back.</p>
        </div>
        <div className="pr">
          {[["I", "Fast by default", "Sub-second loads and clean, hand-written code. Speed is a design decision, not an afterthought."],
            ["II", "Custom, never a template", "Every layout is drawn for your business, so nobody in your industry looks like you."],
            ["III", "Built to convert", "Layout, copy and motion all point at one thing: the enquiry, the booking, the sale."],
            ["IV", "Yours completely", "You get the code, the design files and the logins. No lock-in, no hostage-taking."]].map(([r, t, p]) => (
            <div key={r}><span className="rn">{r}</span><h3>{t}</h3><p>{p}</p></div>
          ))}
        </div>
      </div></section>

      <section id="services" className="alt"><div className="w">
        <p className="mono eb">What we do</p>
        <h2>Three services, <span>one studio.</span></h2>
        <p className="lead">Strategy, design, engineering and ongoing care in one place.</p>
        <div className="svc">
          {services.map((s, i) => (
            <div key={s.t} className={"row" + (open === i ? " open" : "")}>
              <button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>{s.t}<span className="pm">{open === i ? "×" : "+"}</span></button>
              {open === i && <div className="dd"><p>{s.p}</p><div className="tags mono">{s.tags.map((t) => <span key={t}>{t}</span>)}</div></div>}
            </div>
          ))}
        </div>
      </div></section>

      <section id="process"><div className="w">
        <p className="mono eb">How it runs</p>
        <h2>From first call to <span>launch day.</span></h2>
        <div className="steps">{steps.map(([n, when, t, p]) => <div key={n}><big>{n}</big><span className="mono" style={{ color: "var(--mut)" }}>{when}</span><h3>{t}</h3><p>{p}</p></div>)}</div>
        <div className="stats">
          {[["10", "+", "Projects delivered"], ["100", "%", "Focus on quality"], ["3", "", "Core services"], ["24", "/7", "Online presence"]].map(([n, u, l]) => (
            <div key={l}><b>{n}<i>{u}</i></b><span className="mono">{l.toUpperCase()}</span></div>
          ))}
        </div>
      </div></section>

      <section id="pricing" className="alt"><div className="w">
        <p className="mono eb">Engagements</p>
        <h2>Clear scope. <span>Clear numbers.</span></h2>
        <p className="lead">Every project starts with a free 30-minute call and a written scope. 50% to start, 50% on launch.</p>
        <div className="price">
          {plans.map((p) => (
            <div key={p.name} className={"pc" + (p.hot ? " hot" : "")}>
              <span className="mono" style={{ color: p.hot ? "var(--acc)" : "var(--mut)" }}>{p.tag}</span>
              <h3>{p.name}</h3>
              <div className="n">{p.price} <small>{p.note}</small></div>
              <ul>{p.list.map((l) => <li key={l}>{l}</li>)}</ul>
              <a className={"btn" + (p.hot ? "" : " o")} href="#contact">Start with {p.name}</a>
            </div>
          ))}
        </div>
      </div></section>

      <section id="contact"><div className="w contact">
        <div>
          <p className="mono eb">Two slots open this month</p>
          <h2>Let’s put your business in <span style={{ color: "var(--acc)" }}>orbit.</span></h2>
          <p className="lead">Call, message, or send the brief. You’ll get a real reply within one working day.</p>
          <div className="cl">
            <a href={`tel:${PHONE.replace(/\s/g, "")}`}><small className="mono">Call</small><strong>{PHONE}</strong></a>
            <a href={WA}><small className="mono">WhatsApp</small><strong>Message us</strong></a>
            <a href={`mailto:${EMAIL}`}><small className="mono">Email</small><strong>{EMAIL}</strong></a>
          </div>
        </div>
        <form onSubmit={submit}>
          <h3 style={{ margin: 0, fontSize: "1.5rem" }}>Tell us what you need built</h3>
          <label>Your name<input name="n" required /></label>
          <label>Phone or email<input name="c" required /></label>
          <label>Service<select name="s"><option>Web development</option><option>WordPress</option><option>AI solution</option></select></label>
          <label>What are you building?<textarea name="m" required placeholder="A 6-page site for my clinic with online booking…" /></label>
          <button className="btn" type="submit">Send the brief</button>
          {sent && <p role="status" style={{ color: "var(--acc)", margin: 0 }}>Opening your email app to send the brief…</p>}
        </form>
      </div></section>

      <footer><div className="w"><span>© 2026 Noorix. All rights reserved.</span><span>Web development · WordPress · AI</span></div></footer>

      <a className="wa" href={WA} aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.4.6-.3.3c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.8-.1 1.4z" /></svg>
      </a>
    </>
  );
}
