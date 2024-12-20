import TopHeader from '../../components/common/back/TopHeader';
import MovieMoreComment from '../../components/features/movieDetail/MovieMoreComment';
import { CardContainer, CommentPageContainer } from '../../styles/comment/comment';
import { useParams } from 'react-router-dom';
import { useMovieComment } from '../../apis/movieDetail/query';
const MovieCommentDetail = () => {
  const { id } = useParams();
  const { data: movieComment } = useMovieComment(id);
  const movieCommentData = movieComment?.data?.content || [];

  return (
    <CommentPageContainer>
      <TopHeader title="코멘트" />
      <CardContainer>
        <MovieMoreComment comments={movieCommentData} />
      </CardContainer>
    </CommentPageContainer>
  );
};

export default MovieCommentDetail;
