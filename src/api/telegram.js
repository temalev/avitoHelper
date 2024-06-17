import request from '@/utils/request';

/**
 * Подключить Telegram аккаунт
 */
export function connectTelegram(uuid) {
    return request({
        url: `/connect/telegram/${uuid}`,
        method: 'post',
    });
}
  
  