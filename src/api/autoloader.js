import request from '@/utils/request';

/**
 * Получить количество возможных вариаций
 */
export function getCategories() {
  return request({
    url: '/autoloader/categories',
    method: 'get',
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
 * Получить прошлые рандомизации
 */
export function getAllRandomizer() {
  return request({
    url: '/randomizer/templates',
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