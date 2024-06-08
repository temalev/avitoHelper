import request from '@/utils/request';

/**
 * Получить количество возможных вариаций
 */
export function getRandomizerCount(data) {
  return request({
    url: '/randomizer/count',
    method: 'post',
    data,
  });
}

/**
 * Рандомизировать
 */
export function createRandomText(data) {
  return request({
    url: '/randomizer/create',
    method: 'post',
    data,
  });
}

/**
 * Удалить шаблон
 */
export function deleteTemplate(templateId) {
  return request({
    url: `/randomizer/templates/${templateId}`,
    method: 'delete',
  });
}

/**
 * Получить прошлые рандомизации
 */
export function getAllRandomizer() {
  return request({
    url: '/randomizer/templates',
    method: 'get',
  });
}

/**
 * Скачать шаблон
 */
export function downloadTemplate(id, ext) {
  return request({
    url: `/randomizer/file/${id}/${ext}`,
    method: 'get',
    responseType: 'blob'
  });
}