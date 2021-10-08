<template>
  <span>
    <span class="InventoryActionButton" v-on:click="actOnEvent()">
      <img :src="require('@/assets/' + icon + '.png')" :alt="icon" />
    </span>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import InventoryPopup from "@/components/InventoryPopup.vue";
import { Action, Getter, namespace } from "vuex-class";
import { ACTION_NAMES, ISelectedItemAction } from "@/types/IInventory";
const InventoryActionNames = namespace("inventory", Action);
const InventoryGetterNames = namespace("inventory", Getter);

@Component({
  components: {
    InventoryPopup,
  },
})
export default class InventoryActionButton extends Vue {
  @InventoryActionNames updateSelectedItem: (
    state: ISelectedItemAction
  ) => void;
  @InventoryGetterNames getPopupStatus: boolean;

  @Prop({ required: true })
  public icon!: string;

  @Prop({ required: true })
  public id!: string;

  actOnEvent(): void {
    this.updateSelectedItem({
      id: this.id,
      action: ACTION_NAMES[this.icon],
    });
  }
}
</script>

<style scoped lang="scss">
.InventoryActionButton {
  margin: 0.5rem;
  display: inline-block;
  text-align: center;
  line-height: 0;
  cursor: pointer;
}
</style>
