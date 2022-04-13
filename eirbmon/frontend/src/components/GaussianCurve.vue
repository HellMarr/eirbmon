<template>
    <div class="courbe">
        <img class="image" src="../assets/gaussienne.png">
        <div class="bar" :style="style"></div>
    </div>
</template>

<script>
export default {
  props: {
    left:Number,
  },
  computed: {
    style() {
     return `left: ${this.left/2}%;`;
    }
  },
}
</script>

<style>
.courbe{
  position:relative;
}

.image{
  width:100%;
}

.bar{
  border-left: 5px solid red;
  border-radius: 10px;
  height: 100%;
  margin-left: -3px;
  position: absolute;
  top: 0;
}
</style>