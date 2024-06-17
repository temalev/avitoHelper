import request from '@/utils/request';

/**
 * Редактировать пользователя
 */
export function updateUser(data) {
  return request({
    url: `/me`,
    method: 'patch',
    data,
  });
}