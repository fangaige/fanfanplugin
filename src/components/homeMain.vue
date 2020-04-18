<template>
  <div class="Home_container" :class="{iframe:iframe}">
    <el-row class="top-bar" type="flex" justify="space-between">
      <div class="logo">
        <img class="app-logo" src="@assets/hedalogo.png" />
      </div>
      <el-row type="flex" justify="end" class="tag-wraper">
        <el-dropdown
          class="topUserWraper"
          trigger="click"
          @visible-change=" val => this.elDropdownActive = val"
        >
          <span class="el-dropdown-link">
            <i class="icon-yonghu iconfont"></i>
            {{userInfo.userName}}
            <i
              class="el-icon-caret-bottom el-icon--right"
              :class="{active:elDropdownActive}"
            ></i>
          </span>
          <el-dropdown-menu slot="dropdown" class="topUserMenu">
            <el-dropdown-item @click.native="editUserPassword">
              <i class="icon-unie604 iconfont"></i> 修改密码
            </el-dropdown-item>
            <el-dropdown-item @click.native="longinOut">
              <i class="icon-qiehuanzuhu iconfont"></i> 退出系统
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-row>

    <el-row
      class="mian-wrapper"
      :class="{isCollapse:isCollapse}"
    >
      <div class="sidebar-body">
        <el-scrollbar>
          <Sidebar
            v-if="functions[0] && functions[0].children && functions[0].children.length > 0"
            :isCollapse="isCollapse"
            :menusData="functions[0].children"
          />
        </el-scrollbar>
        <el-button class="el-menu-control" @click="leftMenuControl">
          <i class="icon-qiehuan iconfont"></i>
        </el-button>
      </div>
      <div
        class="main-body"
        :class="{fullScreen : fullscreen, horizontal: !fullscreen,flexible:flexible}"
      >
        <router-view />
      </div>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Sidebar from "./sidebar/Sidebar.vue";

export default {
  name: 'homeMain',
  components: {
    Sidebar
  },
  data() {
    return {
      elDropdownActive: false, //顶部登陆drap
      menuDropdownActive: false, //顶部更多drap
      isCollapse: false,
      // menusDataList: "", //当前所处的大类
      // leftMenuData: "", //左侧侧边栏高亮 active    
      // olderRoute: "", //判断路由是否需要刷新
      // fullScreenValue: false,
    };
  },
  computed: {
    ...mapState("settings", [
      "iframe",
      "fullscreen",
      "flexible",//地图中左侧表格收缩
    ]),
    ...mapState("user", [
      "userInfo",
      "functions"
    ]),
  },
  created() {
    console.log(this.iframe,this.userInfo)

  },
  mounted() {},
  methods: {
    //左侧导航伸展方法
    leftMenuControl() {
      this.isCollapse = !this.isCollapse;
    },
    editUserPassword() {},
    longinOut() {},
  }

};
</script>
