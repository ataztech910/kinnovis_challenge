import { ActionContext, ActionTree, GetterTree, MutationTree } from "vuex";

export interface TicketState {
  headerColor: string;
  fontSize: number;
  fontColor: string;
  passengerName: string;
}

export type TicketGetter = GetterTree<TicketState, unknown>;
export type TicketMutation = MutationTree<TicketState>;
export type TicketContext = ActionContext<TicketState, unknown>;
export type TicketAction = ActionTree<TicketState, unknown>;
