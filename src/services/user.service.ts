import { Service, ServiceBroker } from 'moleculer';
import { UserActions } from '../actions';

export default class UserService extends Service {

  public constructor(public broker: ServiceBroker) {
    super(broker);
    this.parseServiceSchema({
      name: 'user',
      actions: UserActions
    })
  }

}
