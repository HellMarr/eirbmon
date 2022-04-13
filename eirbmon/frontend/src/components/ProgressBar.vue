<template>
  <div class="progress2 progress-moved">
    <div class="progress-bar2" :style="style"></div>                       
  </div>
</template>


<script>
export default {
    name: "ProgressBar2",
    props:{
      value:{
        type:Number,
        default:70,
      },
    },
  computed: {
    style () {
     return `width: ${this.value}%;`;
    }
  },
}
</script>

<style scoped>
body{
  display: flex;
  flex-direction: row;
}
.progress2 {
  padding: 5px;
  border-radius: 1.5em;
  background: rgba(0, 0, 0, 0.25);  
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25), 0 1px rgba(255, 255, 255, 0.08);
  width: 50%;
}

.progress-bar2 {
  height: 10px;
  border-radius: 1.5em;
  background-color: #FFBF49;
}
</style>