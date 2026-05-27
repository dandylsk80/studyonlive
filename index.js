import regions from "../data/regions.data.js";
import { buildContent } from "./content.js";

// 교육 이미지 풀 (Unsplash, 사람 최소·교육 테마) — 검증된 84개
const IMG_IDS = ["photo-1427504494785-3a9ca7044f45","photo-1434030216411-0b793f4b4173","photo-1454165804606-c3d57bc86b40","photo-1455390582262-044cdead277a","photo-1456513080510-7bf3a84b82f8","photo-1456735190827-d1262f71b8a3","photo-1457369804613-52c61a468e7d","photo-1461749280684-dccba630e2f6","photo-1471107340929-a87cd0f5b5f3","photo-1475721027785-f74eccf877e2","photo-1480796927426-f609979314bd","photo-1481627834876-b7833e8f5570","photo-1483691278019-cb7253bee49f","photo-1484480974693-6ca0a78fb36b","photo-1488190211105-8b0e65b80b4e","photo-1488646953014-85cb44e25828","photo-1490645935967-10de6ba17061","photo-1491841651911-c44c30c34548","photo-1493225457124-a3eb161ffa5f","photo-1493976040374-85c8e12f0c0e","photo-1495197359483-d092478c170a","photo-1498050108023-c5249f4df085","photo-1499209974431-9dddcece7f88","photo-1501139083538-0139583c060f","photo-1501504905252-473c47e087f8","photo-1503676260728-1c00da094a0b","photo-1504384308090-c894fdcc538d","photo-1504711434969-e33886168d6c","photo-1506126613408-eca07ce68773","photo-1506784983877-45594efa4cbe","photo-1507413245164-6160d8298b31","photo-1507842217343-583bb7270b66","photo-1509228627152-72ae9ae6848d","photo-1512820790803-83ca734da794","photo-1513258496099-48168024aec0","photo-1513635269975-59663e0ac1ad","photo-1516321497487-e288fb19713f","photo-1517511620798-cec17d428bc0","photo-1517836357463-d25dfeac3438","photo-1517842645767-c639042777db","photo-1519681393784-d120267933ba","photo-1519904981063-b0cf448d479e","photo-1520206183501-b80df61043c2","photo-1521017432531-fbd92d768814","photo-1521737711867-e3b97375f902","photo-1521791136064-7986c2920216","photo-1522202176988-66273c2fd55f","photo-1522869635100-9f4c5e86aa37","photo-1522881193457-37ae97c905bf","photo-1523050854058-8df90110c9f1","photo-1523240795612-9a054b0db644","photo-1523482580672-f109ba8cb9be","photo-1524413840807-0c3cb6fa808d","photo-1527443224154-c4a3942d3acf","photo-1528360983277-13d401cdc186","photo-1529390079861-591de354faf5","photo-1531482615713-2afd69097998","photo-1532094349884-543559244e6a","photo-1532153975070-2e9ab71f1b14","photo-1542051841857-5f90071e7989","photo-1543269865-cbf427effbad","photo-1544717305-2782549b5136","photo-1545569341-9eb8b30979d9","photo-1546410531-bb4caa6b424d","photo-1547190027-9156686aa2f0","photo-1548591985-43dd69c43eb0","photo-1551023892-4e8a60d9da17","photo-1551288049-bebda4e38f71","photo-1552581234-26160f608093","photo-1552664730-d307ca884978","photo-1555066931-4365d14bab8c","photo-1555400113-e72b0b0f3b7a","photo-1556740758-90de374c12ad","photo-1556761175-5973dc0f32e7","photo-1578632767115-351597cf2477","photo-1580582932707-520aed937b7b","photo-1583158779-6ee4cb63ed9b","photo-1588196749597-9ff075ee6b5b","photo-1590559899731-a382839e5549","photo-1599901860904-17e6ed7083a0"];

function hashStr(str){let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}
function imgFor(slug, salt){const idx=hashStr(slug+(salt||""))%IMG_IDS.length;return `https://images.unsplash.com/${IMG_IDS[idx]}?w=1200&q=80&auto=format&fit=crop`;}

// ─────────────────────────────────────────────────────────────
// 설정
// ─────────────────────────────────────────────────────────────
const SITE = {
  name: "스터디온라이브",
  nameEn: "STUDY ONLIVE",
  domain: "studyonlive.com",
  desc: "전국 1:1 화상과외 매칭 플랫폼. 검증된 선생님과 실시간 온라인 수업으로 어디서든 공부하세요.",
};

const SUBJECTS = [
  { slug: "korean", name: "국어", icon: "✍️" },
  { slug: "english", name: "영어", icon: "📖" },
  { slug: "math", name: "수학", icon: "📐" },
  { slug: "social", name: "사회", icon: "🌏" },
  { slug: "science", name: "과학", icon: "🔬" },
];

const SUBJECT_MAP = Object.fromEntries(SUBJECTS.map((s) => [s.slug, s]));

// 지역 슬러그 → 지역객체 인덱스
const REGION_MAP = Object.fromEntries(regions.map((r) => [r.slug, r]));

// 시도 영문 슬러그 목록 (지역 슬러그 첫 토큰)
const SIDO_LIST = [
  { slug: "seoul", name: "서울" },
  { slug: "gyeonggi", name: "경기" },
  { slug: "incheon", name: "인천" },
  { slug: "busan", name: "부산" },
  { slug: "daegu", name: "대구" },
  { slug: "daejeon", name: "대전" },
  { slug: "gwangju", name: "광주" },
  { slug: "ulsan", name: "울산" },
  { slug: "sejong", name: "세종" },
  { slug: "gangwon", name: "강원" },
  { slug: "chungbuk", name: "충북" },
  { slug: "chungnam", name: "충남" },
  { slug: "jeonbuk", name: "전북" },
  { slug: "jeonnam", name: "전남" },
  { slug: "gyeongbuk", name: "경북" },
  { slug: "gyeongnam", name: "경남" },
  { slug: "jeju", name: "제주" },
];

// ─────────────────────────────────────────────────────────────
// 라우터
// ─────────────────────────────────────────────────────────────
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";
    const segs = path.split("/").filter(Boolean);

    // 상담폼 제출
    if (request.method === "POST" && path === "/api/inquiry") {
      return handleInquiry(request, env);
    }

    // robots.txt
    if (path === "/robots.txt") {
      return new Response(
        `User-agent: *\nAllow: /\nSitemap: https://${SITE.domain}/sitemap.xml\n`,
        { headers: { "content-type": "text/plain" } }
      );
    }

    // sitemap.xml
    if (path === "/sitemap.xml") {
      return sitemap();
    }

    // 메인
    if (path === "/") {
      return html(pageHome());
    }

    // 1단계: /{지역slug}  →  지역 페이지 (과목 선택)
    if (segs.length === 1) {
      const r = REGION_MAP[segs[0]];
      if (r) return html(pageRegion(r));
    }

    // 2단계: /{지역slug}/{과목slug}  →  최종 랜딩
    if (segs.length === 2) {
      const r = REGION_MAP[segs[0]];
      const s = SUBJECT_MAP[segs[1]];
      if (r && s) return html(pageRegionSubject(r, s));
    }

    return html(page404(), 404);
  },
};

