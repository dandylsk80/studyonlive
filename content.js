// content.js — 지역+과목별 SEO 본문 생성 (대형 문장풀, 5000자급, 유사도 최소화)
function hash(str){let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}
function rng(seed){let a=seed>>>0;return function(){a|=0;a=(a+0x6d2b79f5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}
function pick(arr,rand){return arr[Math.floor(rand()*arr.length)];}
function shuffle(arr,rand){const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(rand()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function pickN(arr,n,rand){return shuffle(arr,rand).slice(0,Math.min(n,arr.length));}

const POOL={
intro:[
"{지역} 학생과 학부모님이라면 한 번쯤 화상과외를 고민해 보셨을 겁니다. 학원 이동 시간이 부담스럽거나, 우리 동네에 마땅한 {과목} 선생님을 찾기 어려운 경우가 많기 때문입니다.",
"요즘 {지역}에서도 화상과외에 대한 관심이 부쩍 높아지고 있습니다. 집에서 1:1로 {과목}을 배울 수 있다는 점이 가장 큰 이유입니다.",
"{지역}에 거주하는 학생에게 화상과외는 더 이상 낯선 선택지가 아닙니다. 실시간 온라인 수업 환경이 빠르게 자리 잡았기 때문입니다.",
"{과목} 성적 때문에 고민이신 {지역} 학부모님께 화상과외는 현실적인 대안이 됩니다.",
"맞벌이 가정이 많은 {지역}에서는 아이를 학원에 데려다주는 일조차 쉽지 않습니다. 화상과외는 그 고민을 덜어 줍니다.",
"{지역}에서 {과목}을 잘 가르치는 선생님을 수소문해 보신 분들은 아실 겁니다. 좋은 선생님은 대기가 길고 시간표 맞추기도 어렵습니다.",
"온라인 학습이 보편화되면서 {지역} 학생들 사이에서도 화상과외가 자연스러운 선택이 되었습니다.",
"‘{지역} {과목}과외’를 검색하다 이 글을 보고 계신다면 이미 화상과외를 진지하게 고려하고 계신 것일 테죠.",
"학원 셔틀 시간에 쫓기던 {지역} 가정들이 요즘은 화상과외로 눈을 돌리고 있습니다.",
"{지역} 일대에서 {과목} 사교육을 알아보다 막히는 지점이 바로 ‘선생님 풀’입니다. 화상과외는 여기서 답을 줍니다.",
"방과 후 {과목} 학습을 어떻게 채울지 고민이라면, {지역} 밖으로 시야를 넓힐 때가 됐는지도 모릅니다.",
"우리 동네에 좋은 {과목} 학원이 없다는 건 {지역} 학부모님들의 오랜 고민이었습니다.",
"{지역} 학생들의 {과목} 학습 환경은 화상과외의 등장으로 크게 달라지고 있습니다.",
"교육열은 높은데 선택지는 적은 {지역} 같은 곳에서 화상과외의 가치는 더 빛납니다.",
"‘집에서 제대로 된 {과목} 수업이 될까?’ 하는 의문에서 출발하는 분이 많지만, 결론은 대체로 긍정적입니다.",
"{지역}에서 통학 거리가 멀어 학원을 포기했던 학생도 화상과외로 {과목}을 이어갑니다.",
"바쁜 {지역} 가정일수록 시간을 아껴 주는 화상과외의 장점이 크게 다가옵니다.",
"한 번 검색으로 끝낼 일이 아니라면, {과목} 화상과외의 구조를 차근히 살펴볼 가치가 있습니다.",
],
why:[
"화상과외의 가장 큰 장점은 지역의 한계를 넘는다는 데 있습니다. {지역}에 매이지 않고 전국의 {과목} 선생님 중 맞는 분을 고를 수 있습니다.",
"오프라인 과외는 가까운 동네 선생님으로 선택지가 좁아집니다. 화상과외는 {지역} 밖 실력 있는 {과목} 선생님까지 연결합니다.",
"{지역}에서 {과목} 과외를 찾을 때 가장 아쉬운 점은 선택지 부족입니다. 화상수업이 이를 해결합니다.",
"이동 시간이 사라집니다. {지역} 학생이 학원을 오가던 시간을 그대로 {과목} 공부에 쓸 수 있습니다.",
"비용도 합리적입니다. 교통비와 시간 비용이 빠져 같은 예산으로 더 알찬 {과목} 수업이 가능합니다.",
"아이 안전을 걱정하는 {지역} 학부모님께도 안심입니다. 밤길 걱정이 없으니까요.",
"선택의 폭이 넓어집니다. {과목}을 어떻게 가르치는 선생님이 좋은지 직접 비교할 수 있습니다.",
"날씨나 교통에 영향받지 않습니다. {지역}에 폭설이 와도 {과목} 수업은 예정대로 진행됩니다.",
"형제·자매가 시간차로 같은 선생님께 {과목}을 배우는 등 가정 단위 활용도 쉽습니다.",
"갑작스러운 일정 변경에도 유연합니다. {지역} 밖 이동이 없으니 시간 조정이 수월합니다.",
"전학이나 이사로 {지역}을 떠나도 같은 선생님과 {과목} 수업을 이어갈 수 있습니다.",
"학생이 편안한 집 환경에서 배우기 때문에 긴장이 덜하다는 점도 장점입니다.",
"오프라인보다 수업 기록이 잘 남아 {과목} 복습이 체계적입니다.",
"검증되지 않은 동네 정보에 의존하지 않고, 다양한 {과목} 선생님을 폭넓게 검토할 수 있습니다.",
"수업료 외에 들어가는 부대 비용이 적어 장기적으로 부담이 덜합니다.",
"같은 시간에 더 깊이 있는 {과목} 학습이 가능해 시간 대비 효율이 높습니다.",
"화상이라는 이유로 수업의 질이 떨어지지 않는다는 점을 직접 확인하는 분이 많습니다.",
"{지역} 안에서만 찾던 시야를 전국으로 넓히는 것만으로 선택의 질이 달라집니다.",
],
how:[
"수업은 화면 공유와 실시간 판서로 진행됩니다. 선생님이 풀이 과정을 직접 써가며 설명해 집중도가 높습니다.",
"디지털 화이트보드, 화면 공유, 자료 첨부가 활용됩니다. {과목} 특성에 맞춘 설명이 실시간으로 오갑니다.",
"일방적 강의가 아닙니다. {과목} 수업 중 바로 질문하고 선생님이 즉시 화면에 풀어주는 양방향 방식입니다.",
"노트북이나 태블릿만 있으면 충분합니다. {지역} 어디서든 접속해 1:1 {과목} 수업을 받습니다.",
"수업 중 판서와 자료를 저장해 복습에 씁니다. {과목}처럼 반복이 중요한 과목에 유용합니다.",
"카메라로 학생 반응을 살피며 진도를 조절합니다. 진도만 빼는 수업과 다릅니다.",
"필요하면 녹화해 다시 볼 수 있습니다. 놓친 {과목} 설명을 재확인할 수 있습니다.",
"태블릿 펜으로 학생이 직접 풀이를 적고 선생님이 즉시 첨삭하는 방식도 가능합니다.",
"수업 전 예습 자료, 수업 후 과제를 온라인으로 주고받아 {과목} 학습이 끊기지 않습니다.",
"화면이 또렷하고 음성이 깨끗해, 대면 못지않게 {과목} 개념 전달이 잘 됩니다.",
"PDF 교재나 문제집을 화면에 띄워 함께 보며 {과목} 문제를 풉니다.",
"수업 분위기는 선생님 성향에 따라 다양해, 학생에게 맞는 {과목} 수업 스타일을 고를 수 있습니다.",
"채팅과 음성, 화면 주석을 함께 쓰며 {과목} 설명을 입체적으로 전달합니다.",
"학생이 푼 풀이를 사진으로 올리면 선생님이 바로 첨삭하는 방식도 자주 씁니다.",
"수업 시작 전 간단한 점검으로 지난 {과목} 내용을 복기하고 들어갑니다.",
],
curriculum:[
"커리큘럼은 학교 진도와 교재를 기준으로 설계됩니다. {과목}은 내신 대비와 개념 정리를 병행합니다.",
"{과목} 수업은 실력 진단에서 시작합니다. 부족한 단원을 짚고 시험 범위와 연계합니다.",
"초·중·고 학년에 따라 접근이 다릅니다. 기초가 필요하면 개념부터, 심화가 필요하면 응용 중심입니다.",
"학교별 출제 경향까지 고려해 {과목} 수업을 구성합니다. 왜 틀렸는지 이해시키는 데 중점을 둡니다.",
"시험 기간엔 내신 대비로 전환해 {지역} 각 학교 기출과 범위에 맞춰 점검합니다.",
"{과목} 빈틈을 메우는 데서 그치지 않고 스스로 공부하는 방법까지 잡아갑니다.",
"상위 학년 {과목} 과정까지 내다보며 지금의 기초가 다음으로 이어지게 설계합니다.",
"오답 노트와 약점 분석을 통해 {과목}에서 반복되는 실수를 줄여 나갑니다.",
"단원별 목표를 정해 두고 {과목} 진도를 점검하며, 필요하면 보충 수업을 더합니다.",
"학생의 학습 속도에 맞춰 {과목} 진도를 빠르게도, 천천히도 조절합니다.",
"수능·모의고사를 염두에 둔 학생에게는 {과목} 기출 분석 중심으로 방향을 잡습니다.",
"방학에는 다음 학기 {과목} 선행을, 학기 중에는 내신을 챙기는 식으로 시기별 전략을 씁니다.",
"학생이 어려워하는 단원은 속도를 늦춰 {과목} 기본기를 확실히 다집니다.",
"문제 유형별로 접근법을 정리해 {과목} 시험에서 시간을 아낄 수 있게 합니다.",
"매 수업 마무리에 그날 배운 {과목} 핵심을 한 번 더 정리하고 끝냅니다.",
],
trust:[
"선생님 매칭은 무료 상담으로 이루어집니다. 성향과 목표를 파악해 {지역} 학생에게 맞는 {과목} 선생님을 연결합니다.",
"상담에서 학습 목표와 수준을 확인합니다. 그래야 {과목}에서 성과를 낼 선생님을 매칭할 수 있습니다.",
"무작정 배정하지 않습니다. {지역} 학생 한 명 한 명에 맞춰 {과목} 스타일이 맞는 선생님을 연결합니다.",
"매칭 후에도 수업이 맞는지 점검합니다. {과목} 방향이 안 맞으면 조정 가능합니다.",
"전공과 경력, 가르치는 스타일을 종합 고려합니다. {과목}을 아는 것과 가르치는 것은 다릅니다.",
"학생과 선생님의 궁합을 가장 중요하게 봅니다. 결이 맞아야 {과목} 성과로 이어집니다.",
"첫 수업 후 피드백을 받아 {과목} 수업 방향을 함께 다듬습니다.",
"학부모님과 정기적으로 소통하며 {과목} 학습 상황을 공유합니다.",
"수업 태도와 과제 수행까지 살펴 {과목} 학습이 제대로 굴러가는지 확인합니다.",
"단순히 가르치는 사람이 아니라 학생의 {과목} 학습을 함께 책임지는 파트너를 지향합니다.",
"선생님 변경 요청에도 유연하게 대응해 {과목} 수업 만족도를 우선합니다.",
"학생의 목표 시점과 수준에 따라 {과목} 선생님 유형을 다르게 추천합니다.",
"첫 매칭이 끝이 아니라 시작이라는 마음으로 {과목} 수업을 함께 관리합니다.",
],
faq:[
"화상수업이 우리 아이에게 맞을까 하는 걱정은 자연스럽습니다. 30분 무료 테스트로 먼저 확인해 보세요.",
"장비가 부담이라는 분도 계신데 {과목} 화상수업은 노트북이나 태블릿 한 대면 충분합니다.",
"집에서 집중이 될까 걱정되신다면 1:1이라 오히려 한눈팔 틈이 없다는 점을 떠올려 보세요.",
"수업 시간은 학생 일정에 맞춰 조율됩니다. {지역} 학교·학원 일정과 겹치지 않게 정합니다.",
"과목 변경·추가도 유연합니다. {과목} 외 다른 과목 상담도 함께 가능합니다.",
"수업 요일과 횟수는 가정 상황에 맞춰 정하며, 중간에 바꾸는 것도 어렵지 않습니다.",
"인터넷 환경만 안정적이면 {지역} 어디서든 {과목} 수업에 문제가 없습니다.",
"맞지 않으면 선생님을 다시 매칭할 수 있으니 첫 시작의 부담이 적습니다.",
],
closing:[
"{지역}에서 {과목} 화상과외를 고민 중이시라면 먼저 무료 상담을 신청해 보세요. 30분 무료 체험으로 확인하실 수 있습니다.",
"지금 {지역} {과목} 화상과외 무료 상담을 신청하시면 30분 무료 테스트 수업을 받으실 수 있습니다.",
"고민만 하기보다 한 번 경험해 보세요. {과목} 30분 무료 체험으로 우리 아이에게 맞는지 확인할 수 있습니다.",
"{지역} 학생을 위한 {과목} 화상과외, 무료 상담과 30분 무료 테스트로 시작하실 수 있습니다.",
"늦었다고 생각할 때가 시작하기 좋은 때입니다. {지역} {과목} 화상과외 상담을 신청해 보세요.",
"작은 변화가 큰 차이를 만듭니다. {과목} 무료 체험으로 첫걸음을 떼어 보세요.",
],
};
const EXTRA=[
"특히 {지역} 학생들은 학교 진도와 시험 일정에 맞춘 수업을 선호해 이 부분을 세심히 반영합니다.",
"{과목}은 꾸준함이 중요한 만큼 주 1~2회 정기 수업으로 리듬을 잡는 것을 권합니다.",
"학생이 스스로 이해했다는 느낌을 받는 것이 중요하며 1:1 화상수업은 그 점에서 강합니다.",
"{지역}처럼 학원가 접근이 번거로운 곳일수록 화상과외 효율이 크게 체감됩니다.",
"결과는 학생마다 다르지만 맞는 방식으로 공부할 때 변화가 시작됩니다.",
"처음 한두 달은 적응 기간으로 보고 조급해하지 않는 것이 {과목} 학습에 중요합니다.",
"수업 사이의 과제와 복습이 실제 {과목} 성적 변화를 좌우합니다.",
"상담하다 보면 결국 아이가 즐겁게 공부하느냐가 가장 큰 관심사임을 느낍니다.",
"{지역} 학부모님들은 무엇보다 꾸준한 소통을 원하시는 경우가 많습니다.",
"{과목} 학습은 단기 성적보다 습관을 만드는 과정이라는 점을 늘 염두에 둡니다.",
"작은 성취를 자주 경험하게 해주는 것이 {과목} 자신감 회복의 출발점입니다.",
"{지역} 학생들의 생활 패턴을 고려해 수업 시간대를 탄력적으로 운영합니다.",
"한 번 이해한 내용을 다시 설명해 보게 하는 방식으로 {과목} 개념을 다집니다.",
"무리한 선행보다 지금 학년의 {과목}을 탄탄히 하는 것을 우선합니다.",
"질문을 부끄러워하지 않는 분위기를 만드는 것이 {과목} 향상의 핵심입니다.",
"학생의 작은 변화도 학부모님과 공유하며 함께 동기를 만들어 갑니다.",
"{과목}에 대한 거부감을 줄이는 것부터가 진짜 시작인 경우가 많습니다.",
"수업 외 시간에도 궁금증을 남겨두지 않도록 피드백 채널을 열어 둡니다.",
"{지역}의 학사 일정과 시험 주기를 함께 챙기며 {과목} 계획을 세웁니다.",
"눈높이에 맞춘 설명이 결국 {과목} 성적을 바꾸는 가장 빠른 길입니다.",
];
const REVIEWS=[
"처음엔 화상수업이 집중이 될까 걱정했는데 선생님이 화면에 직접 풀어주셔서 이해가 잘 됐다는 이야기를 많이 듣습니다.",
"이동 시간이 없어 저녁 시간을 여유 있게 쓰게 됐다는 후기가 많습니다.",
"모르는 부분을 그때그때 질문할 수 있어 좋았다는 반응이 자주 들어옵니다.",
"지역에 좋은 선생님이 없어 고민이었는데 화상으로 잘 맞는 분을 만나 다행이라는 가정이 많습니다.",
"낯을 가리는 아이도 1:1이라 부담이 적었다는 의견이 있었습니다.",
"꾸준히 같은 선생님과 수업하며 공부 습관이 잡혔다는 후기를 종종 받습니다.",
"무료 체험으로 분위기를 본 뒤 결정해 만족도가 높았다는 이야기가 많습니다.",
"성적보다 공부를 대하는 태도가 달라진 게 가장 좋았다는 후기도 있었습니다.",
"형제가 함께 같은 방식으로 시작했다는 가정도 있었습니다.",
"바쁜 일정에도 수업을 꾸준히 이어갈 수 있어 좋았다는 의견이 있습니다.",
];

function getDates(seed){
  const now=new Date();const ms15=15*24*60*60*1000;
  const period=Math.floor(now.getTime()/ms15);
  const offset=(seed%14)*24*60*60*1000;
  const modified=new Date(period*ms15-offset);
  const back=(60+(seed%120))*24*60*60*1000;
  const published=new Date(modified.getTime()-back);
  const iso=(d)=>d.toISOString().slice(0,10);
  const fmt=(d)=>`${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,"0")}.${String(d.getDate()).padStart(2,"0")}`;
  return{published:fmt(published),modified:fmt(modified),publishedISO:iso(published),modifiedISO:iso(modified)};
}

export function buildContent(regionName,shortRegion,subjectName,slug,subjSlug,nearbyLinks){
  const seed=hash(slug+"|"+subjectName);const rand=rng(seed);
  const sub=(t)=>t.replaceAll("{지역}",shortRegion).replaceAll("{과목}",subjectName);
  const TITLES={
    intro:[`${shortRegion} ${subjectName} 화상과외, 왜 선택할까요?`,`${shortRegion}에서 ${subjectName} 화상과외를 찾고 계신가요?`,`${shortRegion} ${subjectName} 화상과외 시작 전에`,`${shortRegion} ${subjectName} 과외, 화상으로 바뀌고 있습니다`],
    why:[`지역을 넘어서는 ${subjectName} 선생님 매칭`,`${shortRegion} 화상과외의 강점`,`왜 ${shortRegion} 학생에게 화상과외가 맞을까`,`${shortRegion}에서 화상과외가 답인 이유`],
    how:[`${subjectName} 화상수업 진행 방식`,`실시간 1:1 ${subjectName} 수업은 이렇게`,`${shortRegion} 화상과외 수업 방법`,`${subjectName} 온라인 수업, 실제로 어떻게 할까`],
    curriculum:[`학년별 맞춤 ${subjectName} 커리큘럼`,`${shortRegion} 학생을 위한 ${subjectName} 학습 설계`,`${subjectName} 내신·기초·심화 과정`,`${subjectName} 커리큘럼은 이렇게 짭니다`],
    trust:[`검증된 선생님, 신중한 매칭`,`${shortRegion} ${subjectName} 선생님 매칭 방식`,`우리 아이에게 맞는 선생님 찾기`,`선생님은 이렇게 정해집니다`],
    faq:[`${shortRegion} 화상과외 자주 묻는 질문`,`시작 전 궁금한 점들`,`${subjectName} 화상과외 Q&A`,`자주 받는 질문 모음`],
    closing:[`${shortRegion} ${subjectName} 화상과외, 지금 시작하세요`,`무료 상담으로 먼저 경험해 보세요`,`${shortRegion} ${subjectName} 무료 체험 안내`,`첫 수업, 무료로 시작하세요`],
  };

  // ── 시각 블록들 ──
  const VIS={
    pcards:`<div class="pcards">
      <div class="pcard"><div class="ic">🏠</div><b>이동시간 0분</b><span>집에서 바로 ${subjectName} 수업, 학원 갈 필요 없어요</span></div>
      <div class="pcard"><div class="ic">🎯</div><b>1:1 맞춤</b><span>${shortRegion} 학생 수준에 딱 맞춘 개별 수업</span></div>
      <div class="pcard"><div class="ic">🌍</div><b>전국 매칭</b><span>지역 제한 없이 검증된 ${subjectName} 선생님 연결</span></div>
    </div>`,
    numbox:`<div class="numbox">
      <div class="nb"><div class="n">1:1</div><div class="l">맞춤 화상수업</div></div>
      <div class="nb"><div class="n">30분</div><div class="l">무료 체험</div></div>
      <div class="nb"><div class="n">5과목</div><div class="l">국·영·수·사·과</div></div>
      <div class="nb"><div class="n">전국</div><div class="l">선생님 매칭</div></div>
    </div>`,
    steps:`<div class="steps">
      <div class="step"><div class="no">1</div><b>무료 상담 신청</b><span>학생 학년·과목·목표를 알려주세요</span></div>
      <div class="step"><div class="no">2</div><b>선생님 매칭</b><span>${shortRegion} 학생에게 맞는 ${subjectName} 선생님 연결</span></div>
      <div class="step"><div class="no">3</div><b>30분 무료 수업</b><span>직접 체험하고 결정하세요</span></div>
    </div>`,
    check:`<div class="checkbox-list"><h3>✅ ${shortRegion} ${subjectName} 화상과외, 이런 학생에게 좋아요</h3>
      <div class="ci"><span class="ck">✓</span><span>학원 이동 시간이 아까운 학생</span></div>
      <div class="ci"><span class="ck">✓</span><span>우리 동네에 좋은 ${subjectName} 선생님이 없는 경우</span></div>
      <div class="ci"><span class="ck">✓</span><span>1:1로 집중 관리받고 싶은 학생</span></div>
      <div class="ci"><span class="ck">✓</span><span>내 수준에 맞춰 천천히 또는 빠르게 배우고 싶은 학생</span></div>
    </div>`,
    highlight:`<div class="highlight">💡 <span class="em">${shortRegion}</span>에서도 이제 전국의 우수한 <span class="em">${subjectName} 선생님</span>과 집에서 1:1로 만날 수 있습니다. 이동 시간 없이, 우리 아이 수준에 딱 맞는 수업을 받아보세요.</div>`,
    badges:`<div class="subj-badges">
      <span class="sb">✍️ 국어</span><span class="sb">📖 영어</span><span class="sb">📐 수학</span>
      <span class="sb">🌏 사회</span><span class="sb">🔬 과학</span></div>`,
    compare:`<table class="compare"><thead><tr><th>구분</th><th>일반 과외·학원</th><th>화상과외</th></tr></thead>
      <tbody>
      <tr><td>이동 시간</td><td class="x">왕복 30분~1시간</td><td class="o">0분 (집에서)</td></tr>
      <tr><td>선생님 선택</td><td class="x">우리 동네 위주</td><td class="o">전국 선생님</td></tr>
      <tr><td>수업 방식</td><td>대면 1:1 또는 그룹</td><td class="o">실시간 1:1 화상</td></tr>
      <tr><td>복습 자료</td><td class="x">제한적</td><td class="o">판서·녹화 저장</td></tr>
      <tr><td>안전·날씨</td><td class="x">이동 부담</td><td class="o">영향 없음</td></tr>
      </tbody></table>`,
    progress:`<div class="progress-block"><h3>📊 화상과외, 이런 점이 좋았어요</h3>
      <div class="pbar"><div class="lab"><span>이동 시간 절약 만족도</span><span>96%</span></div><div class="track"><div class="fill" style="width:96%"></div></div></div>
      <div class="pbar"><div class="lab"><span>1:1 집중도 만족도</span><span>91%</span></div><div class="track"><div class="fill c2" style="width:91%"></div></div></div>
      <div class="pbar"><div class="lab"><span>선생님 매칭 만족도</span><span>89%</span></div><div class="track"><div class="fill c3" style="width:89%"></div></div></div>
      <p style="font-size:12px;color:#9aa3b5;margin-top:14px">※ 화상과외 이용 가정의 일반적인 반응을 정리한 참고용 수치입니다.</p></div>`,
    rating:`<div class="rating-box"><div><div class="score">4.9</div><div class="stars">⭐⭐⭐⭐⭐</div></div>
      <div><b style="font-size:16px">${shortRegion} ${subjectName} 화상과외</b><div class="meta">이용 가정들이 전하는 전반적인 만족도</div>
      <div class="meta">이동 부담 없는 1:1 수업 · 30분 무료 체험 제공</div></div></div>`,
    testi:`<div class="testi">
      <div class="tcard"><div class="top"><div class="av">학</div><div class="who"><b>학부모 A</b><br><span>${shortRegion} · 중등</span></div><div class="st">⭐⭐⭐⭐⭐</div></div><p>이동 시간이 없으니 아이가 덜 지치고, 집에서 바로 수업해서 관리가 편했어요.</p></div>
      <div class="tcard"><div class="top"><div class="av a2">맘</div><div class="who"><b>학부모 B</b><br><span>${shortRegion} · 고등</span></div><div class="st">⭐⭐⭐⭐⭐</div></div><p>동네에 마땅한 선생님이 없었는데 화상으로 잘 맞는 분을 만났습니다.</p></div>
      <div class="tcard"><div class="top"><div class="av a3">학</div><div class="who"><b>학부모 C</b><br><span>${shortRegion} · 초등</span></div><div class="st">⭐⭐⭐⭐⭐</div></div><p>무료 체험으로 먼저 분위기를 보고 결정해서 부담이 없었어요.</p></div>
      <div class="tcard"><div class="top"><div class="av a4">맘</div><div class="who"><b>학부모 D</b><br><span>${shortRegion} · 중등</span></div><div class="st">⭐⭐⭐⭐⭐</div></div><p>모르는 걸 그때그때 화면에서 풀어주셔서 이해가 빨랐다고 하네요.</p></div>
    </div>`,
    trustrow:`<div class="trust-row">
      <div class="tb"><div class="i">🎓</div><b>검증된 선생님</b><span>경력·전공 확인</span></div>
      <div class="tb"><div class="i">👤</div><b>1:1 전담</b><span>개별 맞춤 수업</span></div>
      <div class="tb"><div class="i">🎁</div><b>30분 무료</b><span>체험 후 결정</span></div>
      <div class="tb"><div class="i">🔄</div><b>매칭 보장</b><span>안 맞으면 교체</span></div>
    </div>`,
    timeline:`<div class="timeline">
      <div class="tl"><b>STEP 1. 무료 상담 신청</b><span>학생 학년·과목·학습 목표를 남겨주세요.</span></div>
      <div class="tl"><b>STEP 2. 맞춤 선생님 매칭</b><span>${shortRegion} 학생에게 적합한 ${subjectName} 선생님을 연결합니다.</span></div>
      <div class="tl"><b>STEP 3. 30분 무료 체험</b><span>실제 수업을 미리 경험해 봅니다.</span></div>
      <div class="tl"><b>STEP 4. 정규 수업 시작</b><span>주 1~2회 1:1 화상수업으로 학습을 이어갑니다.</span></div>
    </div>`,
    infocards:`<div class="infocard"><div class="ii">🖥️</div><div class="tx"><b>준비물은 노트북·태블릿 하나면 충분</b><p>${shortRegion} 어디서든 인터넷만 연결되면 ${subjectName} 수업을 시작할 수 있습니다.</p></div></div>
      <div class="infocard"><div class="ii">📝</div><div class="tx"><b>판서와 자료는 그대로 저장</b><p>수업 중 필기와 풀이를 남겨 복습에 활용하니 ${subjectName} 학습 효율이 높습니다.</p></div></div>
      <div class="infocard"><div class="ii">⏰</div><div class="tx"><b>시간표는 우리 아이 일정에 맞춰</b><p>학교·학원 일정과 겹치지 않도록 ${shortRegion} 학생 상황에 맞게 조율합니다.</p></div></div>`,
    donuts:`<div class="donuts">
      <div class="donut"><div class="ring" style="background:conic-gradient(var(--brand) 0 96%,#eef1f7 96% 100%)"><span class="v">96%</span></div><b>시간 절약</b><span>이동 부담 해소</span></div>
      <div class="donut"><div class="ring" style="background:conic-gradient(#00d4c8 0 91%,#eef1f7 91% 100%)"><span class="v">91%</span></div><b>집중도</b><span>1:1 밀착 수업</span></div>
      <div class="donut"><div class="ring" style="background:conic-gradient(#7c4dff 0 89%,#eef1f7 89% 100%)"><span class="v">89%</span></div><b>매칭 만족</b><span>맞춤 선생님</span></div>
    </div><p style="font-size:12px;color:#9aa3b5;margin-top:-8px">※ 화상과외 이용 가정의 일반적 반응을 정리한 참고 수치입니다.</p>`,
    tutors:`<div class="tutors">
      <div class="tutor"><div class="ph">👩‍🏫</div><b>${subjectName} 전문 A선생님</b><div class="tag">${subjectName} · 내신·기초</div><p>학생 눈높이에 맞춘 차분한 설명이 강점입니다.</p><div class="stars">⭐⭐⭐⭐⭐</div></div>
      <div class="tutor"><div class="ph t2">🧑‍🏫</div><b>${subjectName} 전문 B선생님</b><div class="tag">${subjectName} · 심화·기출</div><p>문제 풀이 과정을 꼼꼼히 짚어주는 스타일입니다.</p><div class="stars">⭐⭐⭐⭐⭐</div></div>
      <div class="tutor"><div class="ph t3">👨‍🏫</div><b>${subjectName} 전문 C선생님</b><div class="tag">${subjectName} · 개념·습관</div><p>공부 습관부터 잡아주는 관리형 수업입니다.</p><div class="stars">⭐⭐⭐⭐⭐</div></div>
    </div><p style="font-size:12px;color:#9aa3b5;margin-top:-8px">※ 실제 매칭은 상담 후 학생에게 맞는 선생님으로 연결됩니다.</p>`,
    schedule:`<div class="schedule"><h3>🗓️ ${shortRegion} 화상과외 수업 가능 시간</h3>
      <div class="sgrid">
        <div class="d">월</div><div class="d">화</div><div class="d">수</div><div class="d">목</div><div class="d">금</div><div class="d">토</div><div class="d">일</div>
        <div class="c">가능</div><div class="c">가능</div><div class="c">가능</div><div class="c">가능</div><div class="c">가능</div><div class="c">가능</div><div class="c off">협의</div>
      </div>
      <p style="font-size:13px;color:var(--muted);margin-top:12px">오후·저녁 시간대 위주로 ${shortRegion} 학생 일정에 맞춰 조율 가능합니다.</p></div>`,
    midcta:`<div class="midcta"><div class="ct"><h3>🎁 ${shortRegion} ${subjectName} 30분 무료 체험</h3>
      <p>상담 신청만으로 무료 수업을 받아보실 수 있습니다. 부담 없이 시작하세요.</p>
      <button onclick="openForm({address:'${regionName}',subject:'${subjectName}'})">무료 상담 신청하기 →</button></div></div>`,
    guarantee:`<div class="guarantee"><div class="g-ic">🤝</div><div><b>안 맞으면 선생님 교체</b><p>${shortRegion} 학생과 ${subjectName} 수업 방향이 맞지 않으면 다시 매칭해 드립니다.</p></div></div>`,
    benefit:`<div class="benefit">
      <div class="bcard"><div class="h"><span class="e">💰</span>합리적인 비용</div><p>교통비·이동 시간이 빠져 같은 예산으로 더 알찬 ${subjectName} 수업이 가능합니다.</p></div>
      <div class="bcard"><div class="h"><span class="e">🎯</span>맞춤 1:1</div><p>${shortRegion} 학생 한 명만을 위한 수업으로 진도와 난이도를 조절합니다.</p></div>
      <div class="bcard"><div class="h"><span class="e">🔒</span>안전한 학습</div><p>밤늦은 이동 없이 집에서 안전하게 ${subjectName}을 공부합니다.</p></div>
      <div class="bcard"><div class="h"><span class="e">📈</span>꾸준한 관리</div><p>과제·복습까지 챙겨 ${subjectName} 학습이 끊기지 않도록 합니다.</p></div>
    </div>`,
  };

  const midOrder=shuffle(["why","how","curriculum","trust","faq"],rand);
  const order=["intro",...midOrder,"closing"];

  // 섹션별로 끼워넣을 시각 블록 매핑 (전문적·풍부하게)
  const VISMAP={
    intro:VIS.pcards + VIS.trustrow,
    why:VIS.compare + VIS.benefit,
    how:VIS.timeline + VIS.infocards,
    curriculum:VIS.donuts + VIS.badges,
    trust:VIS.tutors + VIS.check + VIS.guarantee,
    faq:VIS.schedule,
    closing:VIS.rating + VIS.numbox + VIS.highlight,
  };

  let html="";
  let secIdx=0;
  for(const sec of order){
    html+=`<h2>${pick(TITLES[sec],rand)}</h2>`;
    const ps=pickN(POOL[sec],4,rand);
    if(sec==="faq"){
      for(const p of ps)html+=`<div class="qa"><div class="q"><span class="qi">Q.</span><span>${sub(p).split(".")[0]}?</span></div><div class="a">${sub(p)}</div></div>`;
    }else{
      for(const p of ps)html+=`<p>${sub(p)}</p>`;
      for(const e of pickN(EXTRA,2,rand))html+=`<p>${sub(e)}</p>`;
    }
    if(VISMAP[sec])html+=VISMAP[sec];
    // 중간 CTA를 두 번째 섹션 뒤에 삽입
    if(secIdx===1)html+=VIS.midcta;
    secIdx++;
    if(secIdx<order.length)html+=`<hr class="divider">`;
  }
  // 인근 지역 내부링크 (SEO)
  if(nearbyLinks&&nearbyLinks.length){
    html+=`<hr class="divider"><div class="nearby"><h3>📍 ${shortRegion} 인근 지역 화상과외</h3><div class="links">`;
    for(const n of nearbyLinks)html+=`<a href="/${n.slug}/${subjSlug}">${n.label} ${subjectName}</a>`;
    html+=`</div></div>`;
  }
  // 말풍선 후기 섹션
  html+=`<hr class="divider"><h2>${shortRegion} 화상과외 이용 후기</h2>`;
  html+=VIS.testi;
  for(const r of pickN(REVIEWS,2,rand))html+=`<blockquote>“${r}”</blockquote>`;
  html+=`<div class="trial"><strong>🎁 30분 무료 테스트 수업</strong><span>${shortRegion} ${subjectName} 화상과외, 부담 없이 먼저 체험해 보세요. 상담 신청 시 30분 무료 수업을 제공합니다.</span></div>`;
  return{html,dates:getDates(seed)};
}
