<template>
	<ul>
		<li v-for="(item, index) in wordData">
			<p>{{ item }}</p>
			<div class="input-area">
				<input
					ref="inputText"
					type="text"
					placeholder="위 문장을 입력하세요"
					:readonly="current !== index"
					:autofocus="current === index"
					@keyup="onKeyup"
				/>
			</div>
		</li>
	</ul>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class Main extends Vue {
    @Prop() public wordData: string[];
    @Prop() public setAllForks: () => void;

    private currentLine: number = 0;

    public onKeyup(e: any): void {
      if (this.wordData[ this.currentLine ] === e.target.value) {
        const inputTextRef: any = this.$refs.inputText;

        this.currentLine++;

        if (this.currentLine >= inputTextRef.length) {
          // 마지막 라인 텍스트를 모두 입력했다면
          this.setAllForks();
        } else {
          // 아직 다음 라인이 존재한다면
          inputTextRef[ this.currentLine ].focus();
        }
      }
    }

    get current() {
      return this.currentLine;
    }

    set current(currentLine) {
      this.currentLine = currentLine;
    }
  }
</script>

<style scoped lang="scss">
	ul {
		display: inline-block;
		margin: 0;
		padding: 0;
		width: 80%;
		text-align: center;
		list-style-type: none;

		li {
			display: block;
			margin-bottom: 4px;
			border: 2px solid #aaa;
			border-radius: 4px;

			p {
				margin: 8px 0 0;
				font-size: 18px;
				font-weight: bold;
			}

			.input-area {
				padding: 8px;

				& > input {
					box-sizing: border-box;
					padding: 8px;
					width: 100%;
					border: 2px solid #0c0;
					border-radius: 4px;
					background-color: rgba(#0e0, .1);
					font-size: 16px;
					font-weight: bold;
					color: #060;

					&[readonly] {
						border-color: transparent;
						background-color: #eee;
						color: #aaa;
					}
				}
			}
		}
	}
</style>