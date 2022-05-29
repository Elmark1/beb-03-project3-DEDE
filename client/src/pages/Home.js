import React, { useState } from "react";
import styled from "styled-components";
import { FaUserSecret } from "react-icons/fa";
import { icons } from "react-icons/lib";

const StyledMain = styled.main`
  flex-direction: column;
`;

const StyledSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const IntroSection = styled.div`
  height: 550px;
  width: 100%;
  padding: 0 30px;
`;
const AboutSection = styled.section`
  height: 820px;
  background-color: #00c2bd;
  width: 100%;
`;

const AboutText = styled.div`
  flex-direction: column;
  padding-left: 70px;
`;

const StyledH1 = styled.h1`
  color: #000;
  font-size: 48px;
  text-align: center;
  margin: 30px 0;
`;

const StyledH2 = styled.h2`
  text-align: center;
  font-size: 28px;
  color: #576574;
  padding-bottom: 40px;
`;

const StyledH3 = styled.h3`
  border: 1px solid white;
  border-radius: 10px;
  padding: 10px;
  width: 500px;
  font-size: 34px;
  color: #fff;
  margin: 20px 0px;
`;

const SectionH4 = styled.div`
  width: 100%;
`;

const StyledH4 = styled.h4`
  font-size: 24px;
  color: #576574;
  border: 1px solid black;
  border-color: #00c2bd;
  border-radius: 10px;
  width: 600px;
  padding: 5px;
`;

const StyledH6 = styled.h6`
  font-size: 17px;
  color: #222f3e;
  margin-left: 20px;
`;

const TeamSection = styled.div`
  height: 600px;
  width: 100%;
`;

const TeamIconSection = styled.div`
  display: flex;
  justify-content: space-evenly;
  color: #dfe6e9;
  margin-top: 50px;
  align-items: center;
`;

const TeamIcon1 = styled.div`
  border: 2px solid;
  border-radius: 50px;
  border-color: #00c2bd;
  padding: 30px;
  flex-direction: row;
`;
const TeamIcon2 = styled.div`
  border: 2px solid;
  border-radius: 50px;
  border-color: #00c2bd;
  padding: 30px;
  flex-direction: row;
`;
const TeamIcon3 = styled.div`
  border: 2px solid;
  border-radius: 50px;
  border-color: #00c2bd;
  padding: 30px;
  flex-direction: row;
`;

const NameLabel = styled.div`
  color: #000;
  font-size: 24px;
  text-align: center;
  text-shadow: 1em;
`;
const StackLabel = styled.div`
  text-align: center;
  color: #fff;
  background-color: #00c2b2;
`;

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <StyledMain>
      <StyledSection>
        <IntroSection>
          <StyledH1>DECENTRALIZED DELIVERY: BEGINS</StyledH1>
          <StyledH2>
            같은 민족, 다른 배달! 진짜가 나타나다! DEDE와 모두 함께 웃어요!
          </StyledH2>
          <SectionH4>
            <StyledH4>
              #1. 주문고객님, 비싼 배달료 때문에 주문을 망설였던 적이 있나요?
            </StyledH4>
            <StyledH6>
              배달료는 저희가 부담하겠습니다. DEDE를 통해 주문해보세요.
              지금까지는 경험해보지 못한 엄청난 혜택이 기다리고 있습니다.
            </StyledH6>
            <StyledH4>
              #2. 사장님, 비싼 수수료는 이제 저희가 평생 지원하겠습니다!
            </StyledH4>
            <StyledH6>
              모두가 WinWin하는 DEDE생태계에서 비싼 사용료 걱정 없이 마음 껏
              활용하시기 바랍니다.
            </StyledH6>
            <StyledH4>#3. DEDE에서 배달하고 인센티브 받자!</StyledH4>
            <StyledH6>
              배달한 만큼, 먼 거리를 가신 만큼 더 많은 보상과 인센티브를
              지급받으세요!
            </StyledH6>
            <StyledH4>#4. Why DEDE?</StyledH4>
            <StyledH6>
              DEDE는 DECENTRALIZED DELIVERY의 약자로 생태계를 구성하고 있는
              고객님 모두가 수수료 없이 생태계를 마음껏 누릴 수 있는 탈중앙 배달
              플랫폼입니다.
            </StyledH6>
          </SectionH4>
        </IntroSection>
      </StyledSection>
      <StyledSection>
        <AboutSection>
          <StyledH1>Token Economy Flow</StyledH1>
          <AboutText>
            <StyledH3>#1. Platform Level</StyledH3>
            <StyledH6>
              ・ DEDE의 핵심은 이용자 모두에게 합리적 이윤분배가 가능
            </StyledH6>
            <StyledH6>
              ・ 사용자 모두가 생태계의 발전에 기여하고 보상과 인센티브를 받는
              선순환구조
            </StyledH6>
            <StyledH6>
              ・ 철저한 유동성관리를 통한 안전성과 지속가능성 보장
            </StyledH6>
            <StyledH3> #2. Service Level</StyledH3>
            <StyledH4> 1) 주문고객</StyledH4>
            <StyledH6>
              ・ DEDE Token으로 식당의 NFT시즌권을 활용하여 풍성한 할인혜택 가능
            </StyledH6>
            <StyledH4> 2) 사장님</StyledH4>
            <StyledH6>・ 플랫폼 사용료 면제</StyledH6>
            <StyledH6>
              ・ 광고비 부담 없이 토큰 Staking만으로도 상단 메인노출 광고효과
            </StyledH6>
            <StyledH6>
              ・ 자체 NFT발행을 통한 멤버십 및 단골고객 관리 가능
            </StyledH6>
            <StyledH4> 3) 배달원</StyledH4>
            <StyledH6>・ 연계수수료 면제, 배달 인센티브 전액 수령</StyledH6>
            <StyledH6>
              ・ Staking을 통한 추가 배달거리 및 보상 획득 가능
            </StyledH6>
            <StyledH6>
              ・ 일반 유저계정으로 토큰 송금 시 수수료 할인 혜택
            </StyledH6>
          </AboutText>
        </AboutSection>
      </StyledSection>
      <TeamSection>
        <StyledH1>Our Team</StyledH1>
        <TeamIconSection>
          <TeamIcon1>
            <FaUserSecret size={"200"} />
            <StackLabel>Smart Contract & Front-end</StackLabel>
            <NameLabel> 권 한 준</NameLabel>
          </TeamIcon1>
          <TeamIcon2>
            <FaUserSecret size={"200"} />
            <StackLabel>Back-end & Front-end</StackLabel>
            <NameLabel> 허 정 </NameLabel>
          </TeamIcon2>
          <TeamIcon3>
            <FaUserSecret size={"200"} />
            <StackLabel>Front-end & UI Design</StackLabel>
            <NameLabel> 강 성 우 </NameLabel>
          </TeamIcon3>
        </TeamIconSection>
      </TeamSection>
    </StyledMain>
  );
};

export default Home;
