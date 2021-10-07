import {
  Context,
  InventoryAction,
  InventoryGetter,
  InventoryMutation,
  InventoryState,
} from "@/types/IInventory";
import { InventoryModel } from "../../../aws/src/models";
import { allInventory } from "@/models/InventoryModel";


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
    allInventory
      .catch((e) => {
        console.log(e, "Error connection");
      })
      .then((result: void | InventoryModel[]) => {
        if (result && result.length > 0) {
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
