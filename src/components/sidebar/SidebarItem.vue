<template>
  <div v-if="item">
    <template v-if="!item.children ||  (item.children && !item.children.length) || findaction(item)">
      <router-link :to="{name : item.cFunUrl }" :key="item.cFunUrl" active-class="active-route">
        <el-menu-item
          :index="item.cFunUrl"
          :data-tooltip="item.cFunName "
          data-tooltip-positions="right"
          v-show="!isCollapse"
        >
          <i class="iconfont" :class="item.cFunIcon"></i>
        </el-menu-item>
        <el-menu-item v-show="isCollapse" :index="item.cFunUrl">
          <i class="iconfont" :class="item.cFunIcon"></i>
          <span class="title">{{item.cFunName}}</span>
        </el-menu-item>
      </router-link>
    </template>

    <el-submenu
      v-else
      :index="item.cFunUrl"
      :key="item.cFunUrl"
      :class="{'active-route': leftMenuDataIndex}"
    >
      <template slot="title">
        <i class="iconfont" :class="item.cFunIcon"></i>
        <span class="title">{{item.cFunName}}</span>
      </template>
      <template v-for="child in item.children">
        <sidebar-item
          v-if="child.children && child.children instanceof Array && child.children.length"
          :item="child"
          :key="child.cFunUrl"
          :isCollapse="true"
        />
        <router-link
          v-else-if="child.actionType=='page'"
          :to="{name:child.cFunUrl}"
          :key="child.cFunUrl"
          active-class="active-route"
        >
          <el-menu-item :index="child.cFunUrl">{{child.cFunName}}</el-menu-item>
        </router-link>
      </template>
    </el-submenu>
  </div>
</template>

<script>
// import { mapState } from "vuex";
import _ from "lodash";
export default {
  name: "SidebarItem",
  props: ["isCollapse", "item"],
  computed: {
    // 发现最左侧菜单 无法高亮，应该不是数据问题；因为老系统也无法高亮；
    leftMenuDataIndex() {
      const list = this.item.children

      let name = this.$route.name
      let b= false
      function recu (list){
        if(_.findIndex(list, { cFunUrl: name })>=0){
           b=true
        }else{
          _.forEach(list, function(item){
             if(item.children&&item.children.length>0){
                  recu(item.children)
              }
          })
        }
      }
      recu(list)
      return b
    },
  },
  methods: {
    // 判断 数据children中 actiontype是 action的 是页面里的button，菜单里都不渲染，page才是菜单；
    findaction(item){
      return item.children && (_.findIndex(item.children, { actionType: 'page' })==-1)
    }
  }
};
</script>
