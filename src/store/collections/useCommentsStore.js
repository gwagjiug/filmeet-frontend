import { create } from "zustand";
import { getCommentsFromApi, postComment } from "../../apis/myPage/collection/collectioncomment";

const useCommentsStore = create((set, get) => ({
  comments: [],
  commentContent: "",
  comment: "",
  isModalOpen: false,
  commentSubmitting: false,
  error: null,

  // 댓글 입력 상태 업데이트
  setCommentContent: (content) => set({ commentContent: content }),

  // 댓글 추가
  addComment: async (collectionId) => {
    const { commentContent } = get(); // 현재 입력된 댓글 내용 가져오기
    if (!commentContent.trim()) {
      return;
    }

    set({ commentSubmitting: true, error: null });
    try {
      const userNickname = localStorage.getItem("userNickname") || "익명"; // 사용자 닉네임
      const userProfileImage = localStorage.getItem("userProfileImage") || null; // 프로필 이미지

      const newCommentId = await postComment(collectionId, commentContent); // 댓글 작성 API 호출

      // 새 댓글 데이터를 스토어에 추가
      const newComment = {
        id: newCommentId,
        commentContent,
        createdAt: new Date().toISOString(),
        nickname: userNickname, // 사용자 닉네임 추가
        profileImage: userProfileImage, // 사용자 프로필 이미지 추가
      };

      set((state) => ({
        comments: [...state.comments, newComment], // 새로운 댓글 추가
        commentContent: "", // 댓글 입력 상태 초기화
        commentSubmitting: false,
      }));

    } catch (error) {
      set({ commentSubmitting: false, error });
    }
  },

  // 댓글 목록 초기화
  setComments: (fetchedComments) => set({ comments: fetchedComments }),

  // 댓글 목록 불러오기
  fetchComments: async (collectionId, page = 0, size = 20) => {
    set({ error: null });
    try {
      const fetchedComments = await getCommentsFromApi(collectionId, page, size);
      set({ comments: fetchedComments });
    } catch (error) {
      set({ error });
    }
  },

  // 편집 모달 열기 함수
  openEditModal: (comment) => {   
    set({
      isModalOpen: true,
      commentContent: comment,  // comment는 그대로 설정
      collectionCommentId: comment.collectionCommentId, // 댓글 ID
    });
  },

  closeModal: () => set({ 
    isModalOpen: false, 
    commentContent: "",  // 댓글 내용 초기화
  
  }),

  resetError: () => set({ error: null }),
}));

export default useCommentsStore;
