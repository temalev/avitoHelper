import request from '@/utils/request';

/**
 * Получить Контакты/Избранное/Просмотры
 */
export function getContactsFavoritesViews(accountId, params) {
  return request({
    url: `/avito-accounts/${accountId}/statistics/common`,
    method: 'get',
    params
  });
}

/**
 * Получить Контакты/Избранное/Просмотры
 */
export function getBalanceStat(accountId, params) {
  return request({
    url: `/avito-accounts/${accountId}/statistics/balance`,
    method: 'get',
    params
  });
}
