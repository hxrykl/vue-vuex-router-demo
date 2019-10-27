<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">home</router-link>|
      <router-link to="/about">about</router-link>|
      <router-link to="/customer">顾客管理</router-link>|
      <router-link to="/category">栏目管理</router-link>|
      <router-link to="/product">产品管理</router-link>|
      <router-link to="/order">订单管理</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
