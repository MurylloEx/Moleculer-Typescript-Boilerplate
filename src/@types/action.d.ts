import { IMicroserviceHandler } from './handler';

export interface IMicroserviceAction {
  name: string;
  method: string;
  route: string;
  handler: IMicroserviceHandler;
}
