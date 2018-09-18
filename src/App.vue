<template>
	<div id="app">
		<Main :wordData="wordData"/>
	</div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Main from './components/Main.vue';
  import wordData from './assets/word-data.json';

  @Component({
    components: {
      Main,
    },
    data() {
      return {
        wordData,
      };
    },
  })
  export default class App extends Vue {
  }
</script>

<style lang="scss">
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>
