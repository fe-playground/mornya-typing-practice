<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/signin">Signin</router-link>
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

<style lang="scss">
  body {
    padding: 0;
    margin: 0;
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

  h1, h2 {
    color: #42b983;
    letter-spacing: -.03em;
  }
  h1 {
    font-weight: bold;
  }
  h3 {
    margin: 40px 0 0;
    text-align: center;
  }
  input {
    padding: 8px 10px;
    height: 14px;
    border: 1px solid #eee;
    border-radius: 2px;
  }
  button {
    margin: 0 2px;
    padding: 8px 10px;
    border: 1px solid #cceecc;
    border-radius: 2px;
    background-color: #e0ffe0;
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
    text-align: right;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
