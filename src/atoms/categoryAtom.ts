import { atom } from 'recoil';

export const currentCategoryGroupAtom = atom({
  key: 'currentCategoryGroupAtom',
  default: '',
});

export const currentCategoryGroupNameAtom = atom({
  key: 'currentCategoryGroupAtomName',
  default: '',
});
