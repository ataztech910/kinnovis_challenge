import {
  TicketAction,
  TicketContext,
  TicketGetter,
  TicketMutation,
  TicketState,
} from "@/types/Tickets";

export const state: TicketState = {
  headerColor: "#ffcc05",
  fontSize: 13,
  fontColor: "#2c3e50",
  passengerName: "Jesus Ramirez",
};

export const getters: TicketGetter = {
  headerColor: (state) => state.headerColor,
  fontSize: (state) => state.fontSize,
  fontColor: (state) => state.fontColor,
  passengerName: (state) => state.passengerName,
};

export const mutations: TicketMutation = {
  setHeaderColor: (state: TicketState, headerColor: string): void => {
    state.headerColor = headerColor;
  },
  setFontSize: (state: TicketState, fontSize: number): void => {
    state.fontSize = fontSize;
  },
  setFontColor: (state: TicketState, fontColor: string): void => {
    state.fontColor = fontColor;
  },
  setPassengerName: (state: TicketState, passengerName: string): void => {
    state.passengerName = passengerName;
  },
};

export const actions: TicketAction = {
  updateHeaderColor: ({ commit }: TicketContext, headerColor: string): void => {
    commit("setHeaderColor", headerColor);
  },
  updateFontSize: ({ commit }: TicketContext, fontSize: number): void => {
    commit("setFontSize", fontSize);
  },
  updateFontColor: ({ commit }: TicketContext, fontColor: string): void => {
    commit("setFontColor", fontColor);
  },
  updatePassengerName: (
    { commit }: TicketContext,
    passengerName: string
  ): void => {
    commit("setPassengerName", passengerName);
  },
};

export const tickets = {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
