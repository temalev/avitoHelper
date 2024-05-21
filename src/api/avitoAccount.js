import request from '@/utils/request';

/**
 * Добавить аккаунт
 */
export function addAvitoAccount(data) {
  return request({
    url: '/avito-account',
    method: 'post',
    data
  });
}

/**
 * Добавить аккаунт
 */
export function deleteAvitoAccount(id) {
  return request({
    url: `/avito-account/${id}`,
    method: 'delete',
  });
}

/**
 * Получить интегрированные аккаунты
 */
export function getAccounts() {
  return request({
    url: '/avito-accounts',
    method: 'get',
  });
}
