<template>
  <div class="typing-practice-app">
    <h1>Typing Practice</h1>
    <div v-if="!isStarted">
      <p>이름을 입력하고 "시작" 버튼을 눌러 타이핑 연습을 시작하세요.</p>
      <div>
        <label for="username">
          <input
            type="text"
            id="username"
            placeholder="이름"
            minlength="2"
            maxlength="10"
            v-model="username"
            v-validate="'required|min:2|max:10'"
            data-vv-name="username"
            autofocus
          />
        </label>
        <button type="button" @click="onClickStart">시작</button>
      </div>
      <div class="err" v-show="errors.has('username')">이름을 정확히 입력해 주세요.</div>
    </div>
    <div v-else>
      <practice
        :wordData="wordData"
        :setAllForks="setAllForks"
      />
      <div class="timer-area">
        <p>시작 시간: {{ startTime | toTimeString }}</p>
        <p>종료 시간: {{ endTime | toTimeString }}</p>
        <p>소요 시간: {{ elapsedTime | toTimeDiffString }}</p>
        <p>당신의 현재 랭킹: {{ rankingIndex }}등</p>
      </div>
    </div>

    <ranking :ranking="RANKING"/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import wordData from '@/assets/word-data.json'
import Practice from '@/components/Home/Practice'
import Ranking from '@/components/Home/Ranking'

export default {
  name: 'home',
  components: {
    Practice,
    Ranking,
  },
  data () {
    return {
      username: '',
      rankId: null,
      wordData,
      timerId: -1,
      startTime: null,
      endTime: null,
      elapsedTime: 0,
      isStarted: false,
      isAllForks: false,
    }
  },
  computed: {
    rankingIndex () {
      const rank = this.RANKING.findIndex(item => item.id === this.rankId)
      return rank === -1 ? 1 : (rank + 1)
    },
    ...mapState({
      RANKING: 'ranking',
    }),
  },
  methods: {
    setAllForks () {
      if (this.timerId !== -1) {
        clearInterval(this.timerId)
      }

      this.isAllForks = true
      this.isStarted = false
      this.endTime = new Date()
      this.elapsedTime = Number(this.endTime) - Number(this.startTime)
    },
    onClickStart () {
      this.$validator.validate()
        .then(result => {
          if (result) {
            this.$events.$emit('SHOW_ALERT', {
              title: '알림',
              content: '이제 시작합니다.<br/>심호흡을 하고, 시작하세요!',
              buttons: [
                { id: 'btn-cancel', label: '기권' },
                { id: 'btn-ok', label: '쒸작!', isPrimary: true },
              ],
              onClick: (selectedId) => {
                if (selectedId === 'btn-ok') {
                  // 진행 시작
                  this.SET_USERNAME(this.username)
                  this.rankId = new Date().getTime()

                  this.isStarted = true
                  this.startTime = new Date()

                  this.timerId = setInterval(() => {
                    this.endTime = new Date()
                    this.elapsedTime = Number(this.endTime) - Number(this.startTime)
                    this.SET_RANKING({
                      id: this.rankId,
                      username: this.username,
                      timestamp: this.endTime,
                      elapsed: this.elapsedTime,
                    })
                  }, 1000)
                }
              },
            })
          }
        })
    },
    ...mapActions({
      SET_USERNAME: 'setUsername',
      SET_RANKING: 'setRanking',
    }),
  },
  beforeDestroy () {
    if (this.timerId > 0) {
      clearInterval(this.timerId)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  h3 {
    margin: 40px 0 0;
    text-align: center;
  }

  input, button {
    padding: 8px 10px;
  }

  .typing-practice-app {
    .err {
      font-size: 14px;
      font-weight: bold;
      color: #ec6650;
    }

    .timer-area {
      margin-top: 8px;
      p {
        margin: 4px;
        line-height: 1.2em;
      }
    }
  }
</style>
