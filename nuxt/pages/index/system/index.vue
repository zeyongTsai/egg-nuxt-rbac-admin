<template>
  <div></div>
</template>

<script>
export default {
  name: '',
  data () {
    return {

    }
  },
  async asyncData ({ redirect }) {
    redirect('/system/user')
  }
}
</script>
<router>
{
  meta: {
    title: 'System'
  }
}
</router>
<style scoped>
</style>
