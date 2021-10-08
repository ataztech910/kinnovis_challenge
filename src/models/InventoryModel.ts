import { DataStore } from "@aws-amplify/datastore";
import { InventoryModel } from "../../aws/src/models";

export const allInventory = DataStore.query(InventoryModel);
export const updateInventory = (inventoryValue: InventoryModel): void => {
  const original = DataStore.query(InventoryModel, inventoryValue.id);

  original.then((originalValue) => {
    originalValue &&
      DataStore.save(
        InventoryModel.copyOf(originalValue, (item) => {
          item.inventoryLevel = Number(inventoryValue.inventoryLevel);
          item.bestBeforeDate = inventoryValue.bestBeforeDate;
        })
      ).then((result) => {
        console.log(result);
      });
  });
};
export const deleteInventory = async (itemToDelete: InventoryModel): Promise<any> => {
  const modelToDelete = await DataStore.query(InventoryModel, itemToDelete.id);
  modelToDelete &&
    DataStore.delete(modelToDelete).then((result) => {
      console.log(result);
    });
};

export const createInventory = (itemToAdd: InventoryModel): void => {
  DataStore.save(new InventoryModel({ ...itemToAdd })).then((result) => {
    console.log(result);
  });
};
