import React, { useState } from "react";
import Video from "../../videos/video.mp4";
import { Button } from "../ButtonElement";
import {
  HomeContainer,
  HomeBg,
  VideoBg,
  HomeContent,
  HomeH1,
  HomeH2,
  HomeP,
  HomeA,
  HomeBtnWrapper,
  ArrowForward,
  ArrowRight,
} from "./HomeElements";

const HomeSection = () => {
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(!hover);
  };

  return (
    <HomeContainer>
      <HomeBg>
        <VideoBg autoPlay loop muted src={Video} type="video/mp4" />
      </HomeBg>
      <HomeContent>
        <HomeH1>DECENTRALIZED DELIVERY: BEGINS</HomeH1>
        <HomeH2>
          같은 민족, 다른 배달! 진짜가 나타나다! DEDE와 모두 함께 웃어요!
        </HomeH2>
        <HomeP>
          <br />
          <br />
          <br />
          #1. 주문고객님, 비싼 배달료 때문에 주문을 망설였던 적이 있나요?
        </HomeP>
        <HomeA>
          배달료는 저희가 부담하겠습니다. DEDE를 통해 주문해보세요. 지금까지는
          경험해보지 못한 엄청난 혜택이 기다리고 있습니다.
        </HomeA>
        <br />
        <HomeP>
          #2. 사장님, 비싼 수수료는 이제 저희가 평생 지원하겠습니다!
        </HomeP>
        <HomeA>
          모두가 WinWin하는 DEDE생태계에서 비싼 사용료 걱정 없이 마음 껏
          활용하시기 바랍니다.
        </HomeA>
        <br />
        <HomeP>#3. DEDE에서 배달하고 인센티브 받자!</HomeP>
        <HomeA>
          배달한 만큼, 먼 거리를 가신 만큼 더 많은 보상과 인센티브를
          지급받으세요!
        </HomeA>
        <br />
        <HomeP>#4. Why DEDE?</HomeP>
        <HomeA>
          DEDE는 DECENTRALIZED DELIVERY의 약자로 생태계를 구성하고 있는 고객님
          모두가 수수료 없이 생태계를 마음껏 누릴 수 있는 탈중앙 배달
          플랫폼입니다.
        </HomeA>
        <HomeBtnWrapper>
          <Button to="signup" onMouseEnter={onHover} onMouseLeave={onHover}>
            Get started {hover ? <ArrowForward /> : <ArrowRight />}
          </Button>
        </HomeBtnWrapper>
      </HomeContent>
    </HomeContainer>
  );
};

export default HomeSection;
