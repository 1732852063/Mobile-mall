<template>
  <div class="shopping">
    <!-- 标题 -->
    <div class="top-nav">
      <van-nav-bar title="购物车" right-text="删除" @click-right="del">
      </van-nav-bar>
    </div>
    <!-- 列表 -->
    <div class="card-list">
      <van-checkbox-group v-model="result"  ref="checkboxGroup">
        <div class="card-box" v-for="item in list" :key="item.id">
          <van-checkbox class="check" :name="item.id"> 

          </van-checkbox>
          <goodsCard v-bind="item" :num="counterMap[item.id]" :nofly="true">

          </goodsCard>
        </div>
      </van-checkbox-group>
    </div>
    <!-- 结算 -->
    <van-submit-bar :price="allMoney" :button-text="`去结算${totalNum}`" @submit="onSubmit"
    >
      <van-checkbox v-model="checked" @click="checkAll">
        全选
      </van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { Dialog, Toast } from 'vant'
import { mapMutations, mapState } from 'vuex';
import goodsCard from '../components/GoodsCard.vue'
export default {
  components: {
    goodsCard,
  },
  data() {
    return {
      result: [],
      list: [],
      checked: false,

    }
  },
  computed: {
    ...mapState({
      counterMap: (state) => state.counterMap
    }),
    allMoney() {
      const resArr = this.list.filter((item) => this.result.includes(item.id));
      return resArr.reduce((prev, next) => {
        const num = this.counterMap[next.id] || 0;
        return Math.round(num * next.price * 100) + prev;
      },0)
    },
    totalNum() {
      const resArr = this.list.filter((item) => this.result.includes(item.id));
      const res = resArr.reduce((prev, next) => prev + (this.counterMap[next.id] || 0), 0);
      return res;
    }
  },
  watch: {
    result() {
      if (this.result.length === this.list.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    }
  },
  methods: {
    ...mapMutations(['storageChange']),
    async getAllData() {
      const result = Object.keys(this.counterMap);
      const res = await this.$api.getGoodsByIds(result.join());
      this.list = res.list;
    },
    checkAll() {
      if (this.checked) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll(false);
      }
      
    },
    async del() {
      if (this.result.length === 0) {
        Toast('你没有选择商品')
        return;
      }
      try {
        await Dialog.confirm({ message: '您是否删除已经选中的商品' });
        this.result.forEach((id) => {
          this.storageChange({ id, value: -Infinity });
          this.list = this.list.filter((item)=>!this.result.includes(item.id))
        })
      }
      catch (error) {
        Toast('用户点击了取消')
      }
    },
    onSubmit() {
      
    }

  },
  created() {
    this.getAllData();
  }
};
</script>

<style lang="less" scoped>
.shopping {
  background: #eee;
  min-height: 100vh;

  .top-nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
  }

  .card-list {
    width: 100%;
    position: absolute;
    top: 46px;
    z-index: 0;
    box-sizing: border-box;
    padding: 10px 10px 100px 10px;
    background: #fff;

    .card-box {
      display: flex;
      justify-content: center;

      .check {
        margin-right: 10px;
        flex-shrink: 0;
      }
    }
  }
  .van-submit-bar {
      bottom: 50px;
    }
}
</style>
