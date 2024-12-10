import ReactModal from "react-modal";
import styled from "styled-components";
import useCollectionsDeleteStore from "../../../store/collections/useCollectionsDeleteStore";


const MODALTEXTS = {
  modalTitle: "알림",
  deleteComment: "컬렉션을 정말 삭제하시겠어요?",
  cancel: "취소",
  confirm: "확인",
};

ReactModal.setAppElement("#root");

const CommentDeleteModal = () => {
  const { isModalOpen, closeModal, selectedCollection, removeCollection } =
    useCollectionsDeleteStore();

  const handleConfirm = () => {
    removeCollection(selectedCollection.id); // 선택된 컬렉션 삭제
    closeModal(); // 모달 닫기
  };

  if (!isModalOpen) return null;

  return (
    <ReactModal isOpen={isModalOpen} onRequestClose={closeModal} style={customStyles}>
      <S.Container>
        <S.Title>{MODALTEXTS.modalTitle}</S.Title>
        <S.Message>{MODALTEXTS.deleteComment}</S.Message>
        <S.ButtonGroup>
          <S.CancelButton onClick={closeModal}>{MODALTEXTS.cancel}</S.CancelButton>
          <S.Divider />
          <S.ConfirmButton onClick={handleConfirm}>{MODALTEXTS.confirm}</S.ConfirmButton>
        </S.ButtonGroup>
      </S.Container>
    </ReactModal>
  );
};

export default CommentDeleteModal;

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  content: {
    width: "17.5rem",
    height: "7.5rem",
    margin: "auto",
    borderRadius: "0.62rem",
    padding: "1.25rem 0 0 0",
    overflow: "hidden",
  },
};

const S = {
  Container: styled.div`
    width: 15rem;
    margin: 0 1.25rem;
    text-align: center;
  `,
  Title: styled.h2`
    font-family: ${(props) => props.theme.font.fontSuitBold};
    font-weight: ${(props) => props.theme.font.fontWeightBold};
    font-size: 1.1rem;
    margin: 0;
  `,
  Message: styled.div`
    font-family: ${(props) => props.theme.font.fontSuitRegular};
    font-size: 0.9rem;
    color: ${(props) => props.theme.color.fontGray};
    margin: 0.5rem 0 1.5rem;
  `,
  ButtonGroup: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 15rem;
    border-top: ${(props) => props.theme.font.borderDefault};
  `,
  CancelButton: styled.button`
    flex: 1;
    font-family: ${(props) => props.theme.font.fontSuitRegular};
    font-size: 1rem;
    color: ${(props) => props.theme.color.fontPink};
    background: none;
    border: none;
    cursor: pointer;
    margin: 0.69rem 0;
  `,
  Divider: styled.div`
    width: 0.1rem;
    height: 1.5rem;
    background-color: ${(props) => props.theme.color.commentColor};
  `,
  ConfirmButton: styled.button`
    flex: 1;
    font-family: ${(props) => props.theme.font.fontSuitRegular};
    font-size: 1rem;
    color: ${(props) => props.theme.color.fontPink};
    background: none;
    border: none;
    cursor: pointer;
    margin: 0.69rem 0;
  `,
};
