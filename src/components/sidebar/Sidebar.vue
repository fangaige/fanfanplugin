<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu class="sidemenu" :class="isCollapse" collapse :menu-trigger="'click'">
      <sidebar-item
        v-for="route in menusData"
        :key="route.cFunUrl"
        :item="route"
        :isCollapse="isCollapse"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import SidebarItem from "./SidebarItem";

export default {
  name: 'Sidebar',
  props: ["isCollapse", "menusData"],
  components: { SidebarItem },
  methods: {
  },
  created () {
      console.log('menus', this.menusData)
  }

};
</script>
