import { DataStore } from "@aws-amplify/datastore";
import { InventoryModel } from "../../aws/src/models";

export const allInventory = DataStore.query(InventoryModel);
