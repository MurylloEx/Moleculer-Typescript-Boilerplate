import { faker } from '@faker-js/faker';

faker.setLocale('pt_BR');

export function makeUsers(count: number) {
  return [...Array(count)].map((_, id) => ({
    id,
    name: faker.name.firstName(),
    middleName: faker.name.middleName(),
    phone: faker.phone.phoneNumber('+55 ## #####-####'),
    gender: faker.name.gender()
  }));
}
