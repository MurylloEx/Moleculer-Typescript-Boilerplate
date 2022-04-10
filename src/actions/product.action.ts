import { createActions, createGet } from '../factories';
import { ProductsRepository } from '../repository';

function fetchProducts() {
  return ProductsRepository;
}

export const ProductActions = createActions([
  createGet('fetchProducts', '/all', fetchProducts)
]);
