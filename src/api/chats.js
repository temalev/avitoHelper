import request from '@/utils/request';

/**
 * Получить чаты
 */
export function getChats() {
  return request({
    url: '/conversations',
    method: 'get',
  });
}
