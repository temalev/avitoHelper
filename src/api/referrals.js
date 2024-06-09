import request from '@/utils/request';

/**
 * Получить всех рефералов
 */
export function getReferrals() {
  return request({
    url: '/listed-users',
    method: 'get',
  });
}
