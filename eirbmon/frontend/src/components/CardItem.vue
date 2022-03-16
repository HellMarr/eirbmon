<template>
<head>


</head>
  <div class="container" :style="style">
    <img class="image" src="../assets/Salameche.png">
    <div class="description">
      <div class="upper-div">
        <div class="name">{{name}}</div> 
      </div>
      <div class="types">
        <div class="type" v-for="type in types" :key="type" :class="type">
          {{type}}
        </div>
      </div>
      <div class="stats">
        <div class="id">{{id}}</div>
        <div class="price">{{price}} ETH</div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardItem',
  props:{
    name:String,
    id:String,
    price:String,
    types:Array,
    color:String,
  },
  computed: {
    style () {
      return 'background-color: ' + this.color;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* Pour l'url de l'image regarder le parsing du webpath https://cli.vuejs.org/guide/html-and-static-assets.html#url-transform-rules*/
/*https://codepen.io/lyon-etyo/pen/OJmyMGd*/
.container{
  background: #ECE9E6;
  width:100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.1);
  background-size: cover;
}

.image{
  margin: 15px;
}

.description{
  display: flex;
  flex-direction: column;
  gap: .5rem;
  background: rgba(238, 238, 238, 0.7);
  border-radius: 20px;
}

.upper-div{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.name{
  font-size: 25px;
  margin-left: -10px;
  font-family: 'Fredoka', sans-serif;
}

.types{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap:5px;
}

.type {
  align-self: flex-start;
  padding: .25em .75em;
  border-radius: 1em;
  background: #a8a878;
  color: #fafafa;
  text-transform: capitalize;
}

.fire {
  background: #f08030;
}
.water {
  background: #6890f0;
}
.plant {
  background: #78c850;
}
.electrik{
  background: #f8d030;
}
.ice {
  background: #98d8d8;
}
.fight{
  background: #c03028;
}
.poison{
  background:#a040a0;
}
.ground {
  background: #e0c068;
}
.rock {
  background: #6b3d22;
}
.flight{
  background:#a890f0;
}
.psy{
  background: #f85888;
}
.insect {
  background: #a8b820;
}
.ghost {
  background: #705898;
}

.stats{
  font-family: 'Lato', sans-serif;
  color:rgb(65, 51, 51);
  text-transform: uppercase;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

</style>