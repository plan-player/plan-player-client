import { fetchRequest } from './request';

export async function getCategoryGroups() {
  const response = await fetchRequest({
    url: '/api/category-groups/all',
    method: 'get',
  });

  return response;
}
