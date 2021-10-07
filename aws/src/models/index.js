// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { InventoryModel } = initSchema(schema);

export {
  InventoryModel
};