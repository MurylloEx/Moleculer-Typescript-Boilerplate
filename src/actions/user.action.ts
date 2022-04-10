import { createActions, createGet } from '../factories';
import { UsersRepository } from '../repository';

function fetchUsers() {
  return UsersRepository;
}

export const UserActions = createActions([
  createGet('fetchUsers', '/all', fetchUsers)
]);
