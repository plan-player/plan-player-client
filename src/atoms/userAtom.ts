import { atom } from 'recoil';

export interface UserType {
  id: number;
  username: string;
  profileName: string;
  profileImagePath: string;
  profileBirth: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

export const authAtom = atom({
  key: 'auth',
  default: false,
});
