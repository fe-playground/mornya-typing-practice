<template>
  <div class="typing-practice-app">
    <h1>Typing Practice</h1>

    <div v-if="!isStarted">
      <p>시작하기 버튼을 클릭해서 타이핑 연습을 시작하세요.</p>
      <p>로그인하시면 해당 이름으로 랭킹이 책정됩니다.</p>
      <br/>
      <button type="button" @click="onClickStart">시작하기</button>
    </div>
    <div v-else>
      <h2>진행중입니다!</h2>
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
      USERNAME: state => state.username,
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
      this.$events.$emit('SHOW_ALERT', {
        title: '알림',
        content: `<strong>${this.USERNAME || '아무개'}</strong>님! 이제 시작합니다.<br/>심호흡을 하고, 시작하세요!`,
        buttons: [
          { id: 'btn-cancel', label: '기권' },
          { id: 'btn-ok', label: '쒸작!', isPrimary: true },
        ],
        onClick: (selectedId) => {
          if (selectedId === 'btn-ok') {
            // 진행 시작
            this.rankId = new Date().getTime()

            this.isStarted = true
            this.startTime = new Date()

            this.timerId = setInterval(() => {
              this.endTime = new Date()
              this.elapsedTime = Number(this.endTime) - Number(this.startTime)
              this.SET_RANKING({
                id: this.rankId,
                username: this.USERNAME,
                timestamp: this.endTime,
                elapsed: this.elapsedTime,
              })
            }, 1000)
          }
        },
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
  beforeRouteLeave (to, from, next) {
    if (this.isStarted) {
      this.$events.$emit('SHOW_ALERT', {
        title: '알림',
        content: `지금 페이지를 나가도 랭킹은 책정됩니다.<br/>레알 나가실겁니까?`,
        buttons: [
          { id: 'btn-cancel', label: '아앗 쏘리' },
          { id: 'btn-ok', label: '벗어나고파!', isPrimary: true },
        ],
        onClick: (selectedId) => {
          if (selectedId === 'btn-ok') {
            next()
          }
        },
      })
    } else {
      next()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .typing-practice-app {
    .timer-area {
      margin-top: 8px;
      p {
        margin: 4px;
        line-height: 1.2em;
      }
    }
  }
</style>
