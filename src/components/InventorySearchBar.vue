<template>
  <div class="Search">
    <input
      class="search-box"
      type="text"
      v-model="searchValue"
      v-on:input="updateSearchStore()"
      placeholder="enter text here to filter table"
    />
    <button
      v-on:click="clearSearch()"
      v-if="searchValue.length > 0"
      class="close-icon"
      type="reset"
    ></button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, namespace } from "vuex-class";
const InventoryActionNames = namespace("inventory", Action);

@Component
export default class InventorySearchBar extends Vue {
  public searchValue = "";
  @InventoryActionNames updateSearchValue: (searchValue: string) => void;
  updateSearchStore(): void {
    this.updateSearchValue(this.searchValue);
  }
  clearSearch(): void {
    this.searchValue = "";
    this.updateSearchStore();
  }
}
</script>

<style lang="scss" scoped>
.Search {
  position: relative;
  min-width: 96%;
  .search-box {
    position: relative;
    padding: 10px;
  }
  .search-box {
    width: 100%;
    padding: 0.5rem 2rem 0.5rem 0.5rem;
    box-sizing: border-box;
    margin-bottom: 1rem;
    outline: none;
  }
  .close-icon {
    position: absolute;
    border: 1px solid transparent;
    background-color: transparent;
    display: inline-block;
    vertical-align: middle;
    outline: 0;
    cursor: pointer;
    top: 14px;
  }
  .close-icon:after {
    content: "X";
    display: block;
    width: 15px;
    height: 15px;
    position: absolute;
    background-color: #fa9595;
    z-index: 1;
    right: 1.2rem;
    top: 0;
    bottom: 0;
    margin: auto;
    padding: 2px;
    border-radius: 50%;
    text-align: center;
    color: white;
    font-weight: normal;
    font-size: 12px;
    box-shadow: 0 0 2px #e50f0f;
    cursor: pointer;
  }
}
</style>
