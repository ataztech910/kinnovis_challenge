<template>
  <div class="FirstTask__raw">
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
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { InventoryModel } from "../../aws/src/models";

@Component
export default class InventoryRaw extends Vue {
  @Prop({ required: true })
  public item!: InventoryModel;
  created(): void {
    console.log(this.item);
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
