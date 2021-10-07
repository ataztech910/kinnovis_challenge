import {
  Context,
  InventoryAction,
  InventoryGetter,
  InventoryMutation,
  InventoryState,
} from "@/types/IInventory";
import { DataStore } from "@aws-amplify/datastore";
import { InventoryModel } from "../../../aws/src/models";

export const state: InventoryState = {
  inventory: [],
};

export const getters: InventoryGetter = {
  inventory: (state) => state.inventory,
};

export const mutations: InventoryMutation = {
  setInventory: (state: InventoryState, inventory: InventoryModel[]): void => {
    state.inventory = inventory;
  },
  setInventoryItem: (
    state: InventoryState,
    inventoryItem: InventoryModel
  ): void => {
    state.inventory.push(inventoryItem);
  },
};

export const actions: InventoryAction = {
  updateInventory: ({ commit }: Context, inventoryItem: InventoryModel) => {
    commit("setInventoryItem", inventoryItem);
  },
  initInventory: ({ commit }) => {
    const models = DataStore.query(InventoryModel);
    models.then((result: InventoryModel[]) => {
      if (result.length > 0) {
        commit("setInventory", result);
      }
    });
  },
};

export const inventory = {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
