<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <a href="https://arsan.dev" target="_blank">Arsan Dev</a> (c) 2019
    <br><br>
    Mail: <b>tganteng77@gmail.com</b> <br>
    Github: <b><a href="https://github.com/arsandev" target="_blank">https://github.com/arsandev</a></b> <br><br><br>
    <a target="_blank" href="https://paypal.me/mtegarsp">Donate</a>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style scoped>
  a{
    color:#2b67a0;
    text-decoration: none;
  }
</style>
