import React from "react";
import { TopContainer, BackButton, TopTitle, FilterContainer, FilterButton } from "../../styles/rating/rating"; // 스타일 컴포넌트
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import useRatingsStore from "../../store/rating/useRatingsStore";
import { useNavigate } from "react-router-dom";
import MovieRatingSections from "./MovieRatingSections";

const PageContent = {
  title: "평가한 작품들",
  filters: [
    { label: "전체", value: "전체" },
    { label: "별점 순", value: "별점 순" },
  ],
};

const ByRatingList = () => {
  const { activeFilter, setActiveFilter } = useRatingsStore();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/mypage/ratings");
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <>
      <TopContainer>
        <BackButton onClick={handleBackClick}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </BackButton>
        <TopTitle>{PageContent.title}</TopTitle>
        <FilterContainer>
          {PageContent.filters.map((filter) => (
            <FilterButton
              key={filter.value}
              isActive={activeFilter === filter.value}
              onClick={() => handleFilterClick(filter.value)}
            >
              {filter.label}
            </FilterButton>
          ))}
        </FilterContainer>
      </TopContainer>
      <MovieRatingSections />
    </>
  );
};

export default ByRatingList;
