import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MovieSearchModal from '../common/modal/MovieSearchModal';
import { updateCollection } from '../../apis/myPage/collection/collectiondetail';
import useCollectionsStore from '../../store/collections/useCollectionsStore';
import { useParams } from 'react-router-dom';

const CollectionsLabel = {
  EditCollection: '컬렉션 수정',
  Create: '수정 완료',
  CollectionTitlePlaceholder: '컬렉션 제목',
  CollectionDescriptionPlaceholder: '설명을 입력하기..',
  Movies: '작품들',
  Edit: '수정하기',
  RemoveSelected: '개 제거',
  AddMovie: '작품 추가',
  Cancel: '취소',
};

const EditCollection = () => {
  const { collectionId } = useParams();

  const {
    selectedCollection,
    collectionMovies,
    collectionMoviesLoading,
    fetchCollectionMovies,
    title,
    description,
    selectedMovies,
    isEditing,
    moviesToRemove,
    isModalOpen,
    openModal,
    closeModal,
    setTitle,
    setDescription,
    addMovies,
    toggleMovieToRemove,
    removeSelectedMovies,
    enableEditMode,
    disableEditMode,
    resetFields,
    confirmTempSelectedMovies,
  } = useCollectionsStore();

  const navigate = useNavigate();

  //컬렉션 상세에서 수정하기 누를시 제목, 내용 가져오기 위해서서
  useEffect(() => {
    if (selectedCollection) {
      setTitle(selectedCollection.collectionTitle || '');
      setDescription(selectedCollection.collectionContent || '');
      // 특정 컬렉션의 영화 가져오기
      fetchCollectionMovies(selectedCollection.collectionId);
    }
  }, [selectedCollection, setTitle, setDescription, fetchCollectionMovies]);

  //컬렉션 상세에서 수정하기 누를시 영화목록 가져오기 위해서
  useEffect(() => {
    if (!collectionMoviesLoading) {
      // 가져온 영화 데이터를 selectedMovies로 설정
      const formattedMovies = (collectionMovies || []).map((movie) => ({
        id: movie.movieId,
        title: movie.title,
        image: movie.posterImage,
        releaseDate: movie.releaseDate,
      }));
      addMovies(formattedMovies);
    }
  }, [collectionMovies, collectionMoviesLoading, addMovies]);

  const handleSaveCollection = async () => {
    if (!title.trim() || !description.trim()) {
      return;
    }
    const movieIds = selectedMovies.map((movie) => movie.id); // 영화 ID 목록 생성
    const updatedCollection = {
      title: title.trim(),
      content: description.trim(),
      collectionId: selectedCollection.collectionId,
      movieIds,
    };

    await updateCollection(updatedCollection); // PATCH 요청
    resetFields(); // 상태 초기화
    navigate(`/mypage/collections/detail/${collectionId}`); // 목록 페이지로 이동
  };

  const handleCancelEdit = () => {
    disableEditMode();
  };

  const handleRemoveSelectedMovies = () => {
    if (moviesToRemove.length === 0) {
      return;
    }
    removeSelectedMovies();
  };

  const hasContent = title.trim() !== '' || description.trim() !== '';

  return (
    <S.Container>
      <S.HeaderContainer>
        <S.Header>{CollectionsLabel.EditCollection}</S.Header>
        <S.SaveButton hasContent={hasContent} onClick={handleSaveCollection}>
          {CollectionsLabel.Create}
        </S.SaveButton>
      </S.HeaderContainer>
      <S.InputContainer>
        <S.InputBox>
          <S.Input
            type="text"
            placeholder={CollectionsLabel.CollectionTitlePlaceholder}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </S.InputBox>
        <S.InputBox>
          <S.Textarea
            placeholder={CollectionsLabel.CollectionDescriptionPlaceholder}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </S.InputBox>
      </S.InputContainer>
      <S.Section>
        <S.SectionHeader>
          <span>{CollectionsLabel.Movies}</span>
          {selectedMovies.length > 0 &&
            (isEditing ? (
              <S.ActionButtons>
                <S.CancelButton onClick={handleCancelEdit}>
                  {CollectionsLabel.Cancel}
                </S.CancelButton>
                <S.RemoveButton
                  onClick={handleRemoveSelectedMovies}
                  disabled={moviesToRemove.length === 0}>
                  {moviesToRemove.length}
                  {CollectionsLabel.RemoveSelected}
                </S.RemoveButton>
              </S.ActionButtons>
            ) : (
              <S.EditButton onClick={enableEditMode}>{CollectionsLabel.Edit}</S.EditButton>
            ))}
        </S.SectionHeader>
        <S.MoviesGrid>
          <S.AddCard onClick={openModal}>
            <S.PlusSign>+</S.PlusSign>
            <S.AddText>{CollectionsLabel.AddMovie}</S.AddText>
          </S.AddCard>
          {selectedMovies.map((movie) => (
            <S.MovieThumbnail key={movie.id} isSelected={moviesToRemove.includes(movie.id)}>
              <S.ThumbnailImage src={movie.image} alt={movie.title} />
              <S.ThumbnailTitle>{movie.title}</S.ThumbnailTitle>
              {isEditing && (
                <S.RemoveIcon
                  isSelected={moviesToRemove.includes(movie.id)}
                  onClick={() => toggleMovieToRemove(movie.id)}>
                  ⨉
                </S.RemoveIcon>
              )}
            </S.MovieThumbnail>
          ))}
        </S.MoviesGrid>
      </S.Section>
      {isModalOpen && (
        <MovieSearchModal
          onAddMovies={(movies) => {
            addMovies(movies);
            confirmTempSelectedMovies();
            closeModal();
          }}
        />
      )}
    </S.Container>
  );
};

