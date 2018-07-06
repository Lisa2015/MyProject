<template>
    <section class="main">
        <h3>我来了{{name}}</h3>
        <img src="../img/timh(36).jpg" alt="">
    </section>
</template>

<script>
export default {
  data() {
    return {
      name: "Helloworld"
    };
  }
};
</script>

<style>
.main > p {
  color: #00ff;
}
</style>