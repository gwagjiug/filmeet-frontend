import styled from "styled-components";
import useCollectionsStore from "../../store/collections/useCollectionsStore";
import Poster from "../Common/poster/Poster";

const CollectionsLabel = {
  Like: "좋아요",
  Comment: "댓글",
  NoData: "데이터를 불러올 수 없습니다.",
  Movies: "작품들",
  count: "개",
};

const CollectionDetail = ({ collectionData }) => {
  const { isDropdownOpen, openDropdownMenu, closeDropdownMenu } =
    useCollectionsStore();

  if (!collectionData) {
    return <div>{CollectionsLabel.NoData}</div>;
  }

  const {
    profileImage = "https://via.placeholder.com/38x38",
    name = "알 수 없음",
    collectionName = "제목 없음",
    description = "설명 없음",
    bannerImage = "https://via.placeholder.com/640x260",
    movies = [],
    likes = 0,
  } = collectionData;

  return (
      <S.Container>
        <S.Header backgroundImage={bannerImage}>
          <S.Overlay />
          <S.Profile>
            <S.ProfileImage src={profileImage} alt={`${name} 프로필`} />
            <S.UserName>{name}</S.UserName>
          </S.Profile>
          <S.MoreOptions>
            ⋮
          </S.MoreOptions>
        </S.Header>

        <S.Content>
          <S.CollectionTitle>{collectionName}</S.CollectionTitle>
          <S.Description>
            {description}
          </S.Description>
            <S.Stats>
              {CollectionsLabel.Like} {likes} {CollectionsLabel.count}{" "}
              {CollectionsLabel.Comment} 0개
            </S.Stats>
        </S.Content>
          <S.Divider />
          <S.MoviesSection>
            <S.SectionHeader>
              <S.SectionTitle>{CollectionsLabel.Movies}</S.SectionTitle>
            </S.SectionHeader>
            <Poster caseType={4} movies={movies} /> 
          </S.MoviesSection>
      </S.Container>
  );
};

export default CollectionDetail;

const S = {
  Container: styled.div`
    width: 40rem;
    height: auto;
    background: ${(props) => props.theme.color.mainColor};
    border: 1px solid ${(props) => props.theme.color.mainColor};
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: ${(props) => props.theme.box.defaulBoxShadow};
  `,

  Header: styled.div`
    position: relative;
    height: 16rem;
    background-image: url(${(props) => props.backgroundImage});
    background-size: cover;
    background-position: center;
  `,

  Overlay: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), transparent);
  `,

  Profile: styled.div`
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    display: flex;
    align-items: center;
    z-index: 2;
  `,

  ProfileImage: styled.img`
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 0.1rem solid ${(props) => props.theme.color.mainColor};
    margin-right: 0.5rem;
  `,

  UserName: styled.span`
    font-family: ${(props) => props.theme.font.fontSuitBold};
    font-size: 1rem;
    color: ${(props) => props.theme.color.mainColor};
  `,

  MoreOptions: styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
    color: ${(props) => props.theme.color.mainColor};
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 2;
  `,

  Content: styled.div`
    width: 37.5rem;
    height: 6rem;
    margin: 0 1.25rem 0 1.25rem;
  `,

  CollectionTitle: styled.h1`
    height: 1.5rem;
    font-family: ${(props) => props.theme.font.fontSuitRegular};
    font-size: 1.1rem;
    margin: 1rem 0 0.4rem 0;
  `,

  Description: styled.p`
    height: 1.1rem;
    font-family: ${(props) => props.theme.font.fontSuitRegular};
    font-size: 0.7rem;
    color: ${(props) => props.theme.color.fontGray};
    margin: 0 0 0 0;
    line-height: 1.5rem;
  `,

  Stats: styled.span`
    height: 1.1rem;
    display: block;
    font-family: ${(props) => props.theme.font.fontSuitRegular};
    font-size: 0.9rem;
    color: ${(props) => props.theme.color.fontGray};
    line-height: 1.1rem;
  `,

  ActionSection: styled.div`
    margin: 1rem 0;
    padding: 0.1rem 0;
  `,

  Divider: styled.div`
    width: 37.5rem; 
    height: 0.1rem; 
    background: ${(props) => props.theme.color.collectionColor}; 
    margin: 1rem 1.25rem 0 1.25rem;
  `,

  MoviesSection: styled.section`
    margin-top: 2rem;
  `,

  SectionHeader: styled.section`
    margin-bottom: 1rem;
  `,

  SectionTitle: styled.h2`
    font-size: 1.2rem;
    font-family: ${(props) => props.theme.font.fontSuitBold};
  `,

  MovieGrid: styled.section`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  `,

  MovieCard: styled.div`
    width: 9.3rem;
    text-align: center;
  `,

  MoviePoster: styled.img`
    width: 40rem;
    height: 16rem;
    object-fit: cover;
    border-radius: 0.5rem;
  `,

  MovieInfo: styled.div`
    margin-top: 0.5rem;
  `,

  MovieTitle: styled.h4`
    font-size: 1rem;
  `,

  DropdownMenu: styled.div`
    position: absolute;
    top: 2.5rem;
    right: 1rem;
    background: ${(props) => props.theme.color.mainColor};
    box-shadow: ${(props) => props.theme.box.defaulBoxShadow};
    border-radius: 0.3rem;
    z-index: 10;
  `,

  DropdownItem: styled.div`
    padding: 0.5rem 1rem;
    cursor: pointer;
  `,
};
