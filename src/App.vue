<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
    </div>
    <div>
      <router-view/>
    </div>
    <alert/>
  </div>
</template>

<script>
import Alert from '@/components/Alert'

export default {
  name: 'app',
  components: {
    Alert
  },
}
</script>

<style scoped lang="scss">
  body {
    &.__ui-frozen-body__ {
      position: fixed;
      overflow: hidden;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin-top: 0;
      -webkit-backface-visibility: hidden;
      -moz-backface-visibility: hidden;
      backface-visibility: hidden;
    }
    &.__ui-unfrozen-body__ {
      position: fixed;
      overflow: auto;
    }
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 60px;
  }

  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
