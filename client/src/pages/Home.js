import React, { useState } from "react";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <br />
      <br />
      <div>DECENTRALIZED DELIVERY: BEGINS</div>
      <div>같은 민족, 다른 배달! 진짜가 나타나다! DEDE와 모두 함께 웃어요!</div>
      <div>
        <br />
        <br />
        #1. 주문고객님, 비싼 배달료 때문에 주문을 망설였던 적이 있나요?
      </div>
      <div>
        배달료는 저희가 부담하겠습니다. DEDE를 통해 주문해보세요. 지금까지는
        경험해보지 못한 엄청난 혜택이 기다리고 있습니다.
      </div>
      <br />
      <div>#2. 사장님, 비싼 수수료는 이제 저희가 평생 지원하겠습니다!</div>
      <div>
        모두가 WinWin하는 DEDE생태계에서 비싼 사용료 걱정 없이 마음 껏
        활용하시기 바랍니다.
      </div>
      <br />
      <div>#3. DEDE에서 배달하고 인센티브 받자!</div>
      <div>
        배달한 만큼, 먼 거리를 가신 만큼 더 많은 보상과 인센티브를 지급받으세요!
      </div>
      <br />
      <div>#4. Why DEDE?</div>
      <div>
        DEDE는 DECENTRALIZED DELIVERY의 약자로 생태계를 구성하고 있는 고객님
        모두가 수수료 없이 생태계를 마음껏 누릴 수 있는 탈중앙 배달
        플랫폼입니다.
      </div>
      <br />
      <br />
      <br />
      <div>
        <div>Token Economy Flow</div>
        <br />
        <br />
        <div>#1. Platform Level</div>
        <div>・ DEDE의 핵심은 이용자 모두에게 합리적 이윤분배가 가능</div>
        <div>
          ・ 사용자 모두가 생태계의 발전에 기여하고 보상과 인센티브를 받는
          선순환구조
        </div>
        <div>・ 철저한 유동성관리를 통한 안전성과 지속가능성 보장</div>
        <br />
        <div> #2. Service Level</div>
        <div> 1) 주문고객</div>
        <div>
          ・ DEDE Token으로 식당의 NFT시즌권을 활용하여 풍성한 할인혜택 가능
          <br />
        </div>
        <br />
        <div> 2) 사장님</div>
        <div>・ 플랫폼 사용료 면제</div>
        <div>
          ・ 광고비 부담 없이 토큰 Staking만으로도 상단 메인노출 광고효과
        </div>
        <div>・ 자체 NFT발행을 통한 멤버십 및 단골고객 관리 가능</div>
        <br />
        <div> 3) 배달원</div>
        <div>・ 연계수수료 면제, 배달 인센티브 전액 수령</div>
        <div>・ Staking을 통한 추가 배달거리 및 보상 획득 가능</div>
        <div>・ 일반 유저계정으로 토큰 송금 시 수수료 할인 혜택</div>
      </div>
    </>
  );
};

export default Home;
