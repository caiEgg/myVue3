<template lang="">
         
        <el-menu-item :index="menu.role_path"  v-if="!menu.children || menu.children.length == 0" >
            <image src="../assets/logo.png" style="width:30px;height:30px;"/>
            <span>{{ menu.right_name }}</span>
        </el-menu-item>
        <el-sub-menu v-else >
                <template #title>
                    <image src="../assets/logo.png" style="width:30px;height:30px;"/>
                  <span>{{ menu.right_name }}</span>
                </template>
               
                <!-- 二级菜单 -->
            <el-menu-item-group v-if=" menu.children&& menu.children.length>0">
                <testItem  v-for="item in menu.children" :key="item.id" :index="item.role_path" :menu="item"></testItem>
            </el-menu-item-group>
            <testItem v-else  v-for="item in menu.children" :key="item.id"  :menu="item" :index="item.role_path"></testItem>
            
        </el-sub-menu>

    
</template>

<script>

export default {
    name: 'testItem',
    props: {
        menu: Object
    }
}
</script>


<style lang="">
    
</style>