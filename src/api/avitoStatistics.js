import request from '@/utils/request';

/**
 * Получить Контакты/Избранное/Просмотры
 */
export function getContactsFavoritesViews(accountId) {
  return request({
    url: `/avito-accounts/${accountId}/statistics/common`,
    method: 'get',
  });
}
