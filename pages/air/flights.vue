<template>
  <div class="flights">
    <!-- 列表头部组件 -->
    <FlightsListHead />

    <!-- 航班信息 -->
    <div>
      <!-- 计票数据列表组件 -->
      <FlightsItem
        v-for="(item, index) in flightsData.flights"
        :key="index"
        :data="item"
      />
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
      dataList: [] // 航班列表数据，用于循环flightsItem组件，单独出来是因为要分页
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
        this.flightsData = res.data;
        // this.dataList = this.flightsData.lights;
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style></style>
