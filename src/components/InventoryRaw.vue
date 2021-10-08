<template>
  <div class="MainTable__raw">
    <div class="MainTable__raw__cell">{{ item.sku }}</div>
    <div class="MainTable__raw__cell">{{ item.name }}</div>
    <div class="MainTable__raw__cell">
      {{ mutateDate(item.bestBeforeDate) }}
    </div>
    <div class="MainTable__raw__cell">{{ item.inventoryLevel }}</div>
    <div class="MainTable__raw__cell">
      <InventoryActionButton icon="edit" :id="item.id" />
      <InventoryActionButton icon="bin" :id="item.id" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { InventoryModel } from "../../aws/src/models";
import InventoryActionButton from "@/components/InventoryActionButton.vue";

@Component({
  components: {
    InventoryActionButton,
  },
})
export default class InventoryRaw extends Vue {
  @Prop({ required: true })
  public item!: InventoryModel;
  // This function here in case if API have a different formatting for dates like AWS for example
  mutateDate(awsFormattedDate: string): string {
    const dateFromString = new Date(awsFormattedDate);
    return `${dateFromString.getDate()}.${
      dateFromString.getMonth() + 1
    }.${dateFromString.getFullYear()}`;
  }
}
</script>
