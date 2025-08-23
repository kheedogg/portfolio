import { NextPageWithLayout } from "../types"
import MetaConfig from "src/components/MetaConfig"
import { CONFIG } from "../../site.config"
import styled from "@emotion/styled"
import Image from "next/image"

const ResumeContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
  
  @media (min-width: 768px) {
    padding: 3rem 2rem;
  }
`

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray4};
  position: relative;
`

const ProfilePhotoWrapper = styled.div`
  width: 150px;
  height: 150px;
  margin: 0 auto 1.5rem;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid ${({ theme }) => theme.colors.gray4};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const Name = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.gray12};
`

const Title = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.gray11};
  margin-bottom: 1rem;
`

const ContactInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  
  a {
    color: ${({ theme }) => theme.colors.blue11};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

const Section = styled.section`
  margin-bottom: 3rem;
`

const SectionTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.gray12};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray6};
  padding-bottom: 0.5rem;
`

const SubSection = styled.div`
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.gray2};
  border-radius: 0.75rem;
  border-left: 4px solid ${({ theme }) => theme.colors.blue9};
`

const SubTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray12};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const Period = styled.span`
  color: ${({ theme }) => theme.colors.gray10};
  font-size: 0.9rem;
  font-weight: 400;
  margin-left: auto;
`

const Description = styled.p`
  color: ${({ theme }) => theme.colors.blue11};
  line-height: 1.6;
  margin: 0.5rem 0 1rem 0;
  font-weight: 500;
  font-size: 1rem;
`

const List = styled.ul`
  margin-top: 0.5rem;
  padding-left: 1.5rem;
  
  li {
    color: ${({ theme }) => theme.colors.gray11};
    line-height: 1.8;
    margin-bottom: 0.8rem;
    
    strong {
      color: ${({ theme }) => theme.colors.gray12};
      font-weight: 600;
    }
    
    ul {
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      padding-left: 1rem;
      
      li {
        font-size: 0.95rem;
        margin-bottom: 0.4rem;
        list-style-type: circle;
      }
    }
  }
`

const SkillGroup = styled.div`
  margin-bottom: 1.5rem;
`

const SkillTitle = styled.h5`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray12};
  margin-bottom: 0.5rem;
`

const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const Tag = styled.span`
  background: ${({ theme }) => theme.colors.gray3};
  color: ${({ theme }) => theme.colors.gray11};
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.9rem;
  border: 1px solid ${({ theme }) => theme.colors.gray5};
`

const Achievement = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.green2};
  border: 1px solid ${({ theme }) => theme.colors.green6};
  border-radius: 0.5rem;
  margin-top: 1rem;
  
  .icon {
    font-size: 1.2rem;
  }
  
  .text {
    color: ${({ theme }) => theme.colors.gray12};
    font-size: 0.95rem;
    
    strong {
      color: ${({ theme }) => theme.colors.green11};
      font-weight: 600;
    }
  }
