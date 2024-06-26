import request from '@/utils/request';

/**
 * Загрузить и уникализировать фото
 */
export function uploadFile(file, params) {
  const formData = new FormData();
  formData.append('file', file);
  return request({
    url: '/image/proxy',
    method: 'post',
    params,
    data: formData,
  });
}

/**
 * Удалить файл
 */
export function deleteFile(data) {
  return request({
    url: '/image/proxy',
    method: 'delete',
    data
  });
}

