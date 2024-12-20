import styled from 'styled-components';
import { useEvaluation } from '../../apis/getMovies/queries';
const StarRatingHeader = () => {
  const { data } = useEvaluation();
  const firstPage = data?.pages?.[0];
  const ratedCount = firstPage?.data?.ratedMovieCount;

  return (
    <S.HeaderContainer>
      <S.Title>{ratedCount}</S.Title>
      <S.SubTitle>{`${ratedCount || 0}개의 영화가 평가되었습니다.`}</S.SubTitle>
    </S.HeaderContainer>
  );
};

export default StarRatingHeader;

const S = {
  HeaderContainer: styled.div`
    padding: 0.5rem 0rem;
    top: 0;
    z-index: 10;
    width: 40rem;
    height: 5.6rem;
    margin: 1.75rem 0 0;
    border: 0.06rem solid ${(props) => props.theme.color.lineColor};
    border-radius: 0.6rem 0.6rem 0 0;
    background-color: ${(props) => props.theme.color.mainColor};
    text-align: center;
  `,

  Title: styled.h1`
    font-family: ${(props) => props.theme.font.fontSuitBold};
    font-size: 1.5rem;
    color: ${(props) => props.theme.color.fontPink};
    text-align: center;
  `,

  SubTitle: styled.p`
    font-family: ${(props) => props.theme.font.fontSuitRegular};
    font-size: 1rem;
    color: ${(props) => props.theme.color.fontGray};
  `,
};
