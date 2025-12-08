/**
 * API 서비스
 * 백엔드 API와 통신하는 함수들을 관리합니다.
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.x-ink.store';

/**
 * API 요청을 위한 기본 fetch 래퍼
 */
const fetchAPI = async (endpoint, options = {}) => {
  const config = {
    ...options,
    credentials: 'include', // 쿠키를 자동으로 포함
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    // 401 Unauthorized - 로그인 필요
    if (response.status === 401) {
      // 로그인 페이지로 리다이렉트하거나 에러 처리
      throw new Error('UNAUTHORIZED');
    }

    // 응답이 성공적이지 않은 경우
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `API Error: ${response.status}`);
    }

    // 204 No Content인 경우 null 반환
    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * 현재 로그인한 사용자 정보 가져오기
 * @returns {Promise<Object>} 사용자 정보
 */
export const getCurrentUser = async () => {
  return await fetchAPI('/api/auth/me');
};

/**
 * 로그아웃
 * @returns {Promise<void>}
 */
export const logout = async () => {
  return await fetchAPI('/api/auth/logout', {
    method: 'POST',
  });
};

/**
 * 로컬 로그인
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<Object>}
 */
export const loginLocal = async (email, password) => {
  return await fetchAPI('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

/**
 * 회원가입
 * @param {Object} userData 
 * @returns {Promise<Object>}
 */
export const registerUser = async (userData) => {
  return await fetchAPI('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

/**
 * 카카오 로그인 콜백 처리
 * @param {string} code - 카카오 인증 코드
 * @returns {Promise<Object>}
 */
export const kakaoLoginCallback = async (code) => {
  return await fetchAPI(`/api/auth/kakao/callback?code=${code}`);
};

export default {
  getCurrentUser,
  logout,
  loginLocal,
  registerUser,
  kakaoLoginCallback,
};

