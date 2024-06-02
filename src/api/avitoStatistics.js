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
 * Получить баланс
 */
export function getBalanceStat(accountId, params) {
  return request({
    url: `/avito-accounts/${accountId}/statistics/balance`,
    method: 'get',
    params
  });
}

/**
 * Получить звонки
 */
export function getСallStat(accountId, params) {
  return request({
    url: `/avito-accounts/${accountId}/statistics/call`,
    method: 'get',
    params
  });
}

/**
 * Получить сообщения
 */
export function getMessagesStat(accountId, params) {
  return request({
    url: `/avito-accounts/${accountId}/statistics/messages`,
    method: 'get',
    params
  });
}