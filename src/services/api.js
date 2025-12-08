/**
 * API 서비스
 * 백엔드 API와 통신하는 함수들을 관리합니다.
 */

const API_BASE_URL = process.env.REACT_APP_BACK_URL || 'https://api.x-ink.store';
console.log(process.env.REACT_APP_BACK_URL);
    // API 경로 설정
// 백엔드가 API 명세서대로 구현하면 '/api/auth'로 변경
const AUTH_PREFIX = '/auth'; // 현재: /auth  |  나중: /api/auth

// 디버깅: 환경 변수 확인
console.log('🔧 환경 변수 체크:');
console.log('REACT_APP_BACK_URL:', process.env.REACT_APP_BACK_URL);
console.log('최종 API_BASE_URL:', API_BASE_URL);
console.log('AUTH_PREFIX:', AUTH_PREFIX);

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

  const fullURL = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(fullURL, config);
    
    // 디버깅: 응답 상태 확인
    console.log('📥 응답 상태:', response.status, response.statusText);
    
    // 401 Unauthorized - 로그인 필요
    if (response.status === 401) {
      console.error('❌ 401 Unauthorized: 인증 필요');
      throw new Error('UNAUTHORIZED');
    }

    // 응답이 성공적이지 않은 경우
    if (!response.ok) {
      console.error('❌ API 에러:', response.status, response.statusText);
      const error = await response.json().catch(() => ({}));
      console.error('❌ 에러 상세:', error);
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
  return await fetchAPI(`${AUTH_PREFIX}/me`);
};

/**
 * 로그아웃
 * @returns {Promise<void>}
 */
export const logout = async () => {
  return await fetchAPI(`${AUTH_PREFIX}/logout`, {
    method: 'POST',
  });
};

/**
 * 지원자 로그인
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<Object>}
 */
export const volunteerLogin = async (email, password) => {
    return await fetchAPI(`${AUTH_PREFIX}/volunteer-login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

/**
 * 기업 로그인
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<Object>}
 */
export const companiesLogin = async (email, password) => {
    return await fetchAPI(`${AUTH_PREFIX}/companies-login`, {
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
  return await fetchAPI(`${AUTH_PREFIX}/register`, {
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
  return await fetchAPI(`${AUTH_PREFIX}/kakao/callback?code=${code}`);
};

/**
 * 백엔드 서버 연결 상태 확인 (헬스체크)
 * @returns {Promise<boolean>}
 */
export const checkServerHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      credentials: 'include',
    });
    console.log('✅ 서버 연결 성공:', response.status);
    return response.ok;
  } catch (error) {
    console.error('❌ 서버 연결 실패:', error.message);
    return false;
  }
};

/**
 * 전체 공고 목록 가져오기
 * @returns {Promise<Array>} 공고 목록
 */
export const getJobs = async () => {
  return await fetchAPI('/jobs', {
    method: 'GET',
  });
};

/**
 * 필터링된 공고 목록 가져오기
 * @param {Object} filters - 필터 옵션
 * @param {string} filters.position - 포지션 필터 (예: "프론트엔드", "백엔드")
 * @param {string} filters.status - 상태 필터 (예: "OPEN", "CLOSE")
 * @returns {Promise<Array>} 공고 목록
 */
export const getJobsFiltered = async (filters = {}) => {
  const queryParams = new URLSearchParams();
  
  if (filters.position) queryParams.append('position', filters.position);
  if (filters.status) queryParams.append('status', filters.status);
  
  const queryString = queryParams.toString();
  const endpoint = queryString ? `/jobs?${queryString}` : '/jobs';
  
  return await fetchAPI(endpoint, {
    method: 'GET',
  });
};

export default {
  getCurrentUser,
  logout,
  volunteerLogin,
  companiesLogin,
  registerUser,
  kakaoLoginCallback,
  checkServerHealth,
  getJobs,
  getJobsFiltered,
};

