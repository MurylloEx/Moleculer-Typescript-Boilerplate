import { IMicroserviceAction, IMicroserviceHandler } from '../@types';

export const action = (
  method: string, 
  name: string,
  route: string, 
  handler: IMicroserviceHandler
): IMicroserviceAction => ({ name, method, route, handler });

export const createGet  = (
  name: string,
  route: string, 
  handler: IMicroserviceHandler
) => action('GET', name, route, handler);

export const createPost = (
  name: string,
  route: string, 
  handler: IMicroserviceHandler
) => action('POST', name, route, handler);

export const createPut  = (
  name: string,
  route: string, 
  handler: IMicroserviceHandler
) => action('PUT', name, route, handler);

export const createDelete  = (
  name: string,
  route: string, 
  handler: IMicroserviceHandler
) => action('DELETE', name, route, handler);
