import { NextPageWithLayout } from "../types"
import MetaConfig from "src/components/MetaConfig"
import { CONFIG } from "../../site.config"
import styled from "@emotion/styled"
import Image from "next/image"
import { AiOutlineGithub, AiOutlineLink } from "react-icons/ai"

/**
 * 이력서는 프로젝트 단위로 보여준다.
 * 한 회사에서 오래 일해 프로젝트별 시작·종료 경계가 불명확하므로 기간은 쓰지 않는다.
 * 판단 근거는 기간이 아니라 각 카드의 성과 수치와 사용 기술이 진다.
 */

type Project = {
  name: string
  org: string
  summary: string
  metrics?: { value: string; label: string }[]
  stack?: string[]
  /** 배포된 화면을 직접 캡처한 것만 넣는다. 없으면 이미지 슬롯 자체가 없다. */
  image?: string
  /** 실제로 열리는 링크만 넣는다. 비공개 저장소는 걸지 않는다. */
  links?: { label: string; href: string }[]
}

const WORK_PROJECTS: Project[] = [
  {
    name: "AI 모델 수명주기 — 연구에서 서빙, 그리고 교체까지",
    org: "에누마코리아 · AI/Backend",
    summary:
      "Knowledge Tracing 모델을 직접 구축·서빙하고 3년간 운영한 뒤, 근거를 들어 ELO 레이팅으로 교체하는 결정을 발의·설계·구현했습니다. ELO 갱신식이 Rasch(1PL) 모델의 온라인 추정임을 밝혀 기존 신경망 모델과 같은 척도로 비교할 기준선을 세웠습니다. 설계 문서에 전제와 결정을 번호로 남기고 철회한 결정과 그 사유까지 보존해 판단 근거를 추적 가능하게 유지했습니다.",
    metrics: [
      { value: "AUC 0.7531", label: "기존 모델과 동일 척도로 비교 검증" },
      { value: "약 1,800만 행", label: "학습 데이터셋 (SHA-256 익명화)" },
    ],
    stack: ["MLflow", "PyTorch", "Language Model", "Python"],
  },
  {
    name: "실시간 학습 데이터 파이프라인",
    org: "에누마코리아 · AI/Backend",
    summary:
      "학습 직후 이해도가 마이페이지·리포트·다음 추천에 즉시 반영되어야 해 스트리밍 구조를 설계했습니다. 순서 보장보다 유실 방지와 다중 컨슈머 구독이 중요해 SQS·Kinesis 대신 MSK(Kafka)를 선택했고, 컨슈머 추가만으로 소비처를 붙이는 구조라 프로듀서 변경 없이 서비스를 확장했습니다. 해석 불가 메시지는 DLQ 적재·Slack 알림·재처리 API를 묶어 재발 방지 루프로 운영했습니다.",
    metrics: [
      { value: "1~2초", label: "피크(분당 약 5,000건)에도 반영 지연 유지" },
      { value: "3개 서비스", label: "동일 파이프라인 재사용" },
    ],
    stack: ["MSK (Kafka)", "gRPC", "DLQ", "Grafana", "OpenTelemetry"],
  },
  {
    name: "대용량 배치 파이프라인 이관",
    org: "에누마코리아 · AI/Backend",
    summary:
      "일 500만 건 로그를 처리하는 배치를 Airflow에서 Databricks Workflows로 전면 이전했습니다. 기존 뷰 형태를 유지한 채 병행 파일을 두고 import 한 줄로 전환·롤백이 가능하게 만들어 무중단으로 옮겼습니다. Fact/Dimension ETL을 Medallion(Bronze→Silver→Gold) 계층으로 재구성하고 신규 과목까지 확장했습니다.",
    metrics: [
      { value: "4배↑", label: "배치 속도 (Secondary Index·Query 전환)" },
      { value: "35%↓", label: "DynamoDB 비용 (Capacity Mode 전환)" },
    ],
    stack: ["Databricks", "Delta Lake", "Medallion", "Airflow", "DynamoDB"],
  },
  {
    name: "교과서 화면 로딩 성능 최적화 TF",
    org: "에누마코리아 · AI/Backend",
    summary:
      "한 화면이 필요한 데이터를 한 번에 받는 구조라 가장 느린 집계 하나가 화면 전체를 잡고 있었습니다. 응답을 데이터 성격에 따라 나눠 API를 분리하고, 추천은 요청 시점 생성에서 일 배치 사전 생성으로 전환했습니다. 개선 효과 측정은 학생을 상·중·하로 분류해 분포를 대표하는 입력을 뽑아 검증했고, 소규모 데이터에서 생기는 3~7% 저하도 함께 보고했습니다.",
    metrics: [
      { value: "75%↓", label: "API 평균 응답 4초 → 1초 미만" },
      { value: "19배", label: "추천 생성 1.3초 → 0.07초" },
      { value: "83% → 17%", label: "타임아웃 발생률" },
    ],
    stack: ["MySQL", "인덱스 최적화", "배치 사전 생성"],
  },
  {
    name: "DW · 데이터 마트 모델링",
    org: "에누마코리아 · AI/Backend",
    summary:
      "여러 과목의 학습 로그를 하나로 통합하면서 과목별 개별 필드를 함께 수용하도록 스키마를 설계하고, 신규 과목이 추가되어도 같은 규격으로 확장되는 Gold 계층 집계 테이블을 구성했습니다. 운영 중 문항 식별자 타입이 바뀌었을 때는 영향받는 집계 테이블 5개의 DDL을 명세해 폐쇄망 포함 4개 망에 순차 반영했습니다.",
    metrics: [{ value: "4개 망", label: "무중단 스키마 진화 (폐쇄망 포함)" }],
    stack: ["Databricks Unity Catalog", "Delta Lake", "MySQL", "LCMS"],
  },
  {
    name: "데이터 품질 · 무결성 관리 체계",
    org: "에누마코리아 · AI/Backend",
    summary:
      "Avo 기반 학습 이벤트의 전 필드를 FE/BE 담당으로 판정해 계약을 문서로 확정하고, 앱별로 갈라져 있던 이벤트 네이밍을 통일했습니다. EDA에서 발견한 이상을 정량화한 뒤 가설을 세워 검증했고, 수정 후 2개월치를 재조사해 재발이 없음을 확인했습니다. 로그 스펙을 문서로 확정한 뒤로 값의 정합성을 되묻는 문의가 줄었습니다.",
    metrics: [
      { value: "8개 이벤트", label: "계약 문서화" },
      { value: "0.64%", label: "에러 8.1만 건 / 전체 1,264만 건, 패턴 6종 분류" },
    ],
    stack: ["Avo", "Unity Catalog", "Grafana", "OpenTelemetry (Tempo)"],
  },
  {
    name: "Knowledge Tracing · 손글씨 인식 모델",
    org: "에누마코리아 · AI Engineer",
    summary:
      "사용자 학습 데이터로 LKT 모델을 구축하고 게임 로그를 추론 형식에 맞춰 변형하며 정오답 산정 기준을 세웠습니다. 수학·한자·한글·영어 과목별 손글씨 이미지는 CNN 기반 모델로 인식했고, 모델 버저닝과 오인식 이미지 수집·추가 학습이 도는 테스트 페이지를 직접 만들었습니다.",
    metrics: [
      { value: "AUC·ACC↑", label: "기존 DKT 모델 대비" },
      { value: "62.5%↓", label: "모델 크기 8MB → 3MB (성능 유지)" },
    ],
    stack: ["PyTorch", "CNN", "Python"],
  },
  {
    name: "장애 대응 및 재발 방지",
    org: "에누마코리아 · AI/Backend",
    summary:
      "PROD Kafka 브로커 연결 장애를 TCP 도달성과 핸드셰이크를 직접 진단해 네트워크 구간 문제로 특정하고, 복구 후 누락 구간을 역산해 이벤트를 수동 재발행했습니다. 문항 매핑 실패로 추론이 빈 데이터를 받아 무한 대기하던 구조는 스킵·Slack 알림·미처리 목록 노출로 바꿔, 담당자가 모니터링 페이지를 지켜보던 운영 부담을 구조적으로 제거했습니다.",
    metrics: [{ value: "741건", label: "누락 구간 역산 후 수동 재발행" }],
    stack: ["Kafka", "Grafana", "OpenTelemetry (Tempo)"],
  },
]

