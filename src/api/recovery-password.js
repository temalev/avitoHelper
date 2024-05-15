import request from '@/utils/request';

/**
 * Восстановить пароль
 */
export function recoverPass(data) {
  return request({
    url: '/recovery-password',
    method: 'post',
    data
  });
}
