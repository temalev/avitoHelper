import request from '@/utils/request';

/**
 * Получить хэш
 */
export function getNews() {
  return request({
    url: '/news',
    method: 'get',
  });
}
