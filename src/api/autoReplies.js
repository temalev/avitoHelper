import request from '@/utils/request';

/**
 * Получить хэш
 */
export function getAutoReplies() {
  return request({
    url: '/autoreply-message-scenarios',
    method: 'get',
  });
}
