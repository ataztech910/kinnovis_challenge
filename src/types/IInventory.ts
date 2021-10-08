import { ActionContext, ActionTree, GetterTree, MutationTree } from "vuex";
import { InventoryModel } from "../../aws/src/models";

export enum ACTION_NAMES {
  edit = "Edit",
  bin = "Delete",
  add = "Add",
}

export enum STRING_VALUES {
  ok = "Ok",
  cancel = "Cancel",
  remove_question = "Are you sure that you want to remove item ?",
  item = "item",
}

export interface ISelectedItemAction {
  id: string | null;
  action: string;
}

export interface InventoryState {
  inventory: InventoryModel[];
  searchValue?: string;
  selectedItem?: ISelectedItemAction;
}

export type InventoryGetter = GetterTree<InventoryState, unknown>;
export type InventoryMutation = MutationTree<InventoryState>;
export type Context = ActionContext<InventoryState, unknown>;
export type InventoryAction = ActionTree<InventoryState, unknown>;
