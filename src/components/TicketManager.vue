<template>
  <section class="TicketManager">
    <div>
      <label for="headerColor">Pick header color:</label>
      <input id="headerColor" type="color" v-model="headerColorValue" />
    </div>
    <div>
      <label for="fontSize">Font size:</label>
      <input
        id="fontSize"
        placeholder="enter a font size here"
        class="TicketManager__textInput"
        type="number"
        min="10"
        max="20"
        v-model="fontSizeValue"
      />
    </div>
    <div>
      <label for="fontColor">Font color:</label>
      <input id="fontColor" type="color" v-model="fontColorValue" />
    </div>
    <div>
      <label for="passengerName">Passenger name:</label>
      <input
        id="passengerName"
        placeholder="enter a passenger name here"
        class="TicketManager__textInput"
        type="text"
        v-model="passengerNameValue"
        maxlength="70"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter, namespace } from "vuex-class";
const TicketGetterNames = namespace("tickets", Getter);
const TicketActionNames = namespace("tickets", Action);

@Component
export default class TicketManager extends Vue {
  @TicketGetterNames headerColor: string;
  @TicketGetterNames fontSize: number;
  @TicketGetterNames fontColor: string;
  @TicketGetterNames passengerName: string;

  @TicketActionNames updateHeaderColor: (headerColor: string) => void;
  @TicketActionNames updateFontSize: (fontSize: number) => void;
  @TicketActionNames updateFontColor: (fontColor: string) => void;
  @TicketActionNames updatePassengerName: (passengerName: string) => void;

  get headerColorValue(): string {
    return this.headerColor;
  }
  set headerColorValue(headerColor: string) {
    this.updateHeaderColor(headerColor);
  }
  get fontSizeValue(): number {
    return this.fontSize;
  }
  set fontSizeValue(fontSize: number) {
    this.updateFontSize(fontSize);
  }
  get fontColorValue(): string {
    return this.fontColor;
  }
  set fontColorValue(fontColor: string) {
    this.updateFontColor(fontColor);
  }
  get passengerNameValue(): string {
    return this.passengerName;
  }
  set passengerNameValue(passengerName: string) {
    this.updatePassengerName(passengerName);
  }
}
</script>

<style lang="scss" scoped>
.TicketManager {
  width: 45%;
  max-width: 300px;
  border-right: 1px solid rgba(44, 62, 80, 0.62);
  padding-right: 1rem;
  &__textInput {
    padding: 0.3rem;
    outline: none;
  }
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }
}
</style>
