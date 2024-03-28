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
 * Подтвердить логин
 */
export function confirmEmail(uuid) {
  return request({
    url: `/confirm/email/${uuid}`,
    method: 'post',
  });
}