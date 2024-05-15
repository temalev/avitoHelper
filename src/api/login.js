import request from '@/utils/request';

/**
 * Регистрация
 */
export function signUp(data) {
  return request({
    url: '/user',
    method: 'post',
    data,
  });
}

/**
 * Вход
 */
export function signIn(data) {
  return request({
    url: '/login',
    method: 'post',
    data,
  });
}

/**
 * Выход
 */
export function logout(data) {
  return request({
    url: '/logout',
    method: 'post',
    data,
  });
}

/**
 * Вход
 */
export function getMe() {
  return request({
    url: '/me',
    method: 'get',
  });
}

/**
 * Подтвердить логин
 */
export function confirmEmail(uuid) {
  return request({
    url: `/confirm/email/${uuid}`,
    method: 'post',
  });
}