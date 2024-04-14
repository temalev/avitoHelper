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
 * Получить поля категории
 */
export function getFields(id) {
  return request({
    url: `/autoloader/category/${id}/fields`,
    method: 'get',
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