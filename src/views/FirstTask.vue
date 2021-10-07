<template>
  <div class="FirstTask">
    <div class="FirstTask__items" v-for="item in inventory" :key="item.id">
      <div>{{ item.sku }}</div>
      <div>{{ item.name }}</div>
      <div>{{ mutateDate(item.bestBeforeDate) }}</div>
      <div>{{ item.inventoryLevel }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace, Mutation, Action, Getter } from "vuex-class";
import { InventoryModel } from "../../aws/src/models";
const InventoryGetterNames = namespace("inventory", Getter);
const InventoryActionNames = namespace("inventory", Action);
const InventoryMutationNames = namespace("inventory", Mutation);

@Component
export default class FirstTask extends Vue {
  @InventoryGetterNames inventory: InventoryModel[];
  @InventoryActionNames initInventory: () => void;
  @InventoryMutationNames setInventory: (newState: InventoryModel) => void;
  created(): void {
    this.initInventory();
    console.log(this.inventory);
  }

  // This function here in case if API have a different formatting for dates like AWS for example
  mutateDate(awsFormattedDate: string): string {
    const dateFromString = new Date(awsFormattedDate);
    return `${dateFromString.getDate()}.${
      dateFromString.getMonth() + 1
    }.${dateFromString.getFullYear()}`;
  }
}
</script>