const SIDE_PROJECTS: Project[] = [
  {
    name: "ChimeMe — 매시간 3초 영상 소셜 앱",
    org: "개인 프로젝트 · App Store 출시",
    summary:
      "정해진 시간마다 짧은 영상을 남기고 친구와 공유하는 앱을 기획부터 배포·운영까지 직접 만들었습니다. 오프라인 업로드 큐와 재시도, 그룹 피드·채팅, 초대 링크/QR 참여, 전원이 1초씩 찍으면 서버가 합본을 만드는 블라인드 주제 릴레이, 신고·차단 등 UGC 안전장치를 담았습니다. 기획·디자인·프론트·백엔드 역할별 에이전트를 구성해 논의시키고 합의된 산출물을 받아 구현했습니다.",
    stack: ["React Native (Expo)", "TypeScript", "Firebase", "EAS Build/Update"],
  },
  {
    name: "에이전트 자율 작업 운영 체계",
    org: "개인 프로젝트 · 저장소 4곳 적용",
    summary:
      "에이전트가 자율로 코드를 수정할 때의 경계를 규약으로 확정했습니다. 워크트리 격리 → 작업 → 타입체크·테스트·린트 → PR 생성에서 정지하고, main 머지·배포·스토어 제출은 금지해 구조적으로 배포를 유발할 수 없게 설계했습니다. 실제 사고 3건에서 도출한 규칙이며, 두 저장소가 공유하는 관측 대시보드를 함께 만들었습니다.",
    stack: ["Git worktree", "관측 대시보드", "의사결정 워크시트"],
  },
  {
    name: "Raccoon English — 영어회화 수업 보조",
    org: "개인 프로젝트",
    summary:
      "10년간 진행해 온 회화 수업을 돕기 위해, 여러 국가에 흩어진 학생·선생님을 위한 수업 보조 페이지를 만들었습니다. 교과서 PDF 뷰어·주제별 질문 252개 등 수업 5종, 교재별 이어하기, 선생님용 월간 캘린더, 한/영 다국어와 사용자 시간대(UTC 저장 → 로컬 표시)를 지원합니다.",
    stack: ["Node.js", "Express", "pdf.js", "Render"],
  },
  {
    name: "개인 테크 블로그 & 포트폴리오",
    org: "개인 프로젝트 · 이 사이트",
    summary:
      "Notion API를 CMS로 쓰는 블로그와 이력서를 한 사이트로 묶었습니다. 다크/라이트 모드와 댓글을 지원하고 Vercel로 자동 배포합니다.",
    stack: ["Next.js", "TypeScript", "Emotion", "TanStack Query", "Vercel"],
    image: "/projects/tech-blog.jpg",
    links: [
      { label: "GitHub", href: "https://github.com/kheedogg/portfolio" },
      { label: "Demo", href: "https://portfolio-doheekim.vercel.app" },
    ],
  },
  {
    name: "Universal Timer — 자연어 타이머",
    org: "개인 프로젝트",
    summary:
      "자유 형식 문장을 그대로 받아 타이머를 맞춥니다. \"꼬들 라면 먹을거야\"를 3분으로 해석하는 식으로, Gemini 2.0 Flash로 자연어를 시간으로 변환합니다.",
    stack: ["Flutter", "Dart", "Gemini 2.0 Flash", "GitHub Pages"],
    image: "/projects/universal-timer.jpg",
    links: [
      { label: "GitHub", href: "https://github.com/kheedogg/universal_timer" },
      { label: "Demo", href: "https://kheedogg.github.io/universal_timer" },
    ],
  },
  {
    name: "어린이 천문대 태양계 수업 페이지",
    org: "개인 프로젝트",
    summary:
      "천문대에서 수업하는 동생을 위해 만든 영/한 이중언어 수업 페이지입니다. 8개 행성이 공전하는 인터랙티브 애니메이션과 별자리·퀴즈·학습지 모드를 담았고, 수업 중 공전을 멈추는 버튼과 모션 최소화 접근성을 지원합니다. 빌드와 의존성 없이 동작합니다.",
    stack: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    image: "/projects/solar-system.jpg",
    links: [
      { label: "GitHub", href: "https://github.com/kheedogg/solar-system-class" },
      { label: "Demo", href: "https://kheedogg.github.io/solar-system-class" },
    ],
  },
]

