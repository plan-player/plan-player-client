import { atom, selector } from 'recoil';
import { fetchRequest } from '../util/request';

export const categoryGroupAtom = selector({
  key: 'categoryGroup',
  get: async () => {
    try {
      const response = await fetchRequest({
        url: '/api/category-groups/all',
        method: 'GET',
      });
      return response;
    } catch {
      return null;
    }
  },
});

export const currentCategoryGroupAtom = atom({
  key: 'currentCategoryGroupAtom',
  default: '',
});

export const currentCategoryGroupNameAtom = atom({
  key: 'currentCategoryGroupAtomName',
  default: '',
});
