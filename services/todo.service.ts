import { Service, ServiceBroker } from 'moleculer';

export default class TodoService extends Service {

  public constructor(public broker: ServiceBroker) {
    super(broker);
    this.parseServiceSchema({
      name: 'todo',
      actions: {
        todo: {
          rest: { 
            method: 'GET', 
            path: '' 
          },
          handler() {
            return [
              {
                id: 0,
                name: 'something'
              }
            ]
          }
        }
      }
    })
  }

}