const ACADEMIC_PROJECTS: Project[] = [
  {
    name: "마스크 착용 얼굴 이미지 복원",
    org: "졸업과제 · 팀 프로젝트",
    summary:
      "마스크로 가려진 얼굴 사진을 원하는 표정으로 복원하는 서비스를 GAN 기반으로 만들고, 프론트 UI와 모델 연동을 모두 맡았습니다.",
    stack: ["GAN", "Web"],
  },
  {
    name: "COVID-19 확산 예측 및 국가별 클러스터링",
    org: "URO 학부연구생 · 전체 2등상",
    summary:
      "시계열 분석(ARIMA·SARIMA·Holt's Winter)과 회귀 모델로 확진자 수를 예측하고, 사망률·회복률 기반으로 국가를 3개 그룹으로 분류했습니다.",
    stack: ["Python", "Time Series", "Clustering"],
    links: [
      { label: "GitHub", href: "https://github.com/kheedogg/COVID-19_Analysis" },
    ],
  },
  {
    name: "심전도 기반 질병 분류 모델",
    org: "산학협력 with LOCS",
    summary:
      "심전도 3만 건을 6개 질병으로 분류하는 CNN 모델과 전처리 파이프라인(디노이징·정규화)을 구축했습니다.",
    stack: ["TensorFlow/Keras", "신호처리"],
    links: [
      { label: "GitHub", href: "https://github.com/kheedogg/ECG_BeatType" },
    ],
  },
  {
    name: "KBL 올스타 선수 선발 분석",
    org: "한국프로농구 주최 공모전",
    summary:
      "인기투표가 아닌 3년 시즌 데이터로 올스타 12명을 뽑았습니다. 능력치 변동이 적고 기대치를 채우는 '안정성'을 기준으로, 포지션별 능력(PCA)·경기 환경 적응력(Random Forest)·성장 가능성을 함께 봤습니다.",
    stack: ["R", "PCA", "Random Forest"],
    links: [{ label: "GitHub", href: "https://github.com/kheedogg/KBL" }],
  },
]

