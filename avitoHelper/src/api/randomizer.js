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
 * Рандомизировать
 */
export function createRandomText(data) {
  return request({
    url: '/randomizer/create',
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