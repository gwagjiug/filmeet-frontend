import { postRefresh } from "../users/user";

export const fetchRegisteredMovies = async ({ page = 1, size = 7, query = '' }) => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        throw new Error('로그인이 필요합니다.');
    }

    const url = `${import.meta.env.VITE_API_BASE_URL}/admin/movies?page=${page}&size=${size}&query=${encodeURIComponent(query)}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (response.status === 401) {
        console.warn('Access Token 만료됨. 갱신 시도 중...');
        const refreshToken = localStorage.getItem('refreshToken');
        await postRefresh(refreshToken);
        const newAccessToken = localStorage.getItem('accessToken');

        const retryResponse = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${newAccessToken}`,
            },
        });

        if (!retryResponse.ok) {
            throw new Error('영화 목록 조회 실패');
        }

        return retryResponse.json();
    }

    if (!response.ok) {
        throw new Error('영화 목록 조회 실패');
    }

    return response.json();
};
