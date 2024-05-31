import request from '@/utils/request';

/**
 * Получить количество возможных вариаций
 */
export function getCategories() {
  return request({
    url: '/autoloader/categories',
    method: 'get',
  });
}

/**
 * Получить поля категории
 */
export function getFields(id) {
  return request({
    url: `/autoloader/category/${id}/fields`,
    method: 'get',
  });
}

/**
 * Создать файл автозагрузки
 */
export function createFile(data) {
  return request({
    url: `/autoloader/file`,
    method: 'post',
    data,
  });
}

/**
 * Создать файл автозагрузки
 */
export function uploadFieldFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  return request({
    url: `/autoloader/field/file`,
    method: 'post',
    data: formData,
  });
}