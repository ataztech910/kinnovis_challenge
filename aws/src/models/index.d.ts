import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type InventoryModelMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class InventoryModel {
  readonly id: string;
  readonly sku?: number;
  readonly name?: string;
  readonly bestBeforeDate?: string;
  readonly inventoryLevel?: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<InventoryModel, InventoryModelMetaData>);
  static copyOf(source: InventoryModel, mutator: (draft: MutableModel<InventoryModel, InventoryModelMetaData>) => MutableModel<InventoryModel, InventoryModelMetaData> | void): InventoryModel;
}