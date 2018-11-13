<template>
  <ul>
    <li v-for="(item, index) in wordData" :key="index">
      <p>{{ item }}</p>
      <div class="input-area">
        <input
          ref="inputText"
          type="text"
          placeholder="위 문장을 입력하세요"
          :readonly="currentLine !== index"
          :autofocus="currentLine === index"
          @keyup="onKeyup"
        />
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'practice',
  props: [ 'wordData', 'setAllForks' ],
  data () {
    return {
      currentLine: 0,
    }
  },
  methods: {
    onKeyup (e) {
      if (this.wordData[ this.currentLine ] === e.target.value) {
        const inputTextRef = this.$refs.inputText

        this.currentLine++

        if (this.currentLine >= inputTextRef.length) {
          // 마지막 라인 텍스트를 모두 입력했다면
          this.$events.$emit('SHOW_ALERT', {
            title: '알림',
            content: `수고하셨습니다. 모두 입력했습니다.<br/>휴식을 취하십시오.`,
            onClick: this.setAllForks,
          })
        } else {
          // 아직 다음 라인이 존재한다면
          inputTextRef[ this.currentLine ].focus()
          // 스무스하게 해당 라인으로 스크롤
          window.scroll({
            left: 0,
            top: inputTextRef[ this.currentLine ].offsetTop - 50,
            behavior: 'smooth',
          })
        }
      }
    },
  },
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
      margin-bottom: 8px;
      border: 1px solid #f3f3f3;
      border-radius: 10px;

      p {
        margin: 12px 0 0;
        font-size: 18px;
        font-weight: bold;
      }

      .input-area {
        padding: 12px;

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
