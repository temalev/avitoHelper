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
 * Удалить все шаблоны парсинга
 */
export function deleteAllParserTemplates() {
  return request({
    url: `/parser`,
    method: 'delete',
  });
}

/**
 * Удалить один шаблон парсинга
 */
export function deleteParserTemplate(parserTemplateId) {
  return request({
    url: `/parser/${parserTemplateId}`,
    method: 'delete',
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
