import styled from "@emotion/styled";
import { css } from "@emotion/react";

export interface IBgWeatherProps {
  partOfDay?: string;
  weather?: string;
}
// responsive
export const responsiveWrapper = css`
  display: flex;

  @media (min-width: 280px) and (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    padding: 0;
  }
`;
export const responsiveWidth = css`
  @media (min-width: 280px) and (max-width: 1024px) {
    width: 100%;
    margin: 70px auto;
    box-sizing: border-box;
    padding: 20px;
  }
`;
export const responsiveInput = css`
  @media (min-width: 280px) and (max-width: 1024px) {
    margin-top: 40px;
    width: 100%;
    padding: 10px 0;
    font-size: 15px;
  }
`;
export const responsiveSearch = css`
  @media (min-width: 280px) and (max-width: 1024px) {
    // margin-top: 40px;
    width: 100%;
    // padding: 10px 0;
    // font-size: 15px;
  }
`;
export const responsiveWidthForecast = css`
  @media (min-width: 280px) and (max-width: 1024px) {
    width: 100%;
    padding: 20px 0;
  }
`;
export const responsiveFont = css`
  @media (min-width: 280px) and (max-width: 1024px) {
    font-size: 18px;
  }
`;
export const responsiveImage = css`
  @media (min-width: 280px) and (max-width: 1024px) {
    width: 30px;
  }
`;
// import { Rate, Modal } from "antd";
export const Wrapper = styled.div`
  overflow: hidden;
  width: 100vw;
  min-height: 100vh;
  // background: url("/Clear.bg.png");

  background: ${(props: IBgWeatherProps) =>
    `url("/bg/${props.weather}.${props.partOfDay}.png")` ||
    'url("/bg/Clear.bg.png")'};
 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 40px;
`;
export const WrapperContent = styled.div`
  // width: 100%;
  width: 100%;
  box-sizing: border-box;
    padding: 40px;
  // padding: 60px;
  // display: flex;
  ${responsiveWrapper}// align-items: center;
  // justify-content: center;
`;
export const CurrentWeather = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  // align-items: center;
  justify-content: space-between;
  margin: 70px auto;
  ${responsiveWidth}
`;
export const CurrentWeatherH1 = styled.h1`
  color: #fff;
  font-weight: 700;
  font-size: 60px;
  margin: 0;
`;
export const CurrentWeatherH2 = styled.h2`
  color: #fff;
  font-weight: 500;
  font-size: 30px;
  margin: 10px 0 0 0;
`;
export const CurrentWeatherP = styled.p`
  color: #fff;
  // font-weight: 400;
  font-size: 18px;
  margin: 10px 0 0 0;
`;
export const CurrentWeatherInput = styled.input`
  background: none;
  border: none;
  padding: 10px 20px;
  border-bottom: solid 1px #fff;
  width: 400px;
  color: #fff;
  font-size: 20px;
  ::placeholder {
    color: #fff; /* Change this to your desired placeholder color */
    font-size: 20px;
  }

  ${responsiveInput}
`;
//
export const ForecastWeather = styled.div`
  width: 50%;
  ${responsiveWidth}
`;
export const ForecastWeatherH1 = styled.h1`
  color: #fff;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 30px;
  backdrop-filter: blur(0.5px);
  -webkit-backdrop-filter: blur(0.5px);
  width: 120px;
  text-align: center;
  font-size: 30px;
  padding: 10px 40px;
`;
export const ForecastWeatherCon = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 30px;
  backdrop-filter: blur(0.5px);
  -webkit-backdrop-filter: blur(0.5px);
  padding: 40px;
  width: 80%;
  ${responsiveWidthForecast}
`;
export const ForecastToday = styled.div`
  display: flex;
  border-bottom: 2px solid #fff;
`;

export const TodayIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 0 20px 0;
`;
export const TodayIconH2 = styled.h2`
  color: #fff;
  font-size: 24px;
  font-weight: 500;
  margin: 0 0 10px 0;
  ${responsiveFont}
`;
export const TodayIConImage = styled.img`
  width: 60px;
  ${responsiveImage}
`;
export const ForecastIconCon = styled.div`
  // border: 2px solid red;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-content: center;
  align-items: center;
  /* grid-template-columns: repeat(2, 1fr, 2fr); */
  // grid-template-rows: repeat(4, 20px);
  /* grid-template-rows: 100px 100px 100px 100px; */
  // grid-gap: 5px;
  border-bottom: dashed 2px #fff;
  padding: 20px 0;
  text-align: center;
`;
export const ForecastIcon = styled.div`
  display: flex;
`;
export const ForecastIconP = styled.p`
  color: #fff;
  font-size: 18px;
  font-weight: 400;
  // padding-left: 30px;
`;
export const ForecastIconImage = styled.img`
  width: 48px;
  ${responsiveImage}
`;
//
export const Footer = styled.footer`
  margin: 60px 20px;
  display: flex;
  justify-content: space-evenly;
  align-content: center;
`;
export const FooterLink = styled.a`
  text-decoration: none;
  font-size: 10px;
  color: #000;
`;
// search btn
export const SearchBtnCon = styled.div`
  position: relative;
  width: 400px;
  ${responsiveSearch}
`;
export const SearchBtn = styled.img`
  position: absolute;
  // width: 30px;
  right: 0%;
  bottom: 0%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;
