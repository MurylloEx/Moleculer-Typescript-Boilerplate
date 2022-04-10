import { makeProducts, makeUsers } from "../seeders";

export const UsersRepository    = makeUsers(100);
export const ProductsRepository = makeProducts(200);