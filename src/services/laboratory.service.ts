const Laboratory = require('@moleculer/lab');
import { Service, ServiceBroker } from 'moleculer';

export default class LaboratoryService extends Service {

  public constructor(public broker: ServiceBroker) {
    super(broker);
    this.parseServiceSchema({
      name: 'laboratory',
      mixins: [Laboratory.AgentService],
      settings: {
        token: '',
        apiKey: ''
      }
    })
  }

}
