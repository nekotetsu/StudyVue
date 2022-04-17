<template>
  <span class="example">{{ msg }}</span>
</template>
<script>
export default {
  data() {
    return {
      msg: "world!",
      color: "blue",
    };
  },
};
</script>
<style lang="less">
body {
  color: red;
}
.example {
  color: v-bind("color");
}
</style>