const SKILLS: { group: string; items: string[] }[] = [
  { group: "Language", items: ["Python", "SQL", "TypeScript", "R"] },
  {
    group: "Data & Backend",
    items: ["PySpark", "Databricks", "Kafka (MSK)", "Airflow", "FastAPI", "MySQL", "gRPC"],
  },
  {
    group: "Infra & Observability",
    items: ["AWS", "NCP", "Docker", "k9s", "Grafana", "OpenTelemetry"],
  },
  { group: "ML", items: ["PyTorch", "MLflow", "CNN", "Knowledge Tracing"] },
]

const PUBLICATIONS = [
  {
    cite:
      "Kim, D., et al. (2025). ES-KT-24: A Multimodal Knowledge Tracing Benchmark Dataset with Educational Game Playing Video and Synthetic Text Generation. Intelligent Tutoring Systems.",
    id: "arXiv:2409.10244",
    role: "First Author",
  },
  {
    cite:
      "Lee, U., Bae, J., Kim, D. (2024). Language Model Can Do Knowledge Tracing: Simple but Effective Method to Integrate Language Model and Knowledge Tracing Task.",
    id: "arXiv:2406.02893",
    role: "Co-author",
  },
  {
    cite:
      "Lee, U., et al. (2024). From Prediction to Application: Language Model-based Code Knowledge Tracing with Domain Adaptive Pre-Training and Automatic Feedback System with Pedagogical Prompting for Comprehensive Programming Education.",
    id: "arXiv:2409.00323",
    role: "Contributing Author",
  },
]

