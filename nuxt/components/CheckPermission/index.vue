<!--
 * @Author: caizeyong
 * @Date: 2021-01-26 09:49:52
 * @Description: 权限验证组件
-->
<script>
export default {
  name: 'CheckPermission',
  props: {
    permissions: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {}
  },
  render (h) {
    let permissions = this.$store.getters.permissions
    let isChecked = this.permissions.every(p => {
      return permissions.includes(p)
    })
    if (isChecked) {
      return this.$slots.default
    }
    return h()
  }
}
</script>

<style scoped>
</style>
