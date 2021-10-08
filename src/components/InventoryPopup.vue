<template>
  <section v-if="getSelectedItem.id !== null && getItem !== null">
    <div class="Overlay" v-on:click="closePopup()"></div>
    <div class="Popup">
      <div class="Popup__header">
        {{ getSelectedItem.action }} {{ stringValues.item }}
      </div>
      <section v-if="getSelectedItem.action === 'Edit'">
        <div>
          <input
            class="Popup__date"
            :class="[{ error: errorList[0] }]"
            type="date"
            placeholder="enter the date"
            v-model="bestBeforeDate"
          />
        </div>
        <div class="inputWrapper">
          <input
            :class="[{ error: errorList[1] }]"
            placeholder="enter the inventory level"
            type="number"
            v-model="inventoryLevel"
          />
        </div>
      </section>
      <section v-if="getSelectedItem.action === 'Delete'">
        <div class="Popup__question">
          {{ stringValues.remove_question }}
        </div>
      </section>
      <section v-if="getSelectedItem.action === 'Add'">
        <div>
          <input type="text" placeholder="enter the sku" v-model="sku" />
        </div>

        <div>
          <input type="text" placeholder="enter the name" v-model="name" />
        </div>

        <div>
          <input
            class="Popup__date"
            :class="[{ error: errorList[0] }]"
            type="date"
            placeholder="enter the date"
            v-model="bestBeforeDate"
          />
        </div>
        <div class="inputWrapper">
          <input
            :class="[{ error: errorList[1] }]"
            placeholder="enter the inventory level"
            type="number"
            v-model="inventoryLevel"
          />
        </div>
      </section>
      <div>
        <button
          class="Popup__button Popup__button--save"
          v-on:click="finishForm()"
        >
          {{ stringValues.ok }}
        </button>
        <button
          class="Popup__button Popup__button--cancel"
          v-on:click="closePopup()"
        >
          {{ stringValues.cancel }}
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter, namespace } from "vuex-class";
import { InventoryModel } from "../../aws/src/models";
import {
  ACTION_NAMES,
  ISelectedItemAction,
  STRING_VALUES,
} from "@/types/IInventory";
const InventoryGetterNames = namespace("inventory", Getter);
const InventoryActionNames = namespace("inventory", Action);

@Component
export default class InventoryPopup extends Vue {
  @InventoryGetterNames getItemById: (
    id: string
  ) => InventoryModel[] | undefined;

  @InventoryGetterNames getSelectedItem: ISelectedItemAction;

  @InventoryActionNames updateSelectedItem: (
    state: ISelectedItemAction
  ) => void;

  @InventoryActionNames deleteFromInventory: (
    inventoryItem: InventoryModel
  ) => void;

  @InventoryActionNames addToInventory: (inventoryItem: InventoryModel) => void;

  @InventoryActionNames updateInventory: (state: InventoryModel) => void;

  item: InventoryModel | null = null;
  bestBeforeDate?: string = "";
  inventoryLevel?: number = 0;
  sku?: string = "";
  name?: string = "";
  selectedItem: ISelectedItemAction;
  stringValues = STRING_VALUES;
  errorList: [boolean, boolean];
  error: boolean;

  get getItem(): InventoryModel | null | undefined {
    this.errorList = [false, false];
    const item =
      this.getSelectedItem?.id !== null
        ? this.getItemById(this.getSelectedItem.id)?.[0]
        : null;
    if (item) {
      this.bestBeforeDate = item.bestBeforeDate;
      this.inventoryLevel = item.inventoryLevel;
    }
    return item;
  }

  isError(): boolean {
    console.log(this.errorList);
    return this.error;
  }

  async finishForm(): Promise<void> {
    if (this.getSelectedItem.action === ACTION_NAMES.edit) {
      this.updateData();
    } else if (this.getSelectedItem.action === ACTION_NAMES.bin) {
      this.removeData();
    } else {
      this.addData();
    }
  }

  validate(): void {
    if (this.bestBeforeDate === "") {
      this.errorList[0] = true;
    }
    if (this.inventoryLevel?.toString() === "") {
      this.errorList[1] = true;
    }
    console.log({
      error: this.error,
      date: this.bestBeforeDate,
      level: this.inventoryLevel,
    });
    this.$forceUpdate();
  }
  addData(): void {
    this.validate();
    if (!this.errorList[0] && !this.errorList[1]) {
      const newInventory = new InventoryModel({
        sku: Number(this.sku),
        name: this.name,
        bestBeforeDate: this.bestBeforeDate,
        inventoryLevel: Number(this.inventoryLevel),
      });
      this.addToInventory(newInventory);
      this.closePopup();
    }
  }

  removeData(): void {
    this.getItem && this.deleteFromInventory(this.getItem);
    this.closePopup();
  }

  updateData(): void {
    this.validate();
    if (!this.errorList[0] && !this.errorList[1]) {
      const item = { ...this.getItem } as any;
      item.bestBeforeDate = this.bestBeforeDate;
      item.inventoryLevel = this.inventoryLevel;
      this.updateInventory(item as InventoryModel);
      this.closePopup();
    }
  }

  closePopup(): void {
    console.log("click on close");
    this.updateSelectedItem({
      id: null,
      action: "",
    });
    this.$forceUpdate();
  }
}
</script>

<style lang="scss" scoped>
.error {
  border: 1px solid red !important;
}
.Overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  cursor: pointer;
}
.Popup {
  background: #fff;
  position: absolute;
  top: 30%;
  left: 50%;
  min-width: 300px;
  transform: translate(-50%);
  box-shadow: 0 0 21px 1px rgba(0, 0, 0, 0.22);
  z-index: 10;
  div {
    padding: 0 1rem;
  }
  &__question {
    padding: 0.5rem;
    margin-bottom: 1rem;
  }
  &__header {
    background: #574086;
    color: #fff;
    padding: 0.5rem 1rem !important;
    margin-bottom: 1rem;
  }
  input {
    padding: 0.5rem;
    box-sizing: border-box;
    outline: 0;
    width: 100%;
    line-height: 1;
    margin-bottom: 1rem;
  }
  &__date {
    padding: 0.4rem;
  }
  &__button {
    padding: 0.5rem 1rem;
    margin-right: 1rem;
    margin-bottom: 1rem;
    cursor: pointer;
    &--save {
      background: #574086;
      border: 2px solid #574086;
      color: #fff;
    }
    &--cancel {
      border: 2px solid #574086;
      background: transparent;
    }
  }
}
</style>
