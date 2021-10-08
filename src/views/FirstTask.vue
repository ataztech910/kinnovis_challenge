<template>
  <div>
    <div class="SearchbarAndAdd">
      <InventorySearchBar />
      <div>
        <InventoryActionButton icon="add" :id="-1" />
      </div>
    </div>
    <div class="MainTable">
      <div class="MainTable__raw MainTable__raw--header">
        <div class="MainTable__raw__cell">SKU Code</div>
        <div class="MainTable__raw__cell">Name</div>
        <div class="MainTable__raw__cell">Best-Before-Date</div>
        <div class="MainTable__raw__cell">Inventory Level</div>
        <div class="MainTable__raw__cell"></div>
      </div>
      <template v-for="item in filterInventory">
        <InventoryRaw :item="item" :key="item.id" />
      </template>
    </div>
    <InventoryPopup />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace, Action, Getter } from "vuex-class";
import { InventoryModel } from "../../aws/src/models";
import InventoryRaw from "@/components/InventoryRaw.vue";
import InventorySearchBar from "@/components/InventorySearchBar.vue";
import InventoryPopup from "@/components/InventoryPopup.vue";
import InventoryActionButton from "@/components/InventoryActionButton.vue";
const InventoryGetterNames = namespace("inventory", Getter);
const InventoryActionNames = namespace("inventory", Action);

@Component({
  components: {
    InventoryActionButton,
    InventoryRaw,
    InventorySearchBar,
    InventoryPopup,
  },
})
export default class FirstTask extends Vue {
  @InventoryGetterNames filterInventory: InventoryModel[];
  @InventoryGetterNames searchValue: string;
  @InventoryActionNames initInventory: () => void;
  mounted(): void {
    this.initInventory();
  }
}
</script>
<style lang="scss">
.MainTable {
  display: table;
  width: 100%;
  position: relative;
  &__raw {
    display: table-row;
    &--header {
      background: rgb(87, 64, 134) !important;
      color: #fff;
      font-weight: bold;
    }
    &:hover {
      background: rgba(116, 110, 110, 0.08);
    }
    &__cell {
      display: table-cell;
      border-bottom: 1px solid #d5d5d5;
      text-align: left;
      padding: 0.5rem;
    }
  }
}
.SearchbarAndAdd {
  width: 100%;
  justify-content: space-between;
  display: flex;
}
</style>
