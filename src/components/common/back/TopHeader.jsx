import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const TopHeader = ({ title }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <TopContainer>
      <BackButton onClick={handleBackClick}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </BackButton>
      <TopTitle>{title}</TopTitle>
    </TopContainer>
  );
};

const TopContainer = styled.div`
  width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: auto;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: ${(props) => props.theme.color.mainColor};
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  margin: 1rem 4px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.color.fontPink};
  font-size: 1.2rem;
`;

const TopTitle = styled.p`
  padding: 0 0 0 0;
  font-family: ${(props) => props.theme.font.fontSuitBold};
  font-size: 1.2rem;
  margin: 0 4px 10px;
`;

export default TopHeader;
