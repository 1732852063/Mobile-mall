<template>
    <van-tabbar route fixed>
        <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
        <van-tabbar-item icon="apps-o" to="/home/classify">分类</van-tabbar-item>
        <van-tabbar-item 
        id="shop-car"
        icon="shopping-cart-o" 
        to="/home/shopping" 
        :badge="badge"
        >购物车</van-tabbar-item>
        <van-tabbar-item icon="contact" to="/my">我的</van-tabbar-item>
    </van-tabbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState({
            counterMap: (state) => state.counterMap,
        }),
        badge() {
            const count = Object.values(this.counterMap).reduce((prev, next) => prev + next,0)
            if (count > 99) {
                return '99+'
            } else {
                return count
            }
        },
    }
};
</script>

<style>

</style>
