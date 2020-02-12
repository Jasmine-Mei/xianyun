<template>
  <div class="flights">
    <!-- 列表头部组件 -->
    <FlightsListHead />

    <!-- 航班信息 -->
    <div>
      <!-- 计票数据列表组件 -->
      <FlightsItem
        v-for="(item, index) in dataList"
        :key="index"
        :data="item"
      />

      <!-- 分页组件 -->
      <!-- size-change: 切换条数时候触发的事件
                current-change: 切换页面时候触发的事件
                current-page: 当前的页数
                page-size: 当前的条数
                total: 总条数 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead";
import FlightsItem from "@/components/air/flightsItem";
export default {
  data() {
    return {
      // 机票总数据 （有info, flights, total, options这些属性）
      flightsData: {}, // 航班总数据
      // 当前页数
      pageIndex: 1,
      // 当前的条数
      pageSize: 5,
      // 总条数
      total: 0
    };
  },
  components: {
    FlightsListHead,
    FlightsItem
  },
  methods: {
    // 获取航班总数据
    getData() {
      this.$axios({
        url: `/airs`,
        params: this.$route.query // 来自URL的5个参数
      }).then(res => {
        // 总数据
        this.flightsData = res.data;
        // 修改总条数
        this.total = this.flightsData.lights;
      });
    },
    // 切换条数时候触发的事件
    handleSizeChange(index) {
      this.pageSize = index;
    },
    // 切换页面时出发的事件
    handleCurrentChange(index) {
      this.pageIndex = index;
    }
  },
  computed: {
    dataList() {
      // 判断flightsData有没有值
      if (!this.flightsData.flights) {
        // 没有值返回一个空数组
        return [];
      }
      // 第一页是0-5，第二页是5-10，第三页是10-15
      const arr = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
      return arr;
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style></style>
