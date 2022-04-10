import { ServiceActionsSchema, ServiceSettingSchema } from 'moleculer';
import { IMicroserviceAction } from '../@types';

export function createActions(actions: IMicroserviceAction[]): ServiceActionsSchema<ServiceSettingSchema> {
  const packed = [...Array(actions.length)].map((_, key) => ({
    name: actions[key].name,
    rest: {
      method: actions[key].method,
      path: actions[key].route
    },
    handler: actions[key].handler
  }));

  let unpacked: any = {};

  packed.forEach((action) => {
    unpacked[action.name] = action;
    delete unpacked[action.name].name;
  });
  
  return unpacked;
}