export default EditCollection;

const S = {
  Container: styled.div`
    width: 100%;
    max-width: 40rem;
    margin: 0 auto;
    padding: 1.25rem 0;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  `,

  HeaderContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  Header: styled.h1`
    font-family: ${(props) => props.theme.font.fontSuitBold};
    font-size: 1.6rem;
  `,

  SaveButton: styled.button`
    padding: 0.3rem 0.9rem;
    border: 0.1rem solid ${(props) => props.theme.color.collectionColor};
    border-radius: 0.3rem;
    background-color: transparent;
    color: ${(props) =>
      props.hasContent ? props.theme.color.fontPink : props.theme.color.collectionColor};
    font-family: ${(props) => props.theme.font.fontSuitRegular};
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  `,

  InputContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.3rem;
  `,

  InputBox: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
  `,

  Input: styled.input`
    padding: 0.4rem 0 1.2rem;
    border: none;
    border-bottom: 0.1rem solid ${(props) => props.theme.color.collectionColor};
    outline: none;
    font-family: ${(props) => props.theme.font.fontSuitRegular};
    font-size: 1rem;

    &::placeholder {
      color: ${(props) => props.theme.color.collectionColor};
    }
  `,

  Textarea: styled.textarea`
    padding: 0.4rem 0 7rem;
    border: none;
    border-bottom: 0.1rem solid ${(props) => props.theme.color.collectionColor};
    outline: none;
    resize: none;
    height: 3.8rem;
    line-height: 1;
    font-family: ${(props) => props.theme.font.fontSuitRegular};
    font-size: 1rem;

    &::placeholder {
      color: ${(props) => props.theme.color.collectionColor};
    }
  `,

  Section: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  `,

  SectionHeader: styled.div`
    display: flex;
    justify-content: space-between;
    font-family: ${(props) => props.theme.font.fontSuitBold};
    font-size: 1.4rem;
    color: ${(props) => props.theme.color.fontBlack};
  `,

  MoviesGrid: styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(6.1rem, 1fr));
    gap: 0.6rem;
    margin-top: 1.5rem;
  `,

  AddCard: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 6rem;
    height: 9rem;
    margin: 0;
    border: 0.1rem solid ${(props) => props.theme.color.collectionColor};
    border-radius: 0.3rem;
    background-color: ${(props) => props.theme.color.commentColor};
    color: ${(props) => props.theme.color.collectionColor};
    text-align: center;
    font-family: ${(props) => props.theme.font.fontSuitRegular};
    cursor: pointer;
  `,

  PlusSign: styled.div`
    font-size: 3rem;
    color: ${(props) => props.theme.color.collectionColor};
  `,

  AddText: styled.div`
    margin-top: 0.3rem;
    font-family: ${(props) => props.theme.font.fontSuitRegular};
    font-size: 1rem;
    color: ${(props) => props.theme.color.collectionColor};
  `,

  MovieThumbnail: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 6rem;
    margin: 0 auto;
    border-radius: 0.3rem;
    overflow: hidden;
    text-align: center;
    font-family: ${(props) => props.theme.font.fontSuitRegular};
  `,

  ThumbnailImage: styled.img`
    width: 100%;
    height: 9rem;
    object-fit: cover;
    border-radius: 0.3rem;
  `,

  ThumbnailTitle: styled.div`
    margin-top: 0.4rem;
    width: 100%;
    font-family: ${(props) => props.theme.font.fontSuitRegular};
    font-size: 0.9rem;
    color: ${(props) => props.theme.color.fontBlack};
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,

  RemoveIcon: styled.div`
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
    font-size: 1rem;
    color: ${(props) =>
      props.isSelected ? props.theme.color.fontPink : props.theme.color.fontWhite};
    cursor: pointer;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: ${(props) => props.theme.color.fontPink};
    }
  `,

  EditButton: styled.button`
    border: none;
    background: none;
    font-family: ${(props) => props.theme.font.fontSuitRegular};
    font-size: 0.8rem;
    color: ${(props) => props.theme.color.fontPink};
    cursor: pointer;
  `,

  RemoveButton: styled.button`
    border: none;
    background: none;
    font-family: ${(props) => props.theme.font.fontSuitRegular};
    font-size: 0.8rem;
    color: ${(props) =>
      props.disabled ? props.theme.color.collectionColor : props.theme.color.fontPink};
    cursor: pointer;
  `,

  ActionButtons: styled.div`
    display: flex;
    align-items: center;
  `,

  CancelButton: styled.button`
    border: none;
    background: none;
    font-family: ${(props) => props.theme.font.fontSuitRegular};
    font-size: 0.8rem;
    color: ${(props) => props.theme.color.fontPink};
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  `,
};
