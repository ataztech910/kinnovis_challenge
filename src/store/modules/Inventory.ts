import {
  Context,
  InventoryAction,
  InventoryGetter,
  InventoryMutation,
  InventoryState,
  ISelectedItemAction,
} from "@/types/IInventory";
import { InventoryModel } from "../../../aws/src/models";
import {
  allInventory,
  createInventory,
  deleteInventory,
  updateInventory,
} from "@/models/InventoryModel";

export const state: InventoryState = {
  inventory: [],
  searchValue: "",
  selectedItem: {
    id: null,
    action: "",
  },
};

export const getters: InventoryGetter = {
  inventory: (state) => state.inventory,
  filterInventory: (state) => {
    if (state.searchValue && state.searchValue.length > 0) {
      return state.inventory.filter(
        (item) =>
          (state.searchValue &&
            item.sku?.toString().includes(state.searchValue.toLowerCase())) ||
          (state.searchValue &&
            item.name?.toLowerCase().includes(state.searchValue.toLowerCase()))
      );
    }
    return state.inventory;
  },
  searchValue: (state) => state.searchValue,
  getItemById: (state) => (id: string) =>
    state.inventory.filter((item) => item.id === id),
  getSelectedItem: (state) => state.selectedItem,
};

export const mutations: InventoryMutation = {
  setSelectedItem: (
    state: InventoryState,
    selectedItem: ISelectedItemAction
  ): void => {
    console.log(selectedItem);
    state.selectedItem = selectedItem;
  },
  setSearchValue: (state: InventoryState, searchValue: string): void => {
    state.searchValue = searchValue;
  },
  setInventory: (state: InventoryState, inventory: InventoryModel[]): void => {
    state.inventory = inventory;
  },
  setInventoryItem: (
    state: InventoryState,
    inventoryItem: InventoryModel
  ): void => {
    const itemId = state.inventory.findIndex(
      (item: InventoryModel) => item.id === inventoryItem.id
    );
    if (itemId >= 0) {
      state.inventory[itemId] = { ...inventoryItem };
      state.inventory = [...state.inventory];
      updateInventory(inventoryItem);
    } else {
      state.inventory.push(inventoryItem);
    }
  },
  removeInventoryItem: (
    state: InventoryState,
    inventoryItem: InventoryModel
  ): void => {
    const itemId = state.inventory.findIndex(
      (item: InventoryModel) => item.id === inventoryItem.id
    );
    if (itemId >= 0) {
      state.inventory.splice(itemId, 1);
      deleteInventory(inventoryItem);
    }
  },
};

export const actions: InventoryAction = {
  updateSelectedItem: (
    { commit }: Context,
    selectedItem: ISelectedItemAction
  ) => {
    commit("setSelectedItem", selectedItem);
  },
  updateSearchValue: ({ commit }: Context, searchValue: string) => {
    commit("setSearchValue", searchValue);
  },
  updateInventory: ({ commit }: Context, inventoryItem: InventoryModel) => {
    commit("setInventoryItem", inventoryItem);
  },
  deleteFromInventory: ({ commit }: Context, inventoryItem: InventoryModel) => {
    commit("removeInventoryItem", inventoryItem);
  },
  addToInventory: ({ commit }: Context, inventoryItem: InventoryModel) => {
    createInventory(inventoryItem);
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
