<template>
  <div class="FirstTask">
    <div class="FirstTask__raw FirstTask__raw--header">
      <div class="FirstTask__raw__cell">Code</div>
      <div class="FirstTask__raw__cell">Name</div>
      <div class="FirstTask__raw__cell">Date</div>
      <div class="FirstTask__raw__cell">Level</div>
      <div class="FirstTask__raw__cell"></div>
    </div>
    <template v-for="item in inventory" >
      <InventoryRaw :item="item" :key="item.id" />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace, Mutation, Action, Getter } from "vuex-class";
import { InventoryModel } from "../../aws/src/models";
import InventoryRaw from "@/components/InventoryRaw.vue";
const InventoryGetterNames = namespace("inventory", Getter);
const InventoryActionNames = namespace("inventory", Action);
const InventoryMutationNames = namespace("inventory", Mutation);

@Component({
  components: {
    InventoryRaw,
  },
})
export default class FirstTask extends Vue {
  @InventoryGetterNames inventory: InventoryModel[];
  @InventoryActionNames initInventory: () => void;
  @InventoryMutationNames setInventory: (newState: InventoryModel) => void;
  created(): void {
    this.initInventory();
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