// ─────────────────────────────────────────────────────────────
// 상담폼 처리 → Google Apps Script로 전달
// ─────────────────────────────────────────────────────────────
async function handleInquiry(request, env) {
  try {
    const data = await request.json();
    const GAS_URL = env.GAS_URL; // 환경변수에 Apps Script 웹앱 URL 저장
    if (GAS_URL) {
      await fetch(GAS_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          student: data.student || "",
          grade: data.grade || "",
          phone: data.phone || "",
          address: data.address || "",
          subject: data.subject || "",
          message: data.message || "",
          page: data.page || "",
          time: new Date().toISOString(),
        }),
      });
    }
    return new Response(JSON.stringify({ ok: true }), {
      headers: { "content-type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}

// ─────────────────────────────────────────────────────────────
// sitemap
// ─────────────────────────────────────────────────────────────
function sitemap() {
  const urls = [`https://${SITE.domain}/`];
  for (const r of regions) {
    urls.push(`https://${SITE.domain}/${r.slug}`);
    for (const s of SUBJECTS) {
      urls.push(`https://${SITE.domain}/${r.slug}/${s.slug}`);
    }
  }
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n") +
    `\n</urlset>`;
  return new Response(body, { headers: { "content-type": "application/xml" } });
}

// ─────────────────────────────────────────────────────────────
// HTML 래퍼
// ─────────────────────────────────────────────────────────────
function html(body, status = 200) {
  return new Response(body, {
    status,
    headers: { "content-type": "text/html;charset=UTF-8" },
  });
}

function layout({ title, desc, canonical, body, image }) {
  const ogImage = image || `https://images.unsplash.com/${IMG_IDS[0]}?w=1200&q=80&auto=format&fit=crop`;
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${canonical}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="website">
<meta property="og:url" content="${canonical}">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:image" content="${ogImage}">
<meta name="robots" content="index,follow">
<style>${CSS}</style>
</head>
<body>
${HEADER}
${body}
${FOOTER}
${FORM_MODAL}
<script>${JS}</script>
</body>
</html>`;
}

// ─────────────────────────────────────────────────────────────
// 디자인 (CSS) — 밝고 깔끔 + 디지털 느낌
// ─────────────────────────────────────────────────────────────
const CSS = `
:root{
  --bg:#fbfcff; --surface:#ffffff; --ink:#0b1020; --muted:#5b6478;
  --line:#e7ebf3; --brand:#2f6bff; --brand2:#6a4bff; --accent:#00d4c8;
  --glow:rgba(47,107,255,.14);
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{
  font-family:'Pretendard','Apple SD Gothic Neo',-apple-system,BlinkMacSystemFont,system-ui,sans-serif;
  background:var(--bg);color:var(--ink);line-height:1.6;-webkit-font-smoothing:antialiased;
}
a{color:inherit;text-decoration:none}
.wrap{max-width:1160px;margin:0 auto;padding:0 24px}

/* 헤더 */
header.nav{position:sticky;top:0;z-index:50;backdrop-filter:blur(14px);
  background:rgba(251,252,255,.82);border-bottom:1px solid var(--line)}
.nav-in{display:flex;align-items:center;justify-content:space-between;height:64px}
.logo{display:flex;align-items:center;gap:10px;font-weight:800;font-size:19px;letter-spacing:-.02em}
.logo .dot{width:11px;height:11px;border-radius:50%;background:var(--brand);
  box-shadow:0 0 0 4px var(--glow);animation:pulse 2s infinite}
@keyframes pulse{0%,100%{box-shadow:0 0 0 4px var(--glow)}50%{box-shadow:0 0 0 8px transparent}}
.logo b{color:var(--brand)}
.nav-cta{font-size:14px;font-weight:700;padding:9px 18px;border-radius:999px;
  background:var(--ink);color:#fff;transition:.2s}
.nav-cta:hover{transform:translateY(-1px)}

/* 히어로 */
.hero{position:relative;overflow:hidden;padding:88px 0 64px}
.hero::before{content:"";position:absolute;inset:0;z-index:0;
  background:
    radial-gradient(60% 50% at 75% 0%,rgba(106,75,255,.10),transparent 70%),
    radial-gradient(50% 50% at 10% 20%,rgba(0,212,200,.10),transparent 70%);
}
.grid-bg{position:absolute;inset:0;z-index:0;opacity:.5;
  background-image:linear-gradient(var(--line) 1px,transparent 1px),
    linear-gradient(90deg,var(--line) 1px,transparent 1px);
  background-size:44px 44px;mask-image:linear-gradient(180deg,#000,transparent 80%)}
.hero-in{position:relative;z-index:1;text-align:center}
.badge{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:700;
  color:var(--brand);background:#fff;border:1px solid var(--line);padding:7px 15px;
  border-radius:999px;box-shadow:0 2px 10px rgba(20,40,90,.05);margin-bottom:24px}
.badge .live{width:7px;height:7px;border-radius:50%;background:var(--accent);
  box-shadow:0 0 0 0 var(--accent);animation:live 1.6s infinite}
@keyframes live{0%{box-shadow:0 0 0 0 rgba(0,212,200,.6)}100%{box-shadow:0 0 0 8px transparent}}
.hero h1{font-size:clamp(34px,6vw,60px);font-weight:900;letter-spacing:-.035em;line-height:1.08}
.hero h1 .g{background:linear-gradient(100deg,var(--brand),var(--brand2));
  -webkit-background-clip:text;background-clip:text;color:transparent}
.hero p.sub{margin:22px auto 0;max-width:560px;font-size:17px;color:var(--muted)}
.hero-cta{margin-top:34px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.btn{font-size:15px;font-weight:700;padding:14px 26px;border-radius:14px;cursor:pointer;
  border:none;transition:.2s;display:inline-flex;align-items:center;gap:8px}
.btn-p{background:linear-gradient(100deg,var(--brand),var(--brand2));color:#fff;
  box-shadow:0 10px 26px -8px var(--brand)}
.btn-p:hover{transform:translateY(-2px);box-shadow:0 16px 34px -8px var(--brand)}
.btn-o{background:#fff;border:1px solid var(--line);color:var(--ink)}
.btn-o:hover{border-color:var(--brand);color:var(--brand)}

/* 통계 */
.stats{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-top:48px}
.stat{background:var(--surface);border:1px solid var(--line);border-radius:18px;
  padding:20px 26px;min-width:150px;box-shadow:0 4px 18px rgba(20,40,90,.04)}
.stat .n{font-size:28px;font-weight:900;letter-spacing:-.03em;
  background:linear-gradient(100deg,var(--brand),var(--brand2));
  -webkit-background-clip:text;background-clip:text;color:transparent}
.stat .l{font-size:13px;color:var(--muted);font-weight:600;margin-top:2px}

/* 섹션 */
section{padding:64px 0}
.sec-head{text-align:center;margin-bottom:40px}
.sec-head .k{font-size:13px;font-weight:800;color:var(--brand);letter-spacing:.08em;text-transform:uppercase}
.sec-head h2{font-size:clamp(26px,4vw,38px);font-weight:900;letter-spacing:-.03em;margin-top:8px}
.sec-head p{color:var(--muted);margin-top:10px;font-size:16px}

/* 과목 카드 */
.subj-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}
@media(max-width:760px){.subj-grid{grid-template-columns:repeat(2,1fr)}}
.subj{background:var(--surface);border:1px solid var(--line);border-radius:18px;
  padding:26px 18px;text-align:center;transition:.22s;cursor:pointer}
.subj:hover{transform:translateY(-4px);border-color:var(--brand);
  box-shadow:0 18px 40px -16px var(--glow)}
.subj .ic{font-size:34px}
.subj .nm{font-weight:800;margin-top:10px;font-size:17px}
.subj .dc{font-size:13px;color:var(--muted);margin-top:3px}

/* 지역 칩 */
.region-tabs{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-bottom:26px}
.rt{font-size:14px;font-weight:700;padding:9px 16px;border-radius:999px;
  background:#fff;border:1px solid var(--line);cursor:pointer;transition:.18s}
.rt:hover,.rt.on{background:var(--brand);color:#fff;border-color:var(--brand)}
.region-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}
.region-list a{font-size:14px;padding:11px 14px;border-radius:12px;background:#fff;
  border:1px solid var(--line);color:var(--muted);font-weight:600;transition:.16s;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.region-list a:hover{color:var(--brand);border-color:var(--brand);background:#f5f8ff}

/* 피처 */
.feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
@media(max-width:860px){.feat-grid{grid-template-columns:1fr}}
.feat{background:var(--surface);border:1px solid var(--line);border-radius:20px;padding:30px}
.feat .ic{width:48px;height:48px;border-radius:14px;display:grid;place-items:center;
  font-size:22px;background:linear-gradient(135deg,#eef3ff,#f2effe);margin-bottom:16px}
.feat h3{font-size:19px;font-weight:800;letter-spacing:-.02em}
.feat p{color:var(--muted);font-size:15px;margin-top:8px}

/* 지역 페이지 히어로 */
.rhero{padding:64px 0 36px;position:relative;overflow:hidden}
.rhero::before{content:"";position:absolute;inset:0;
  background:radial-gradient(50% 60% at 80% 0%,rgba(47,107,255,.08),transparent 70%)}
.rhero-in{position:relative;z-index:1}
.crumb{font-size:13px;color:var(--muted);font-weight:600;margin-bottom:14px}
.crumb a:hover{color:var(--brand)}
.rhero h1{font-size:clamp(28px,5vw,44px);font-weight:900;letter-spacing:-.03em;line-height:1.12}
.rhero h1 .g{background:linear-gradient(100deg,var(--brand),var(--brand2));
  -webkit-background-clip:text;background-clip:text;color:transparent}
.rhero p{color:var(--muted);font-size:16px;margin-top:14px;max-width:620px}

/* 콘텐츠 박스 */
.cbox{background:var(--surface);border:1px solid var(--line);border-radius:20px;
  padding:30px;margin-top:18px}
.cbox h2{font-size:21px;font-weight:800;letter-spacing:-.02em;margin-bottom:10px}
.cbox h2:not(:first-child){margin-top:24px}
.cbox p{color:var(--muted);font-size:15.5px;margin-top:8px}
.cbox ul{margin:12px 0 0 2px;list-style:none}
.cbox li{padding-left:26px;position:relative;color:var(--muted);font-size:15.5px;margin-top:9px}
.cbox li::before{content:"";position:absolute;left:0;top:9px;width:14px;height:14px;
  border-radius:5px;background:linear-gradient(135deg,var(--brand),var(--brand2))}

/* 푸터 */
footer{border-top:1px solid var(--line);padding:48px 0 60px;margin-top:40px;background:#fff}
.foot-top{display:flex;justify-content:space-between;gap:30px;flex-wrap:wrap}
.foot-top .logo{font-size:17px}
.foot-links{display:flex;gap:22px;flex-wrap:wrap;font-size:14px;color:var(--muted);font-weight:600}
.foot-links a:hover{color:var(--brand)}
.foot-bot{margin-top:28px;padding-top:22px;border-top:1px solid var(--line);
  font-size:13px;color:var(--muted);display:flex;justify-content:space-between;gap:14px;flex-wrap:wrap}
.notice{font-size:12.5px;color:#9aa3b5;margin-top:14px}

/* 플로팅 CTA */
.fab{position:fixed;right:22px;bottom:22px;z-index:60;
  background:linear-gradient(100deg,var(--brand),var(--brand2));color:#fff;
  font-weight:800;font-size:15px;padding:15px 24px;border-radius:999px;border:none;cursor:pointer;
  box-shadow:0 14px 34px -10px var(--brand);transition:.2s;display:flex;align-items:center;gap:8px}
.fab:hover{transform:translateY(-2px) scale(1.02)}

/* 모달 */
.modal{position:fixed;inset:0;z-index:100;display:none;align-items:center;justify-content:center;
  background:rgba(11,16,32,.5);backdrop-filter:blur(4px);padding:20px}
.modal.open{display:flex}
.modal-card{background:#fff;border-radius:24px;max-width:460px;width:100%;padding:30px;
  box-shadow:0 30px 80px -20px rgba(11,16,32,.5);max-height:92vh;overflow:auto;animation:pop .25s ease}
@keyframes pop{from{transform:translateY(14px) scale(.98);opacity:0}to{transform:none;opacity:1}}
.modal-card h3{font-size:22px;font-weight:900;letter-spacing:-.02em}
.modal-card .ms{color:var(--muted);font-size:14px;margin-top:6px;margin-bottom:20px}
.field{margin-bottom:14px}
.field label{display:block;font-size:13px;font-weight:700;margin-bottom:6px}
.field input,.field select,.field textarea{width:100%;padding:12px 14px;border:1px solid var(--line);
  border-radius:12px;font-size:15px;font-family:inherit;background:#fbfcff;transition:.16s}
.field input:focus,.field select:focus,.field textarea:focus{outline:none;border-color:var(--brand);
  background:#fff;box-shadow:0 0 0 3px var(--glow)}
.field textarea{resize:vertical;min-height:80px}
.modal-x{position:absolute;top:18px;right:18px;font-size:22px;color:var(--muted);
  cursor:pointer;background:none;border:none;line-height:1}
.modal-card{position:relative}
.msg-ok{text-align:center;padding:20px 0}
.msg-ok .big{font-size:46px}
.msg-ok h3{margin-top:10px}

/* 썸네일 (지역+화상과외 오버레이) */
.thumb{position:relative;width:100%;aspect-ratio:1200/520;border-radius:20px;overflow:hidden;
  margin-top:8px;background:#dfe6f3}
.thumb img{width:100%;height:100%;object-fit:cover;display:block}
.thumb .ov{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;
  padding:30px;background:linear-gradient(180deg,rgba(11,16,32,.05),rgba(11,16,32,.72))}
.thumb .ov .kw{display:inline-block;align-self:flex-start;font-size:13px;font-weight:800;
  color:#fff;background:rgba(47,107,255,.9);padding:6px 13px;border-radius:999px;margin-bottom:12px}
.thumb .ov h2{color:#fff;font-size:clamp(24px,4.5vw,38px);font-weight:900;letter-spacing:-.03em;
  line-height:1.15;text-shadow:0 2px 14px rgba(0,0,0,.3)}

/* 본문 아티클 */
.article{background:var(--surface);border:1px solid var(--line);border-radius:20px;
  padding:34px;margin-top:20px}
.article h2{font-size:21px;font-weight:800;letter-spacing:-.02em;margin:26px 0 10px;
  padding-top:8px}
.article h2:first-child{margin-top:0}
.article p{color:#384256;font-size:15.5px;line-height:1.85;margin-top:10px}
.article blockquote{margin:12px 0;padding:14px 18px;background:#f5f8ff;border-left:3px solid var(--brand);
  border-radius:0 12px 12px 0;color:#4a5468;font-size:15px;font-style:italic}
.article .trial{margin-top:24px;padding:22px 24px;border-radius:16px;
  background:linear-gradient(120deg,#eef3ff,#f3effe);border:1px solid #e0e6fb;
  display:flex;flex-direction:column;gap:6px}
.article .trial strong{font-size:17px;font-weight:800;color:var(--brand2)}
.article .trial span{font-size:14.5px;color:#4a5468}

/* 날짜 메타 */
.datemeta{display:flex;gap:16px;flex-wrap:wrap;font-size:13px;color:var(--muted);
  margin-top:14px;font-weight:600}
.datemeta span b{color:#384256;font-weight:700}

/* ── 본문 시각 컴포넌트 ── */
/* 포인트 카드 3열 */
.pcards{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:22px 0}
@media(max-width:680px){.pcards{grid-template-columns:1fr}}
.pcard{background:#fff;border:1px solid var(--line);border-radius:16px;padding:22px 18px;text-align:center;
  transition:.2s}
.pcard:hover{transform:translateY(-3px);box-shadow:0 14px 30px -16px var(--glow);border-color:var(--brand)}
.pcard .ic{width:52px;height:52px;border-radius:15px;display:grid;place-items:center;font-size:26px;
  margin:0 auto 12px;background:linear-gradient(135deg,#eef3ff,#f2effe)}
.pcard b{display:block;font-size:16px;font-weight:800;letter-spacing:-.02em}
.pcard span{display:block;font-size:13.5px;color:var(--muted);margin-top:5px;line-height:1.5}

/* 숫자 통계 박스 */
.numbox{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:22px 0}
@media(max-width:680px){.numbox{grid-template-columns:repeat(2,1fr)}}
.numbox .nb{border-radius:16px;padding:20px 14px;text-align:center;color:#fff;
  background:linear-gradient(135deg,var(--brand),var(--brand2))}
.numbox .nb:nth-child(2){background:linear-gradient(135deg,#00b8d4,#00d4c8)}
.numbox .nb:nth-child(3){background:linear-gradient(135deg,#7c4dff,#b388ff)}
.numbox .nb:nth-child(4){background:linear-gradient(135deg,#ff7043,#ff9776)}
.numbox .nb .n{font-size:24px;font-weight:900;letter-spacing:-.02em}
.numbox .nb .l{font-size:12.5px;opacity:.92;margin-top:3px;font-weight:600}

/* 단계 (1·2·3) */
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:22px 0}
@media(max-width:680px){.steps{grid-template-columns:1fr}}
.step{position:relative;background:#fbfcff;border:1px solid var(--line);border-radius:16px;padding:24px 18px 20px}
.step .no{position:absolute;top:-12px;left:18px;width:32px;height:32px;border-radius:50%;
  background:linear-gradient(135deg,var(--brand),var(--brand2));color:#fff;font-weight:900;
  display:grid;place-items:center;font-size:15px;box-shadow:0 6px 14px -4px var(--brand)}
.step b{display:block;font-size:16px;font-weight:800;margin-top:8px}
.step span{display:block;font-size:14px;color:var(--muted);margin-top:6px;line-height:1.6}

/* 체크리스트 박스 */
.checkbox-list{background:linear-gradient(120deg,#f5f8ff,#f3effe);border:1px solid #e4eafd;
  border-radius:18px;padding:24px 26px;margin:22px 0}
.checkbox-list h3{font-size:17px;font-weight:800;margin-bottom:14px;display:flex;align-items:center;gap:8px}
.checkbox-list .ci{display:flex;align-items:flex-start;gap:11px;margin-top:11px;font-size:15px;color:#384256}
.checkbox-list .ci .ck{flex:0 0 22px;width:22px;height:22px;border-radius:7px;
  background:linear-gradient(135deg,var(--brand),var(--brand2));color:#fff;display:grid;place-items:center;
  font-size:13px;font-weight:900;margin-top:1px}

/* 강조 인용 (포인트) */
.highlight{margin:22px 0;padding:22px 24px;border-radius:16px;background:#fff;
  border:1px solid var(--line);border-left:5px solid var(--brand);
  font-size:16px;color:#2b3344;line-height:1.7;font-weight:600}
.highlight .em{color:var(--brand);font-weight:800}

/* 과목 배지 행 */
.subj-badges{display:flex;gap:8px;flex-wrap:wrap;margin:18px 0}
.subj-badges .sb{font-size:13.5px;font-weight:700;padding:8px 15px;border-radius:999px;
  background:#fff;border:1px solid var(--line);display:flex;align-items:center;gap:6px}

/* 구분선 (그라데이션) */
.divider{height:2px;border:0;margin:30px 0;
  background:linear-gradient(90deg,transparent,var(--line) 20%,var(--line) 80%,transparent)}

/* FAQ 아코디언 느낌 박스 */
.qa{border:1px solid var(--line);border-radius:14px;padding:18px 20px;margin-top:12px;background:#fff}
.qa .q{font-weight:800;font-size:15.5px;display:flex;gap:8px;align-items:flex-start}
.qa .q .qi{color:var(--brand);font-weight:900}
.qa .a{font-size:14.5px;color:var(--muted);margin-top:8px;line-height:1.7;padding-left:24px}

/* 비교 표 */
.compare{width:100%;border-collapse:separate;border-spacing:0;margin:22px 0;font-size:14.5px;
  border:1px solid var(--line);border-radius:16px;overflow:hidden}
.compare th,.compare td{padding:14px 16px;text-align:left;border-bottom:1px solid var(--line)}
.compare thead th{background:#f7f9fd;font-weight:800;font-size:14px}
.compare thead th:last-child{color:var(--brand)}
.compare tbody tr:last-child td{border-bottom:0}
.compare td:first-child{font-weight:700;color:#384256;background:#fbfcff}
.compare .x{color:#b4254a;font-weight:700}
.compare .o{color:var(--brand);font-weight:800}

/* 진행률 바 */
.progress-block{margin:22px 0;background:#fff;border:1px solid var(--line);border-radius:16px;padding:22px 24px}
.progress-block h3{font-size:16px;font-weight:800;margin-bottom:16px}
.pbar{margin-top:14px}
.pbar .lab{display:flex;justify-content:space-between;font-size:13.5px;font-weight:700;margin-bottom:6px}
.pbar .track{height:10px;background:#eef1f7;border-radius:99px;overflow:hidden}
.pbar .fill{height:100%;border-radius:99px;background:linear-gradient(90deg,var(--brand),var(--brand2))}
.pbar .fill.c2{background:linear-gradient(90deg,#00b8d4,#00d4c8)}
.pbar .fill.c3{background:linear-gradient(90deg,#7c4dff,#b388ff)}

/* 별점 평점 */
.rating-box{display:flex;align-items:center;gap:22px;flex-wrap:wrap;margin:22px 0;
  background:linear-gradient(120deg,#f7f9fd,#f3effe);border:1px solid #e4eafd;
  border-radius:18px;padding:24px 28px}
.rating-box .score{font-size:46px;font-weight:900;letter-spacing:-.03em;line-height:1;
  background:linear-gradient(135deg,var(--brand),var(--brand2));-webkit-background-clip:text;
  background-clip:text;color:transparent}
.rating-box .stars{font-size:20px;letter-spacing:2px}
.rating-box .meta{font-size:13.5px;color:var(--muted);margin-top:4px;font-weight:600}

/* 말풍선 후기 */
.testi{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin:22px 0}
@media(max-width:680px){.testi{grid-template-columns:1fr}}
.tcard{background:#fff;border:1px solid var(--line);border-radius:16px;padding:20px}
.tcard .top{display:flex;align-items:center;gap:11px;margin-bottom:11px}
.tcard .av{width:42px;height:42px;border-radius:50%;display:grid;place-items:center;
  font-size:18px;font-weight:800;color:#fff;background:linear-gradient(135deg,var(--brand),var(--brand2))}
.tcard .av.a2{background:linear-gradient(135deg,#00b8d4,#00d4c8)}
.tcard .av.a3{background:linear-gradient(135deg,#7c4dff,#b388ff)}
.tcard .av.a4{background:linear-gradient(135deg,#ff7043,#ff9776)}
.tcard .who b{font-size:14px;font-weight:800}
.tcard .who span{font-size:12.5px;color:var(--muted)}
.tcard .st{font-size:13px;color:#f5a623;margin-left:auto}
.tcard p{font-size:14px;color:#4a5468;line-height:1.65;margin:0}

/* 신뢰 배지 행 */
.trust-row{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:22px 0}
@media(max-width:680px){.trust-row{grid-template-columns:repeat(2,1fr)}}
.trust-row .tb{background:#fff;border:1px solid var(--line);border-radius:14px;padding:18px 12px;
  text-align:center}
.trust-row .tb .i{font-size:24px}
.trust-row .tb b{display:block;font-size:14px;font-weight:800;margin-top:8px}
.trust-row .tb span{display:block;font-size:12px;color:var(--muted);margin-top:3px}

/* 타임라인 */
.timeline{margin:22px 0;padding-left:8px}
.tl{position:relative;padding:0 0 22px 30px;border-left:2px solid var(--line)}
.tl:last-child{border-left:2px solid transparent;padding-bottom:0}
.tl::before{content:"";position:absolute;left:-7px;top:2px;width:12px;height:12px;border-radius:50%;
  background:var(--brand);box-shadow:0 0 0 4px var(--glow)}
.tl b{font-size:15px;font-weight:800}
.tl span{display:block;font-size:14px;color:var(--muted);margin-top:4px;line-height:1.6}

/* 정보 강조 카드 (아이콘+텍스트 가로) */
.infocard{display:flex;gap:16px;align-items:flex-start;background:#fff;border:1px solid var(--line);
  border-radius:16px;padding:20px 22px;margin:14px 0}
.infocard .ii{flex:0 0 46px;width:46px;height:46px;border-radius:13px;display:grid;place-items:center;
  font-size:22px;background:linear-gradient(135deg,#eef3ff,#f2effe)}
.infocard .tx b{font-size:15.5px;font-weight:800}
.infocard .tx p{font-size:14px;color:var(--muted);margin-top:5px;line-height:1.6}

/* 도넛 차트 행 */
.donuts{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:22px 0}
@media(max-width:680px){.donuts{grid-template-columns:1fr}}
.donut{background:#fff;border:1px solid var(--line);border-radius:16px;padding:22px;text-align:center}
.donut .ring{width:104px;height:104px;border-radius:50%;margin:0 auto 12px;display:grid;place-items:center;
  position:relative}
.donut .ring::before{content:"";position:absolute;inset:11px;border-radius:50%;background:#fff}
.donut .ring .v{position:relative;font-size:22px;font-weight:900;color:#2b3344}
.donut b{display:block;font-size:14px;font-weight:800}
.donut span{display:block;font-size:12.5px;color:var(--muted);margin-top:3px}

/* 선생님 프로필 샘플 */
.tutors{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:22px 0}
@media(max-width:680px){.tutors{grid-template-columns:1fr}}
.tutor{background:#fff;border:1px solid var(--line);border-radius:18px;padding:22px;text-align:center}
.tutor .ph{width:64px;height:64px;border-radius:50%;margin:0 auto 12px;display:grid;place-items:center;
  font-size:26px;color:#fff;background:linear-gradient(135deg,var(--brand),var(--brand2))}
.tutor .ph.t2{background:linear-gradient(135deg,#00b8d4,#00d4c8)}
.tutor .ph.t3{background:linear-gradient(135deg,#7c4dff,#b388ff)}
.tutor b{font-size:15px;font-weight:800}
.tutor .tag{font-size:12.5px;color:var(--brand);font-weight:700;margin-top:3px}
.tutor p{font-size:13px;color:var(--muted);margin-top:9px;line-height:1.55}
.tutor .stars{color:#f5a623;font-size:13px;margin-top:8px}

/* 시간표 그리드 */
.schedule{margin:22px 0;background:#fff;border:1px solid var(--line);border-radius:16px;padding:22px 24px}
.schedule h3{font-size:16px;font-weight:800;margin-bottom:14px}
.sgrid{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;font-size:12.5px}
.sgrid .d{text-align:center;font-weight:800;padding:8px 0;color:#384256}
.sgrid .c{text-align:center;padding:10px 0;border-radius:8px;background:#f0f4ff;color:var(--brand);font-weight:700}
.sgrid .c.off{background:#f4f5f8;color:#b8bfcc}

/* 인근 지역 링크 */
.nearby{margin:22px 0;background:linear-gradient(120deg,#f7f9fd,#f3effe);border:1px solid #e4eafd;
  border-radius:16px;padding:22px 24px}
.nearby h3{font-size:16px;font-weight:800;margin-bottom:12px}
.nearby .links{display:flex;gap:8px;flex-wrap:wrap}
.nearby .links a{font-size:13.5px;font-weight:700;padding:8px 14px;border-radius:999px;background:#fff;
  border:1px solid var(--line);color:#384256;transition:.16s}
.nearby .links a:hover{color:var(--brand);border-color:var(--brand)}

/* 중간 CTA 배너 */
.midcta{margin:24px 0;border-radius:20px;padding:30px;text-align:center;color:#fff;position:relative;
  overflow:hidden;background:linear-gradient(120deg,var(--brand),var(--brand2))}
.midcta::before{content:"";position:absolute;inset:0;opacity:.18;
  background-image:linear-gradient(rgba(255,255,255,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.4) 1px,transparent 1px);
  background-size:28px 28px}
.midcta .ct{position:relative}
.midcta h3{font-size:22px;font-weight:900;letter-spacing:-.02em}
.midcta p{font-size:14.5px;opacity:.95;margin-top:8px}
.midcta button{margin-top:18px;background:#fff;color:var(--brand);font-weight:800;font-size:15px;
  padding:13px 28px;border:none;border-radius:12px;cursor:pointer;transition:.2s}
.midcta button:hover{transform:translateY(-2px)}

/* 보장 박스 */
.guarantee{display:flex;gap:14px;align-items:center;margin:22px 0;background:#fff;
  border:1.5px dashed var(--brand);border-radius:16px;padding:20px 24px}
.guarantee .g-ic{font-size:34px}
.guarantee b{font-size:16px;font-weight:800}
.guarantee p{font-size:14px;color:var(--muted);margin-top:4px}

/* 비용/혜택 카드 */
.benefit{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin:22px 0}
@media(max-width:680px){.benefit{grid-template-columns:1fr}}
.bcard{background:#fff;border:1px solid var(--line);border-radius:16px;padding:20px 22px}
.bcard .h{display:flex;align-items:center;gap:9px;font-weight:800;font-size:15px}
.bcard .h .e{font-size:20px}
.bcard p{font-size:13.5px;color:var(--muted);margin-top:9px;line-height:1.6}
`;

// ─────────────────────────────────────────────────────────────
// 헤더 / 푸터 / 모달 / JS (공통)
// ─────────────────────────────────────────────────────────────
const HEADER = `
<header class="nav"><div class="wrap nav-in">
  <a href="/" class="logo"><span class="dot"></span>스터디<b>온라이브</b></a>
  <button class="nav-cta" onclick="openForm()">무료 상담 신청</button>
</div></header>`;

const FOOTER = `
<footer><div class="wrap">
  <div class="foot-top">
    <div>
      <a href="/" class="logo"><span class="dot"></span>스터디<b>온라이브</b></a>
      <p style="color:var(--muted);font-size:14px;margin-top:10px;max-width:300px">
        전국 어디서나 1:1 화상과외.<br>검증된 선생님과 실시간 온라인 수업으로 연결됩니다.</p>
    </div>
    <div class="foot-links">
      <a href="/seoul-gangnamgu-yeoksamdong">서울 화상과외</a>
      <a href="/gyeonggi-suwonsi-yeongtonggu-yeongtong1dong">경기 화상과외</a>
      <a href="#" onclick="openForm();return false">상담 문의</a>
    </div>
  </div>
  <div class="foot-bot">
    <span>© 2026 스터디온라이브 (studyonlive.com)</span>
    <span>전국 1:1 화상과외 매칭 플랫폼</span>
  </div>
  <p class="notice">⚠️ 본 사이트의 모든 콘텐츠는 정보 제공 목적이며, 학습 효과를 보장하지 않습니다.</p>
</div></footer>`;

const FORM_MODAL = `
<button class="fab" onclick="openForm()">💬 무료 상담</button>
<div class="modal" id="formModal" onclick="if(event.target===this)closeForm()">
  <div class="modal-card" id="modalCard">
    <button class="modal-x" onclick="closeForm()">×</button>
    <div id="formBody">
      <h3>무료 상담 신청</h3>
      <p class="ms">정보를 남겨주시면 빠르게 연락드립니다.</p>
      <div class="field"><label>학생 이름</label><input id="f_student" placeholder="홍길동"></div>
      <div class="field"><label>학년</label>
        <select id="f_grade">
          <option value="">선택</option>
          <optgroup label="초등"><option>초1</option><option>초2</option><option>초3</option><option>초4</option><option>초5</option><option>초6</option></optgroup>
          <optgroup label="중등"><option>중1</option><option>중2</option><option>중3</option></optgroup>
          <optgroup label="고등"><option>고1</option><option>고2</option><option>고3</option></optgroup>
          <option>기타</option>
        </select></div>
      <div class="field"><label>학부모 연락처</label><input id="f_phone" placeholder="010-0000-0000"></div>
      <div class="field"><label>주소 (지역)</label><input id="f_address" placeholder="예: 경기도 광명시"></div>
      <div class="field"><label>희망 과목</label>
        <select id="f_subject"><option value="">선택</option>
          <option>국어</option><option>영어</option><option>수학</option><option>사회</option><option>과학</option></select></div>
      <div class="field"><label>문의 내용</label><textarea id="f_message" placeholder="궁금한 점을 자유롭게 적어주세요."></textarea></div>
      <button class="btn btn-p" style="width:100%;justify-content:center" onclick="submitForm()" id="submitBtn">상담 신청하기</button>
    </div>
  </div>
</div>`;

const JS = `
function openForm(pre){
  document.getElementById('formModal').classList.add('open');
  if(pre){if(pre.address)document.getElementById('f_address').value=pre.address;
    if(pre.subject)document.getElementById('f_subject').value=pre.subject;}
}
function closeForm(){document.getElementById('formModal').classList.remove('open')}
async function submitForm(){
  var btn=document.getElementById('submitBtn');
  var d={
    student:val('f_student'),grade:val('f_grade'),phone:val('f_phone'),
    address:val('f_address'),subject:val('f_subject'),message:val('f_message'),
    page:location.pathname
  };
  if(!d.student||!d.phone){alert('학생 이름과 연락처는 필수입니다.');return;}
  btn.textContent='전송 중...';btn.disabled=true;
  try{
    await fetch('/api/inquiry',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(d)});
    document.getElementById('formBody').innerHTML=
      '<div class="msg-ok"><div class="big">✅</div><h3>신청이 완료되었습니다</h3>'+
      '<p class="ms">빠른 시일 내에 연락드리겠습니다. 감사합니다.</p>'+
      '<button class="btn btn-o" style="width:100%;justify-content:center" onclick="closeForm()">닫기</button></div>';
  }catch(e){btn.textContent='상담 신청하기';btn.disabled=false;alert('전송에 실패했습니다. 다시 시도해주세요.');}
}
function val(id){return document.getElementById(id).value.trim()}
function fillForm(addr,subj){openForm({address:addr,subject:subj})}
`;

// ─────────────────────────────────────────────────────────────
// 페이지: 메인
// ─────────────────────────────────────────────────────────────
function pageHome() {
  const subjCards = SUBJECTS.map(
    (s) =>
      `<div class="subj" onclick="openForm({subject:'${s.name}'})">
        <div class="ic">${s.icon}</div><div class="nm">${s.name}</div>
        <div class="dc">화상과외</div></div>`
  ).join("");

  // 시도 탭 + 대표 지역 일부
  const tabs = SIDO_LIST.map(
    (s, i) => `<button class="rt${i === 0 ? " on" : ""}" data-sido="${s.slug}" onclick="showSido('${s.slug}',this)">${s.name}</button>`
  ).join("");

  // 시도별 지역 리스트 (각 시도 최대 18개)
  const lists = SIDO_LIST.map((sd) => {
    const items = regions
      .filter((r) => r.slug.startsWith(sd.slug + "-"))
      .slice(0, 18)
      .map((r) => `<a href="/${r.slug}">${shortName(r.name)}</a>`)
      .join("");
    return `<div class="region-list rl" data-sido="${sd.slug}" ${sd.slug === "seoul" ? "" : 'style="display:none"'}>${items}</div>`;
  }).join("");

  const body = `
  <section class="hero"><div class="grid-bg"></div><div class="wrap hero-in">
    <span class="badge"><span class="live"></span>실시간 1:1 화상수업</span>
    <h1>집에서 만나는<br><span class="g">최고의 1:1 화상과외</span></h1>
    <p class="sub">${SITE.desc}</p>
    <div class="hero-cta">
      <button class="btn btn-p" onclick="openForm()">무료 상담 신청 →</button>
      <a class="btn btn-o" href="#regions">지역별 과외 찾기</a>
    </div>
    <div class="stats">
      <div class="stat"><div class="n">전국</div><div class="l">모든 지역 매칭</div></div>
      <div class="stat"><div class="n">1:1</div><div class="l">맞춤 화상수업</div></div>
      <div class="stat"><div class="n">5과목</div><div class="l">국·영·수·사·과</div></div>
    </div>
  </div></section>

  <section><div class="wrap">
    <div class="sec-head"><div class="k">SUBJECTS</div><h2>과목별 화상과외</h2>
      <p>원하는 과목을 선택하고 바로 상담받으세요</p></div>
    <div class="subj-grid">${subjCards}</div>
  </div></section>

  <section style="background:#fff;border-top:1px solid var(--line);border-bottom:1px solid var(--line)"><div class="wrap">
    <div class="sec-head"><div class="k">WHY ONLIVE</div><h2>왜 화상과외인가</h2>
      <p>오프라인보다 똑똑한 온라인 1:1 수업</p></div>
    <div class="feat-grid">
      <div class="feat"><div class="ic">🌍</div><h3>지역 제한 없음</h3>
        <p>전국 어디서나 우리 동네 밖 검증된 선생님과 연결됩니다. 이동 시간 0분.</p></div>
      <div class="feat"><div class="ic">🎥</div><h3>실시간 화상수업</h3>
        <p>화면 공유와 디지털 판서로 대면 수업과 동일한 몰입도를 제공합니다.</p></div>
      <div class="feat"><div class="ic">💸</div><h3>합리적인 비용</h3>
        <p>교통비·이동 부담 없이 1:1 맞춤 수업을 더 합리적인 가격에 받으세요.</p></div>
    </div>
  </div></section>

  <section id="regions"><div class="wrap">
    <div class="sec-head"><div class="k">REGIONS</div><h2>지역별 화상과외</h2>
      <p>우리 동네를 선택하면 맞춤 페이지로 이동합니다</p></div>
    <div class="region-tabs">${tabs}</div>
    ${lists}
  </div></section>

  <script>
  function showSido(slug,btn){
    document.querySelectorAll('.rt').forEach(function(b){b.classList.remove('on')});
    btn.classList.add('on');
    document.querySelectorAll('.rl').forEach(function(l){
      l.style.display=(l.dataset.sido===slug)?'grid':'none';});
  }
  </script>`;

  return layout({
    title: `${SITE.name} - 전국 1:1 화상과외 매칭 플랫폼`,
    desc: SITE.desc,
    canonical: `https://${SITE.domain}/`,
    body,
  });
}

// ─────────────────────────────────────────────────────────────
// 페이지: 지역 (과목 선택)
// ─────────────────────────────────────────────────────────────
function pageRegion(r) {
  const sn = shortName(r.name);
  const subjCards = SUBJECTS.map(
    (s) =>
      `<a class="subj" href="/${r.slug}/${s.slug}">
        <div class="ic">${s.icon}</div><div class="nm">${s.name}</div>
        <div class="dc">${sn} 화상과외</div></a>`
  ).join("");

  const body = `
  <section class="rhero"><div class="wrap rhero-in">
    <div class="crumb"><a href="/">홈</a> › ${r.name}</div>
    <h1>${sn} <span class="g">화상과외</span></h1>
    <p>${r.name} 학생을 위한 1:1 온라인 화상과외. 집에서 검증된 선생님과 실시간 수업을 시작하세요. 원하는 과목을 선택해 무료 상담을 받아보세요.</p>
    <div class="hero-cta" style="justify-content:flex-start">
      <button class="btn btn-p" onclick="openForm({address:'${r.name}'})">무료 상담 신청 →</button>
    </div>
  </div></section>

  <section style="padding-top:20px"><div class="wrap">
    <div class="sec-head"><div class="k">SUBJECTS</div><h2>${sn} 과목별 화상과외</h2></div>
    <div class="subj-grid">${subjCards}</div>
  </div></section>

  <section><div class="wrap">
    <div class="cbox">
      <h2>${sn} 화상과외, 이래서 좋습니다</h2>
      <p>${r.name} 지역 학생이라면 이제 학원이나 방문 과외를 찾아 멀리 나갈 필요가 없습니다. 화상과외는 집에서 1:1로 진행되어 이동 시간이 들지 않고, 거주 지역에 관계없이 전국의 우수한 선생님과 매칭될 수 있습니다.</p>
      <ul>
        <li>${sn} 거주 학생 맞춤 1:1 실시간 화상수업</li>
        <li>국어·영어·수학·사회·과학 전 과목 대응</li>
        <li>초등·중등·고등 학년별 맞춤 커리큘럼</li>
        <li>이동 시간 없이 집에서 바로 수업 시작</li>
      </ul>
      <h2>상담은 어떻게 진행되나요?</h2>
      <p>무료 상담 신청 후 학생의 학년, 과목, 학습 목표를 확인하여 가장 적합한 선생님을 매칭해 드립니다. 부담 없이 먼저 상담을 신청해 보세요.</p>
    </div>
  </div></section>`;

  return layout({
    title: `${sn} 화상과외 | ${SITE.name}`,
    desc: `${r.name} 1:1 화상과외 매칭. 국·영·수·사·과 전과목 온라인 수업, 집에서 검증된 선생님과 실시간 1:1 과외. 무료 상담 신청.`,
    canonical: `https://${SITE.domain}/${r.slug}`,
    body,
  });
}

// ─────────────────────────────────────────────────────────────
// 페이지: 지역 + 과목 (최종 랜딩)
// ─────────────────────────────────────────────────────────────
function pageRegionSubject(r, s) {
  const sn = shortName(r.name);
  const others = SUBJECTS.filter((x) => x.slug !== s.slug)
    .map((x) => `<a class="rt" href="/${r.slug}/${x.slug}">${x.icon} ${x.name}</a>`)
    .join("");

  // 인근 지역: 같은 시군구(슬러그 앞부분 공유)의 다른 동 최대 8개
  const prefix = r.slug.split("-").slice(0, -1).join("-");
  const nearbyLinks = regions
    .filter((x) => x.slug !== r.slug && x.slug.startsWith(prefix + "-"))
    .slice(0, 8)
    .map((x) => ({ slug: x.slug, label: x.dong }));

  // 본문 + 날짜 생성
  const { html: articleHtml, dates } = buildContent(r.name, sn, s.name, r.slug, s.slug, nearbyLinks);
  // 썸네일 이미지 (지역+과목별 고정)
  const thumbUrl = imgFor(r.slug, s.slug);

  const body = `
  <section class="rhero"><div class="wrap rhero-in">
    <div class="crumb"><a href="/">홈</a> › <a href="/${r.slug}">${sn}</a> › ${s.name} 화상과외</div>
    <h1>${sn} ${s.name} <span class="g">화상과외</span></h1>
    <p>${r.name} 학생을 위한 1:1 ${s.name} 온라인 화상과외. 검증된 ${s.name} 선생님과 집에서 실시간으로 수업하세요.</p>
    <div class="datemeta">
      <span>발행일 <b>${dates.published}</b></span>
      <span>최종수정일 <b>${dates.modified}</b></span>
    </div>
    <div class="hero-cta" style="justify-content:flex-start">
      <button class="btn btn-p" onclick="openForm({address:'${r.name}',subject:'${s.name}'})">${s.name} 무료 상담 →</button>
    </div>
  </div></section>

  <section style="padding-top:16px"><div class="wrap">
    <div class="thumb">
      <img src="${thumbUrl}" alt="${sn} ${s.name} 화상과외" loading="lazy">
      <div class="ov"><span class="kw">${sn} 화상과외</span>
        <h2>${sn} ${s.name}<br>1:1 화상과외</h2></div>
    </div>

    <div class="article">${articleHtml}</div>

    <div style="text-align:center;margin-top:26px">
      <button class="btn btn-p" onclick="openForm({address:'${r.name}',subject:'${s.name}'})">지금 ${s.name} 무료 상담 신청하기 →</button>
    </div>

    <div style="margin-top:30px">
      <div class="sec-head" style="margin-bottom:16px"><h2 style="font-size:20px">${sn} 다른 과목 화상과외</h2></div>
      <div class="region-tabs" style="justify-content:flex-start">${others}</div>
    </div>
  </div></section>`;

  return layout({
    title: `${sn} ${s.name} 화상과외 | ${SITE.name}`,
    desc: `${r.name} ${s.name} 1:1 화상과외. 집에서 검증된 ${s.name} 선생님과 실시간 온라인 수업. 초·중·고 맞춤, 무료 상담 신청.`,
    canonical: `https://${SITE.domain}/${r.slug}/${s.slug}`,
    body,
    image: thumbUrl,
  });
}

// ─────────────────────────────────────────────────────────────
// 404
// ─────────────────────────────────────────────────────────────
function page404() {
  const body = `
  <section class="hero" style="padding:120px 0"><div class="wrap hero-in">
    <h1 style="font-size:80px">404</h1>
    <p class="sub">요청하신 페이지를 찾을 수 없습니다.</p>
    <div class="hero-cta"><a class="btn btn-p" href="/">홈으로 돌아가기 →</a></div>
  </div></section>`;
  return layout({
    title: `페이지를 찾을 수 없습니다 | ${SITE.name}`,
    desc: SITE.desc,
    canonical: `https://${SITE.domain}/`,
    body,
  });
}

// ─────────────────────────────────────────────────────────────
// 유틸: 풀네임 → 짧은 표기 (마지막 1~2토큰)
// ─────────────────────────────────────────────────────────────
function shortName(full) {
  const t = full.split(" ");
  if (t.length >= 2) return t.slice(-2).join(" ");
  return full;
}
