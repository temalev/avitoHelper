import request from '@/utils/request';

/**
 * Получить хэш
 */
export function getHash() {
  return request({
    url: '/gpt/hash',
    method: 'get',
  });
}
