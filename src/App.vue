<template>
  <div id="app">
    <div id="nav">
      <router-link to="/task1">First task</router-link> |
      <router-link to="/task2">Second task</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px 0;
  text-align: left;

  a {
    font-weight: bold;
    color: rgba(69, 72, 83, 0.67);

    &.router-link-exact-active {
      color: rgb(87, 64, 134);
    }
  }
}
</style>
