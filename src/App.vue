<template>
  <el-row>
    <el-col :span="4">
      <el-scrollbar>
        <el-menu>
          <!--外层 div 用于在 el-menu-item 而不是router-link 判断 v-if,避免空白菜单栏-->
          <el-menu-item v-for="route in routes" :key="route.name" :index="route.path">
            <router-link :to="route.path" style="text-decoration: none">
              {{ route.meta.zh_label }}
            </router-link>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-col>

    <el-col :span="20">
      <router-view></router-view>
    </el-col>
  </el-row>
</template>

<script>
import router from "@/router";

export default {
  name: 'App',
  data() {
    return {}
  },
  computed: {
    routes() {
      return router.getRoutes().filter(route => route.meta.zh_label !== undefined);
    },
  },
  methods: {}
}
</script>

<style>
</style>