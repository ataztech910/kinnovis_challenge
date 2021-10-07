<template>
  <div class="FirstTask">
    <div class="FirstTask__raw FirstTask__raw--header">
      <div class="FirstTask__raw__cell">Code</div>
      <div class="FirstTask__raw__cell">Name</div>
      <div class="FirstTask__raw__cell">Date</div>
      <div class="FirstTask__raw__cell">Level</div>
      <div class="FirstTask__raw__cell"></div>
    </div>
    <div class="FirstTask__raw" v-for="item in inventory" :key="item.id">
      <div class="FirstTask__raw__cell">{{ item.sku }}</div>
      <div class="FirstTask__raw__cell">{{ item.name }}</div>
      <div class="FirstTask__raw__cell">
        {{ mutateDate(item.bestBeforeDate) }}
      </div>
      <div class="FirstTask__raw__cell">{{ item.inventoryLevel }}</div>
      <div class="FirstTask__raw__cell">
        <span>Edit</span>
        <span>Delete</span>
      </div>
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
<style lang="scss">
.FirstTask {
  display: table;
  width: 100%;
  &__raw {
    display: table-row;
    &__cell {
      display: table-cell;
      border-bottom: 1px solid #42b983;
      text-align: left;
      padding: 0.5rem;
    }
  }
}
</style>
