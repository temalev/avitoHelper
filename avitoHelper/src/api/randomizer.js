import request from '@/utils/request';

/**
 * Получить количество возможных вариаций
 */
export function getRandomizerCount(data) {
  return request({
    url: '/randomizer/count',
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