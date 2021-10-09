<template>
  <section class="SecondTask">
    <TicketManager />
    <TicketItem />
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TicketItem from "../components/TicketItem.vue";
import TicketManager from "@/components/TicketManager.vue";

@Component({
  components: {
    TicketManager,
    TicketItem,
  },
})
export default class SecondTask extends Vue {}
</script>
<style lang="scss">
.SecondTask {
  display: flex;
  flex-wrap: wrap;
}
</style>
