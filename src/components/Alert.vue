<template>
  <div class="alertWrapper" @click.prevent="onClick('CLOSE')" v-if="isShow">
    <div @click.stop>
      <div class="content">
        <strong v-show="title">{{ title }}</strong>
        <div :class="contentClass" v-html="content"></div>
      </div>
      <div :class="`buttons ${mode}`">
        <button
          v-for="(item, index) in buttons"
          :key="`btn-${index}`"
          :class="item.isPrimary ? 'default' : ''"
          @click.prevent="onClick(item.id)"
        >
          {{ item.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
const defaultButtons = [
  { id: 'btn-ok', label: '확인', isPrimary: false },
]

export default {
  name: 'alert',
  data () {
    return {
      isShow: false,
      mode: 'alert',
      title: '',
      content: '',
      buttons: [],
      contentClass: '',
      onClick () {},
    }
  },
  created () {
    // Alert 보이기 이벤트 발생시
    this.$events.$on('SHOW_ALERT', props => {
      this.isShow = true
      this.title = props.title
      this.content = props.content
      this.buttons = Array.isArray(props.buttons) && props.buttons.length ? props.buttons : defaultButtons
      this.contentClass = props.contentClass
      this.onClick = (selectedId) => {
        this.isShow = false
        props.onClick(selectedId)
      }
    })
    // Alert 감추기 이벤트 발생시
    this.$events.$on('HIDE_ALERT', () => {
      this.isShow = false
    })
  },
  beforeDestroy () {
    this.$events.$off('SHOW_ALERT')
    this.$events.$off('HIDE_ALERT')
    this.onClick('CLOSE')
  },
  watch: {
    isShow (nextValue) {
      if (nextValue) {
        this.$utils.UI.freezeBody()
      } else {
        this.$utils.UI.unfreezeBody()

        this.title = ''
        this.content = ''
        this.buttons = []
        this.contentClass = ''
        this.onClick = () => {}
      }
    },
    buttons (nextValue) {
      if (nextValue && nextValue.length) {
        this.mode = nextValue.length === 1 ? 'alert' : 'confirm'
      }
    },
  },
}
</script>

<style scoped lang="scss">
  .alertWrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(38, 38, 40, .7);
    z-index: 999;

    & > div {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -117px;
      margin-left: -148px;
      width: 296px;
      height: 234px;
      background-color: #fff;
      text-align: center;
      border-radius: 8px;
      box-shadow: rgba(0, 0, 0, 0.4) 0 0 30px 5px;

      .content {
        position: absolute;
        top: 52px;
        right: 0;
        bottom: 52px;
        left: 0;
        padding: 0 20px;
        box-sizing: border-box;
        font-size: 14px;
        color: #1a1a1c;

        /* title */
        & > strong {
          display: block;
          line-height: 2em;
          font-size: 20px;
        }
      }

      .buttons {
        display: flex;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 52px;
        font-size: 0;

        & > button {
          flex-grow: 1;
          margin: 0;
          height: 52px;
          border: 0;
          box-shadow: inset 0 1px 0 0 #ebebeb;
          background-color: #fff;
          font-size: 14px;
          color: #1a1a1c;

          &.default {
            background-color: #1a1a1c;
            font-weight: bold;
            color: #fff;
          }
          &:first-of-type {
            border-bottom-left-radius: 8px;
          }
          &:last-of-type {
            border-bottom-right-radius: 8px;
          }
        }
      }
    }
  }
</style>
