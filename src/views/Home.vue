<template>
  <div>
    <router-view></router-view>
<tab-bar></tab-bar>
  </div>
</template>

<script>
import TabBar from '../components/TabBer.vue';

export default {
  components: { TabBar },
};
</script>

<style >

</style>
