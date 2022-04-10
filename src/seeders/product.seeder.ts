import { faker } from '@faker-js/faker';

faker.setLocale('pt_BR');

export function makeProducts(count: number) {
  return [...Array(count)].map((_, id) => ({
    id,
    name: faker.commerce.product(),
    price: faker.commerce.price(1, 1000),
    company: faker.company.companyName(),
    department: faker.commerce.department()
  }));
}
