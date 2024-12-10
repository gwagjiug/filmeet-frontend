import styled from "styled-components";
import ReactModal from "react-modal";
import useCommentStore from "../../../store/modal/useCommentStore";
import { useEffect } from "react";

ReactModal.setAppElement("#root");

const CommentEditModal = ({ onSubmit }) => {
  const { isOpen, modalType, commentData, comment, closeModal, setComment } = useCommentStore();

  useEffect(() => {
    if ((modalType === "edit" || modalType === "comment") && isOpen && commentData?.comment) {
      setComment(commentData.comment);
    }
  }, [isOpen, modalType, commentData, setComment]);

  if (!isOpen || (modalType !== "edit" && modalType !== "comment")) return null;

  const handleSave = () => {
    if (onSubmit) {
      onSubmit({ ...commentData, comment });
    }
    closeModal();
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const getPlaceholder = () => {
    if (modalType === "edit") {
      return "내용을 수정해주세요.";
    } else if (modalType === "comment") {
      return `"${commentData?.title || "제목 없음"}"에 대한 생각을 표현해주세요.`;
    }
    return ""; // 기본값 반환
  };
  

  return (
    <ReactModal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
           <S.Content>
        <S.CommentHeader>
          <S.CommentTitle>{modalType === "edit" ? (commentData?.title || "댓글 수정") : "댓글"}</S.CommentTitle>
          <S.CloseButton onClick={closeModal}>X</S.CloseButton>
        </S.CommentHeader>
        <S.CommentContent>
          <S.TextArea
            value={comment}
            onChange={handleChange}
            placeholder={getPlaceholder()}
            maxLength={10000}
          />
        </S.CommentContent>
        <S.Footer>
          <S.TextLength>{(comment || "").length}/10000</S.TextLength>
          <S.SaveButton onClick={handleSave}>{modalType === "comment" ? "저장" : "수정"}</S.SaveButton>
        </S.Footer>
      </S.Content>
    </ReactModal>
  );
};

export default CommentEditModal;

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    width: "40rem",
    height: "29rem",
    margin: "auto",
    borderRadius: "0.62rem",
    padding: "0",
    overflow: "hidden",
  },
};



const S = {
  Content: styled.div`
    width: 37.5rem;
    height: 26.87rem;
    padding: 1.12rem 1.25rem 1.12rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
  CommentHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2.06rem;
  `,
  CommentTitle: styled.div`
    text-align: left;
    font-family: ${(props) => props.theme.font.fontSuitBold};
    font-size: 1.12rem;
  `,
  CloseButton: styled.button`
    background: none;
    border: none;
    font-size: 1rem;
    color: ${(props) => props.theme.color.fontGray};
    cursor: pointer;
  `,
  CommentContent: styled.div`
    flex: 1;
    margin: 0.62rem 0;
  `,
  TextArea: styled.textarea`
    width: 100%;
    min-height: 20.62rem;
    border: none;
    outline: none;
    border-radius: 0.25rem;
    padding: 0;
    font-family: ${(props) => props.theme.font.fontSuitRegular};
    font-size: 0.8rem;
    resize: none;
  `,
  Footer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2.06rem;
  `,
  TextLength: styled.div`
    font-size: 0.87rem;
    color: ${(props) => props.theme.color.fontGray};
  `,
  SaveButton: styled.button`
    width: 5rem;
    height: 2.25rem;
    background-color: ${(props) => props.theme.color.fontPink};
    color: ${(props) => props.theme.color.mainColor};
    font-size: 0.87rem;
    border: none;
    cursor: pointer;
    border-radius: 0.25rem;
  `,
};