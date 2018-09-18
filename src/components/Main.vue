<template>
	<div class="hello">
		<h1>Typing Practice</h1>
		<div v-if="!startTime">
			<p>시작 버튼을 눌러 타이핑 연습을 시작하세요.</p>
			<div>
				<button type="button" @click="onClickStart">시작</button>
			</div>
		</div>
		<div v-else>
			<Practice
				:wordData="wordData"
				:setAllForks="setAllForks"
			/>
			<div>
				<button type="button" @click="onClickFinish">종료</button>
			</div>
			<div class="timer-area">
				START TIME: {{ getTimeString(startTime) }}<br/>
				END TIME: {{ getTimeString(endTime) }}<br/>
				ELAPSED TIME: {{ diffTimeString(elapsedTime) }}<br/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import Practice from './Practice.vue';
  import { getTimeString, diffTimeString } from '../utils/TimeFormat';

  @Component({
    components: {
      Practice,
    },
    methods: {
      getTimeString,
      diffTimeString,
    },
  })
  export default class Main extends Vue {
    @Prop() private wordData: string[];

    private startTime?: Date;
    private endTime?: Date;
    private elapsedTime: number = 0;
    private isAllForks: boolean = false;

    public onClickStart() {
      alert('시작합니다. 준비하세요!');
      this.startTime = new Date();
    }

    public onClickFinish() {
      if (this.isAllForks) {
        alert('종료되었습니다!');
        this.endTime = new Date();
        this.elapsedTime = Number(this.endTime.getMilliseconds()) - Number(this.startTime.getMilliseconds());
      } else {
        alert('아직 모든 텍스트가 입력되지 않았습니다!');
      }
    }

    private setAllForks(): void {
      this.isAllForks = true;
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	h3 {
		margin: 40px 0 0;
	}

	.timer-area {
		margin-top: 8px;
	}
</style>
