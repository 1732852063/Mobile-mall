<template>
    <div class="classify-wrapper">
        <router-link class="search-btn" tag="div" to="/search">
            <!-- 搜索栏 -->
            <van-icon name="search" />
            <div>蔬菜</div>
        </router-link>
        <!-- 一级导航 -->
        <one-tab></one-tab>
        <!-- 二级导航 -->
        <template v-if="showContent">
        <side-bar></side-bar>
        <goods-list></goods-list>
        </template>
        <van-loading size="2rem" vertical v-else />
    </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import OneTab from '../components/OneTab.vue';
import SideBar from '../components/SideBar.vue';
import GoodsList from '../components/GoodsList.vue';

export default {
    computed: {
        ...mapState({
            showContent: (state) => state.showContent,
            sideList: (state) => state.sideList
        })
    },
    methods: {
        ...mapMutations(['resetGoodsList']),
        ...mapActions(['getGoodsList'])
    },
    components: {
        OneTab,
        SideBar,
        GoodsList,
    },
    watch: {
        showContent() {
            if (this.showContent) {
                this.resetGoodsList();
                this.getGoodsList({ type: this.sideList[0], page: 1, sortType: 'all' })
            }
        }
    }
};
</script>
<style lang="less" scoped>
.classify-wrapper {
    width: 375px;

    .search-btn {
        width: 365px;
        height: 33px;
        line-height: 33px;
        background-color: #eee;
        margin: 11px auto 0;
        border-radius: 10px;
        font-size: 14px;
        text-align: center;
        color: #a1a1a1;

        >* {
            display: inline-block;
            vertical-align: middle;
        }
    }
}
</style>
