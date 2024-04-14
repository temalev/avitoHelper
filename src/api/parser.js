import request from '@/utils/request';

/**
 * Получить количество всех парсингов
 */
export function getAllParsers() {
  return request({
    url: '/parser',
    method: 'get',
  });
}

/**
 * Запустить парсер
 */
export function startParser(data) {
  return request({
    url: '/parser/start',
    method: 'post',
    data,
  });
}
