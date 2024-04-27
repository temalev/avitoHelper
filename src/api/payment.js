import request from '@/utils/request';

/**
 * Получить хэш
 */
export function payment(params) {
  return request({
    url: '/payment',
    method: 'post',
    params,
  });
}
