<template>
  <div class="progress2 progress-moved">
    <div class="progress-bar2"></div>                       
  </div>
  <h1>Attack {{value}}</h1>

</template>


<script>
export default {
    name: "ProgressBar2",
    props:{
        value:{
          type:Number,
          default:80,
        },
        stat:{
          type:String,
        }
    },
    computed: {
        Width() {
            return '@keyframes load {0% { width: 0; }100% { width:'+ this.value+ '%; }';
        }
    }
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
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  transition: 0.4s linear;  
  transition-property: width, background-color;    
}

.progress-moved .progress-bar2 {
  animation: progressAnimation 1s normal forwards;
}

@keyframes progressAnimation {
  0%   { width: 2.5%; background-color: #ffbf49;}
  100% { width: 80%; background-color: #FFBF49; }
}
</style>