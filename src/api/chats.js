import request from '@/utils/request';

/**
 * Получить чаты
 */
export function getChats(params) {
  return request({
    url: '/conversations',
    method: 'get',
    params
  });
}

/**
 * Получить сообщения чата
 */
export function getChatMessages(chatId) {
  return request({
    url: `/conversation/${chatId}/messages`,
    method: 'get',
  });
}

/**
 * Отправить сообщение
 */
export function sendMessage(chatId, data) {
  return request({
    url: `/conversation/${chatId}/message`,
    method: 'post',
    data,
  });
}
