import React from "react";
import {
  AboutContainer,
  AboutDetail,
  AboutH1,
  AboutP,
  AboutA,
  AboutL,
  AboutToken,
} from "./AboutElements";
import TokenEcoImg from "../../images/dedeTokenEco.png";

const AboutSection = () => {
  return (
    <>
      <AboutContainer>
        <AboutToken>
          <img
            style={{
              width: "25rem",
            }}
            src={TokenEcoImg}
          />
        </AboutToken>
        <AboutDetail>
          <AboutH1>Token Economy Flow</AboutH1>
          <br />
          <br />
          <AboutP>#1. Platform Level</AboutP>
          <AboutA>
            ・ DEDE의 핵심은 이용자 모두에게 합리적 이윤분배가 가능
          </AboutA>
          <br />
          <AboutA>
            ・ 사용자 모두가 생태계의 발전에 기여하고 보상과 인센티브를 받는
            선순환구조
          </AboutA>
          <br />
          <AboutA>・ 철저한 유동성관리를 통한 안전성과 지속가능성 보장</AboutA>
          <br />
          <br />
          <br />
          <AboutP>#2. Service Level</AboutP>
          <AboutL> 1) 주문고객</AboutL>
          <br />
          <AboutA>
            ・ DEDE Token으로 식당의 NFT시즌권을 활용하여 풍성한 할인혜택 가능
            <br />
          </AboutA>
          <br />
          <AboutL> 2) 사장님</AboutL>
          <br />
          <AboutA>・ 플랫폼 사용료 면제</AboutA> <br />
          <AboutA>
            ・ 광고비 부담 없이 토큰 Staking만으로도 상단 메인노출 광고효과
          </AboutA>
          <br />
          <AboutA>
            ・ 자체 NFT발행을 통한 멤버십 및 단골고객 관리 가능
          </AboutA>{" "}
          <br />
          <br />
          <AboutL> 3) 배달원</AboutL>
          <br />
          <AboutA>・ 연계수수료 면제, 배달 인센티브 전액 수령</AboutA> <br />
          <AboutA>
            ・ Staking을 통한 추가 배달거리 및 보상 획득 가능
          </AboutA>{" "}
          <br />
          <AboutA>
            ・ 일반 유저계정으로 토큰 송금 시 수수료 할인 혜택
          </AboutA>{" "}
          <br />
        </AboutDetail>
      </AboutContainer>
    </>
  );
};

export default AboutSection;
