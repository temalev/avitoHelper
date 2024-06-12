import request from '@/utils/request';

/**
 * Получить хэш
 */
export function getHistory() {
  return request({
    url: '/write-offs',
    method: 'get',
  });
}
