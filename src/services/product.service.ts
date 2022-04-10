import { Service, ServiceBroker } from 'moleculer';
import { ProductActions } from '../actions';

export default class ProductService extends Service {

  public constructor(public broker: ServiceBroker) {
    super(broker);
    this.parseServiceSchema({
      name: 'product',
      actions: ProductActions
    })
  }

}
