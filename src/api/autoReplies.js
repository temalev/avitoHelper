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

/**
 * Создать автоответ
 */
export function createAutoReply(data) {
  return request({
    url: '/autoreply-message-scenario',
    method: 'post',
    data,
  });
}

