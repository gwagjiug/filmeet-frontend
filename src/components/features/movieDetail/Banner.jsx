import styled from "styled-components";
import { movieDetailData } from "../../../data/moviedetail";

function Banner() {
  const { title, releaseDate, runtime, genre, backgroundUrl, posterUrl } = movieDetailData;

  return (
    <S.BannerContainer bgImage={posterUrl}>
      <S.BannerContentContainer>
        <S.BannerContent>
        <S.BannerTitle>{title}</S.BannerTitle>
        <S.BannerSubTitle>{title}</S.BannerSubTitle>
          <S.BannerSubContent>{`${releaseDate} | ${runtime}분 | ${genre}`}</S.BannerSubContent>
        </S.BannerContent>
      </S.BannerContentContainer>
    </S.BannerContainer>
  );
}

export default Banner;

const S = {
  BannerContainer: styled.div`
    position: relative;
    width: 100%;
    height: 25rem;
    background: url(${(props) => props.bgImage}) center;
    background-size: cover;
  `,

  BannerContentContainer: styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    top: 45%;
    left: 0;
    width: 82.5rem;
    height: 11rem;
    margin: 0 19rem;
  `,

  BannerContent: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    width: 14rem;
    height: 11rem;
  `,

  BannerTitle: styled.h1`
    margin: 0;
    font-size: 2rem;
    font-family: ${(props) => props.theme.font.fontSuitBold};
    color: ${(props) => props.theme.color.fontWhite};
  `,

  BannerSubTitle: styled.div`
    margin: 1rem 0 0;
    font-size: 0.8rem;
    font-family: ${(props) => props.theme.font.fontSuitRegular};
    color: ${(props) => props.theme.color.fontWhite};
  `,

  BannerSubContent: styled.div`
    margin: 0.5rem 0 0;
    font-size: 0.8rem;
    font-family: ${(props) => props.theme.font.fontSuitRegular};
    color: ${(props) => props.theme.color.fontWhite};
  `,
};


