import { ActionContext, ActionTree, GetterTree, MutationTree } from "vuex";
import { InventoryModel } from "../../aws/src/models";

export interface InventoryState {
  inventory: InventoryModel[];
}

export type InventoryGetter = GetterTree<InventoryState, unknown>;
export type InventoryMutation = MutationTree<InventoryState>;
export type Context = ActionContext<InventoryState, unknown>;
export type InventoryAction = ActionTree<InventoryState, unknown>;