const ProjectCard = ({ data }: { data: Project }) => (
  <StyledCard>
    {data.image && (
      <div className="shot">
        <Image
          src={data.image}
          alt={`${data.name} 화면`}
          width={1200}
          height={750}
          sizes="(max-width: 900px) 100vw, 50vw"
        />
      </div>
    )}
    <span className="org">{data.org}</span>
    <h3>{data.name}</h3>
    <p className="summary">{data.summary}</p>
    {data.metrics && (
      <div className="metrics">
        {data.metrics.map((m) => (
          <div className="metric" key={m.value + m.label}>
            <b>{m.value}</b>
            <span>{m.label}</span>
          </div>
        ))}
      </div>
    )}
    {data.links && (
      <div className="links">
        {data.links.map((l) => (
          <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
            {l.label === "GitHub" ? <AiOutlineGithub /> : <AiOutlineLink />}
            {l.label}
          </a>
        ))}
      </div>
    )}
    {data.stack && (
      <div className="stack">
        {data.stack.map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
    )}
  </StyledCard>
)

const ResumePage: NextPageWithLayout = () => {
  const meta = {
    title: "Resume - 김도희 (Dohee Kim)",
    description:
      "Software Engineer | 에누마코리아 | 5개 앱 1,300만 사용자의 데이터 파이프라인과 AI 모델 서빙",
    type: "website",
    url: `${CONFIG.link}/resume`,
  }

  return (
    <>
      <MetaConfig {...meta} />
      <StyledWrapper>
        <header className="intro">
          <span className="role">Software Engineer</span>
          <h1>
            김도희 <span>Dohee Kim</span>
          </h1>
          <p className="summary">
            통계학과 컴퓨터공학을 복수전공했습니다. 모델을 만들어 프로덕션에
            올리고, 그 모델이 딛고 설 데이터 기반을 함께 만듭니다. 5개 글로벌
            앱에서 약 1,300만 명이 매일 만드는 500만 건의 로그를 실시간 스트리밍과
            배치 두 축으로 수집·가공해 추론과 추천으로 되돌려보내는 구조를
            설계·운영했습니다.
          </p>
          <div className="links">
            <a href={`mailto:${CONFIG.profile.email}`}>{CONFIG.profile.email}</a>
            <a
              href={`https://github.com/${CONFIG.profile.github}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/{CONFIG.profile.github}
            </a>
            <a
              href={`https://www.linkedin.com/in/${CONFIG.profile.linkedin}/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/{CONFIG.profile.linkedin}
            </a>
          </div>
        </header>

        <div className="stats">
          <div>
            <b>1,300만</b>
            <span>서비스 사용자</span>
          </div>
          <div>
            <b>500만/일</b>
            <span>처리 로그</span>
          </div>
          <div>
            <b>5개</b>
            <span>담당 서비스 앱</span>
          </div>
          <div>
            <b>3편</b>
            <span>논문 (1편 1저자)</span>
          </div>
        </div>

        <section>
          <h2>Work Projects</h2>
          <p className="lead">에누마코리아 · 에누마에서 맡은 일입니다.</p>
          <div className="grid">
            {WORK_PROJECTS.map((p) => (
              <ProjectCard key={p.name} data={p} />
            ))}
          </div>
        </section>

        <section>
          <h2>Side Projects</h2>
          <p className="lead">필요해서 직접 만들고, 배포해 운영 중인 것들입니다.</p>
          <div className="grid">
            {SIDE_PROJECTS.map((p) => (
              <ProjectCard key={p.name} data={p} />
            ))}
          </div>
        </section>

        <section>
          <h2>Academic Projects</h2>
          <div className="grid">
            {ACADEMIC_PROJECTS.map((p) => (
              <ProjectCard key={p.name} data={p} />
            ))}
          </div>
        </section>

        <section>
          <h2>Skills</h2>
          <div className="skills">
            {SKILLS.map((s) => (
              <div key={s.group}>
                <span className="group">{s.group}</span>
                <div className="stack">
                  {s.items.map((i) => (
                    <span key={i}>{i}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Publications</h2>
          <ul className="pubs">
            {PUBLICATIONS.map((p) => (
              <li key={p.id}>
                <p>{p.cite}</p>
                <span className="meta">
                  {p.id} · {p.role}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Education &amp; Awards</h2>
          <div className="plain">
            <p>
              <b>부산대학교</b> 통계학(주전공) · 컴퓨터공학(복수전공) 학사
            </p>
            <p>URO 학부 연구 포스터 수상 — COVID-19 Analysis</p>
            <p>태블로 신병 훈련소 19기 수료</p>
            <p>OPIc IH (English)</p>
          </div>
        </section>
      </StyledWrapper>
    </>
  )
}

ResumePage.getLayout = (page) => page

export default ResumePage

const StyledCard = styled.article`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 1rem;
  background-color: ${({ theme }) =>
    theme.scheme === "light" ? "white" : theme.colors.gray4};
  border: 1px solid ${({ theme }) => theme.colors.gray5};

  /* 18개 중 이미지가 붙는 건 3개뿐이라, 이미지 카드만 훌쩍 커지면
     그리드에 구멍이 생긴다. 높이를 고정해 카드 간 차이를 줄이고,
     비율이 제각각이므로 contain으로 넣어 잘리지 않게 한다. */
  > .shot {
    margin: -1.5rem -1.5rem 1.25rem;
    /* 캡처는 전부 16:10이다. 슬롯을 같은 비율로 두면 카드 폭을 꽉 채우면서
       잘리지도, 좌우에 빈 띠가 생기지도 않는다. */
    aspect-ratio: 16 / 10;
    background-color: ${({ theme }) => theme.colors.gray3};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray5};
    border-radius: 1rem 1rem 0 0;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  > .links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;

    a {
      display: inline-flex;
      align-items: center;
      gap: 0.3125rem;
      padding: 0.3125rem 0.625rem;
      border-radius: 0.5rem;
      font-size: 0.75rem;
      font-weight: 500;
      text-decoration: none;
      color: ${({ theme }) => theme.colors.blue11};
      background-color: ${({ theme }) => theme.colors.blue3};

      svg {
        font-size: 0.875rem;
      }
      :hover {
        background-color: ${({ theme }) => theme.colors.blue4};
      }
    }
  }
  > .org {
    font-size: 0.75rem;
    letter-spacing: 0.02em;
    color: ${({ theme }) => theme.colors.gray10};
  }
  > h3 {
    margin-top: 0.5rem;
    font-size: 1.0625rem;
    font-weight: 600;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.gray12};
  }
  > .summary {
    margin-top: 0.75rem;
    font-size: 0.9rem;
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.gray11};
  }
  > .metrics {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    margin-top: 1rem;

    .metric {
      display: flex;
      align-items: baseline;
      gap: 0.625rem;
      padding: 0.5rem 0.75rem;
      border-radius: 0.5rem;
      background-color: ${({ theme }) => theme.colors.green3};

      b {
        flex-shrink: 0;
        font-size: 0.875rem;
        font-weight: 600;
        font-variant-numeric: tabular-nums;
        color: ${({ theme }) => theme.colors.green11};
      }
      span {
        font-size: 0.8125rem;
        line-height: 1.5;
        color: ${({ theme }) => theme.colors.gray11};
      }
    }
  }
  > .stack {
    margin-top: auto;
    padding-top: 1rem;
  }
`

const StyledWrapper = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 2.5rem 1rem 4rem;

  @media (min-width: 768px) {
    padding: 3.5rem 1.5rem 5rem;
  }

  .intro {
    > .role {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.blue11};
      background-color: ${({ theme }) => theme.colors.blue3};
    }
    > h1 {
      margin-top: 1rem;
      font-size: 2.25rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: ${({ theme }) => theme.colors.gray12};

      span {
        font-weight: 400;
        color: ${({ theme }) => theme.colors.gray10};
      }
    }
    > .summary {
      margin-top: 1rem;
      max-width: 60ch;
      font-size: 0.95rem;
      line-height: 1.8;
      color: ${({ theme }) => theme.colors.gray11};
    }
    > .links {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-top: 1.5rem;
      font-size: 0.875rem;

      a {
        color: ${({ theme }) => theme.colors.blue11};
        text-decoration: none;

        :hover {
          text-decoration: underline;
        }
      }
    }
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
    margin-top: 2.5rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    > div {
      padding: 1rem 1.25rem;
      border-radius: 0.75rem;
      border: 1px solid ${({ theme }) => theme.colors.gray5};
      background-color: ${({ theme }) =>
        theme.scheme === "light" ? "white" : theme.colors.gray4};

      b {
        display: block;
        font-size: 1.375rem;
        font-weight: 700;
        font-variant-numeric: tabular-nums;
        letter-spacing: -0.02em;
        color: ${({ theme }) => theme.colors.gray12};
      }
      span {
        display: block;
        margin-top: 0.25rem;
        font-size: 0.75rem;
        color: ${({ theme }) => theme.colors.gray10};
      }
    }
  }

  section {
    margin-top: 3.5rem;

    > h2 {
      font-size: 0.8125rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.gray10};
      padding-bottom: 0.75rem;
      border-bottom: 1px solid ${({ theme }) => theme.colors.gray5};
    }
    > .lead {
      margin-top: 1rem;
      font-size: 0.875rem;
      color: ${({ theme }) => theme.colors.gray10};
    }
  }

  .grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 1rem;
    margin-top: 1.25rem;

    @media (min-width: 900px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  /* 카드와 Skills가 같은 칩 모양을 쓴다 */
  .stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;

    span {
      padding: 0.25rem 0.625rem;
      border-radius: 0.5rem;
      font-size: 0.75rem;
      color: ${({ theme }) => theme.colors.gray11};
      background-color: ${({ theme }) => theme.colors.gray5};
    }
  }

  .skills {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 1.25rem;
    margin-top: 1.25rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .group {
      display: block;
      margin-bottom: 0.625rem;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.gray10};
    }
  }

  .pubs {
    margin-top: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;

    li {
      p {
        font-size: 0.9rem;
        line-height: 1.7;
        color: ${({ theme }) => theme.colors.gray11};
      }
      .meta {
        display: block;
        margin-top: 0.375rem;
        font-size: 0.75rem;
        color: ${({ theme }) => theme.colors.gray10};
      }
    }
  }

  .plain {
    margin-top: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.gray11};

    b {
      font-weight: 600;
      color: ${({ theme }) => theme.colors.gray12};
    }
  }
`
