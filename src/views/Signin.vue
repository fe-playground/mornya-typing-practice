<template>
  <div class="typing-practice-app">
    <h1>Typing Practice</h1>

    <div v-if="IS_SIGNEDIN">
      <h2><strong>{{ USERNAME }}</strong>님의 도전을 환영합니다!</h2>
      <button type="button" @click="onClickSignOut">하지만 로그아웃</button>
    </div>
    <div v-else>
      <h2>로그인 하세요</h2>
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
      <button type="button" @click="onClickSignIn">로그인</button>
      <div class="err" v-show="errors.has('username')">📣 이름을 정확히 입력해 주세요!</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Alert from '@/components/Alert'

export default {
  name: 'signin',
  components: {
    Alert,
  },
  data () {
    return {
      username: '',
    }
  },
  computed: {
    ...mapState({
      USERNAME: state => state.username,
      IS_SIGNEDIN: state => state.isSignedIn,
    }),
  },
  methods: {
    onClickSignIn () {
      this.$validator.validate()
        .then(result => {
          if (result) {
            this.$events.$emit('SHOW_ALERT', {
              title: '알림',
              content: `<strong>${this.username}</strong>님! 격하게 환영합니다 ㅎㅎ`,
              buttons: [
                { id: 'btn-cancel', label: '웃기네' },
                { id: 'btn-ok', label: '나도♥️', isPrimary: true },
              ],
              onClick: (selectedId) => {
                if (selectedId === 'btn-ok') {
                  this.SET_SIGNIN(this.username)
                  this.$router.push({ path: '/' })
                }
              },
            })
          }
        })
    },
    onClickSignOut () {
      this.SET_SIGNOUT()
    },
    ...mapMutations({
      SET_SIGNIN: 'setSignIn',
      SET_SIGNOUT: 'setSignOut',
    }),
  },
  mounted () {
    if (this.USERNAME) {
      this.username = this.USERNAME
    }
  },
}
</script>

<style scoped lang="scss">
  .err {
    margin-top: 8px;
    font-size: 14px;
    font-weight: bold;
    color: #ec6650;
  }
</style>