`

const ResumePage: NextPageWithLayout = () => {
  const meta = {
    title: "Resume - 김도희 (Dohee Kim)",
    description: "Data Engineer | 에누마코리아 | 5개 주요 앱 1,300만명 사용자 데이터 파이프라인 구축",
    type: "website",
    url: `${CONFIG.link}/resume`,
  }

  return (
    <>
      <MetaConfig {...meta} />
      <ResumeContainer>
        <Header>
          <ProfilePhotoWrapper>
            <Image 
              src={process.env.NODE_ENV === 'production' ? "/portfolio/doheekim_resume_photo.jpeg" : "/doheekim_resume_photo.jpeg"}
              alt="김도희 프로필 사진" 
              fill
              style={{ objectFit: 'cover' }}
            />
          </ProfilePhotoWrapper>
          <Name>김도희 (Dohee Kim)</Name>
          <Title>Data Engineer</Title>
          <Description>
            숫자로 세상을 해석하는 것을 좋아하는 저는 자연과학대학 통계학을 전공하였고, 보다 넓은 세상을 이해하기 위해 컴퓨터공학을 복수전공하여 이중 학사학위를 취득했습니다.
            <br /><br />
            5개 주요 앱의 약 1,300만명의 사용자가 생성하는 매일 500만건 로그 데이터와 최대 10만명의 사용자를 커버하는 AIDT 디지털 교과서 데이터 파이프라인 작업을 주로 진행하며 
            데이터 파이프라인 구조 최적화와 데이터 처리 기술에 깊은 관심을 갖게 되었습니다.
          </Description>
          <ContactInfo>
            <a href="tel:010-5857-6510">📱 010-5857-6510</a>
            <a href="mailto:kheedogg@naver.com">📧 kheedogg@naver.com</a>
            <a href="https://github.com/kheedogg" target="_blank" rel="noopener noreferrer">
              🔗 GitHub
            </a>
            <a href="https://www.linkedin.com/in/kheedogg/" target="_blank" rel="noopener noreferrer">
              🔗 LinkedIn
            </a>
          </ContactInfo>
        </Header>

        <Section>
          <SectionTitle>💼 경력사항 (Work Experience)</SectionTitle>
          
          <SubSection>
            <SubTitle>
              <span>🏢 에누마코리아</span>
              <Period>2022.01 - 현재</Period>
            </SubTitle>
            <Description>Data Engineer (정규직)</Description>
            
            <List>
              <li>
                <strong>📚 AI 디지털 교과서 데이터 파이프라인 구축</strong>
                <br />
                <span style={{ fontSize: '0.95rem', color: '#666' }}>초등/중고등 수학, 영어, 사회 교과목 | 최대 10만명 학생 데이터 처리</span>
                <ul>
                  <li>학습 로그 데이터 스키마 설계 및 MySQL Service DB 실시간 파이프라인 구성</li>
                  <li>🚀 <strong>성과:</strong> 인덱스 최적화로 API 응답 시간 <strong>75% 개선</strong> (4초 → 1초)</li>
                  <li>Hadoop 환경에서 Zeppelin/Airflow 활용 Spark 기반 ETL 파이프라인 구축</li>
                  <li>🚀 <strong>성과:</strong> 청크 단위 비동기 처리로 배치 시간 <strong>94% 단축</strong> (1.2초 → 0.07초)</li>
                  <li>FastAPI 백엔드 개발 (Learning Record 및 모델 추론 결과 전송)</li>
                </ul>
              </li>
              
              <li>
                <strong>🔄 토도 앱 데이터 인프라 개선</strong>
                <br />
                <span style={{ fontSize: '0.95rem', color: '#666' }}>5개 앱 | 1,300만명 사용자 | 일 500만건 로그 처리</span>
                <ul>
                  <li>대용량 로그 처리 파이프라인 Airflow → Databricks 마이그레이션</li>
                  <li>Medallion Architecture 및 Snapshot 활용 데이터 무결성 보장</li>
                  <li>🚀 <strong>성과:</strong> Secondary Index 최적화로 배치 속도 <strong>4배 향상</strong></li>
                  <li>🚀 <strong>성과:</strong> DynamoDB Capacity Mode 최적화로 비용 <strong>35% 절감</strong></li>
                </ul>
              </li>
            </List>
          </SubSection>

          <SubSection>
            <SubTitle>
              <span>🏢 에누마코리아</span>
              <Period>2022.01 - 2022.12</Period>
            </SubTitle>
            <Description>AI Engineer (정규직)</Description>
            
            <List>
              <li>
                <strong>🧠 Knowledge Tracing 모델 개발</strong>
                <br />
                <span style={{ fontSize: '0.95rem', color: '#666' }}>학습자 개인 맞춤형 이해도 예측 모델</span>
                <ul>
                  <li>LKT (Language model based Knowledge Tracing) 모델 구축</li>
                  <li>게임 로그 데이터를 모델 추론 형식에 맞춰 전처리 파이프라인 구축</li>
                  <li>🚀 <strong>성과:</strong> 기존 DKT 대비 AUC/ACC 성능 향상</li>
                </ul>
              </li>
              
              <li>
                <strong>✍️ 손글씨 인식 모델 개발</strong>
                <br />
                <span style={{ fontSize: '0.95rem', color: '#666' }}>수학, 한자, 한글, 영어 과목별 Text Recognition</span>
                <ul>
                  <li>CNN 기반 다국어 손글씨 인식 모델 구축</li>
                  <li>🚀 <strong>성과:</strong> 성능 유지하며 모델 크기 <strong>62.5% 축소</strong> (8MB → 3MB)</li>
                  <li>모델 테스트 웹페이지 개발 (버저닝, 오인식 수집, 재학습 시스템)</li>
                </ul>
              </li>
            </List>
          </SubSection>

          <SubSection>
            <SubTitle>
              <span>🏢 에누마</span>
              <Period>2021.07 - 2021.12</Period>
            </SubTitle>
            <Description>Data Analyst (인턴)</Description>
            
            <List>
              <li>
                <strong>📊 게임 데이터 분석 및 인사이트 도출</strong>
                <ul>
                  <li>음성 데이터 및 인지 능력 관련 게임 로그 분석</li>
                  <li>통계적 분석 기반 커리큘럼 및 난이도 조정 제안</li>
                  <li>Apache Superset → Databricks 대시보드 마이그레이션</li>
                  <li>데이터 무결성 검증 파이프라인 구축</li>
                </ul>
              </li>
            </List>
          </SubSection>
        </Section>

        <Section>
          <SectionTitle>🛠 기술 스택 (Skills)</SectionTitle>
          
          <SkillGroup>
            <SkillTitle>Programming Languages</SkillTitle>
            <SkillTags>
              <Tag>Python (High)</Tag>
              <Tag>SQL (High)</Tag>
              <Tag>R (Middle)</Tag>
              <Tag>Node.js (Low)</Tag>
            </SkillTags>
          </SkillGroup>

          <SkillGroup>
            <SkillTitle>Data Engineering & Backend</SkillTitle>
            <SkillTags>
              <Tag>FastAPI</Tag>
              <Tag>Apache Kafka</Tag>
              <Tag>PySpark</Tag>
              <Tag>Apache Airflow</Tag>
              <Tag>MySQL</Tag>
              <Tag>Databricks</Tag>
            </SkillTags>
          </SkillGroup>

          <SkillGroup>
            <SkillTitle>Cloud & Infrastructure</SkillTitle>
            <SkillTags>
              <Tag>AWS</Tag>
              <Tag>NCP</Tag>
              <Tag>Docker</Tag>
              <Tag>k9s</Tag>
              <Tag>Spark</Tag>
            </SkillTags>
          </SkillGroup>

          <SkillGroup>
            <SkillTitle>Collaboration Tools</SkillTitle>
            <SkillTags>
              <Tag>Slack</Tag>
              <Tag>Jira</Tag>
              <Tag>Notion</Tag>
              <Tag>Confluence</Tag>
              <Tag>Bitbucket</Tag>
              <Tag>BaseCamp</Tag>
              <Tag>Sourcetree</Tag>
            </SkillTags>
          </SkillGroup>
        </Section>

        <Section>
          <SectionTitle>📚 논문 (Publications)</SectionTitle>
          
          <List>
            <li>
              <strong>Kim, D., et al. (2025)</strong>. ES-KT-24: A Multimodal Knowledge Tracing Benchmark Dataset with Educational Game Playing Video and Synthetic Text Generation. 
              <i>Intelligent Tutoring Systems</i>. arXiv:2409.10244. <strong>[First Author]</strong>
            </li>
            <li>
              <strong>Lee, U., Bae, J., Kim, D. (2024)</strong>. Language Model Can Do Knowledge Tracing: Simple but Effective Method to Integrate Language Model and Knowledge Tracing Task. 
              arXiv:2406.02893. <strong>[Co-author]</strong>
            </li>
            <li>
              <strong>Lee, U., et al. (2024)</strong>. From Prediction to Application: Language Model-based Code Knowledge Tracing with Domain Adaptive Pre-Training and Automatic Feedback System with Pedagogical Prompting for Comprehensive Programming Education. 
              arXiv:2409.00323. <strong>[Contributing Author]</strong>
            </li>
          </List>
        </Section>

        <Section>
          <SectionTitle>🚀 프로젝트 (Projects)</SectionTitle>
          
          <SubSection>
            <SubTitle>
              산학협력 with LOCS <Period>(2021)</Period>
            </SubTitle>
            <Description>
              부산대학교 산학협력 프로젝트로 LOCS 기업과 협업
            </Description>
          </SubSection>

          <SubSection>
            <SubTitle>
              COVID-19 Analysis (URO-학부연구생) <Period>(2020-2021)</Period>
            </SubTitle>
            <Description>
              코로나19 데이터 분석 및 시각화 프로젝트로 URO 학부 연구 포스터 장려상 수상
            </Description>
          </SubSection>

          <SubSection>
            <SubTitle>
              KBL ALL STAR전 농구 선수 선발 <Period>(2020)</Period>
            </SubTitle>
            <Description>
              데이터 분석을 통한 KBL 올스타 선수 선발 프로젝트
            </Description>
          </SubSection>

          <SubSection>
            <SubTitle>
              태블로 신병 훈련소 19기 <Period>(2020)</Period>
            </SubTitle>
            <Description>
              Tableau를 활용한 데이터 시각화 교육 프로그램 수료
            </Description>
          </SubSection>
        </Section>

        <Section>
          <SectionTitle>🎓 학력 (Education)</SectionTitle>
          
          <SubSection>
            <SubTitle>
              부산대학교 <Period>(2017.03 - 2022.02)</Period>
            </SubTitle>
            <Description>통계학(주전공) & 컴퓨터공학(복수전공) 학사 학위</Description>
          </SubSection>
        </Section>

        <Section>
          <SectionTitle>🏆 수상 및 자격증 (Awards & Certifications)</SectionTitle>
          
          <List>
            <li>🥈 URO 학부 연구 포스터 장려상 수상 (COVID-19 Analysis)</li>
            <li>OPIc IH (Intermediate High) - English</li>
          </List>
        </Section>
      </ResumeContainer>
    </>
  )
}

export default ResumePage