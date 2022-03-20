<template>
    <body>
        <img class="image" :style="style" src="../assets/Salameche.png">
        <div class="description">
          <div class="upper-div">
            <div class="infos">
              <div class="name">{{name}}</div> 
              <div class="id">{{id}}</div>
            </div>
            <div class="tags-div">
              <div class="types">
                <div class="type" v-for="type in types" :key="type" :class="type">
                  {{type}}
                </div>
              </div>
            </div>
          </div>
          <div class="lower-div">
            <ProgressBar/>
          </div>
        </div>
    </body>
</template>


<script>
import ProgressBar from './ProgressBar.vue'

export default {
    name: "EirbMonItem",
    props: {
        name: String,
        id: String,
        price: String,
        types: Array,
        color: String,
    },
    computed: {
        style() {
            return "background-color: " + this.color;
        }
    },
    components:{
      ProgressBar,
    }
}
</script>

<style scoped>
/*https://codepen.io/WebDevSimplified/pen/oVXKQx*/
body{
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.image{
  margin: 15px;
  width:400px;
  border-radius: 20px;
  background-size: cover;
}

.description{
  width:50%;
  padding:25px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background-size: cover;
  background: rgba(238, 238, 238, 0.7);
}

.upper-div{
  display:flex;
  flex-direction: row;
  justify-content: space-between;
}
.infos{
  display:flex;
  flex-direction: row;
  justify-content: space-between;
}
.name, .id{
  font-size: 50px;
  font-family: 'Fredoka', sans-serif;
}

.id{
  color:rgb(117, 117, 117);
}

.tags-div{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}


.lower-div{
  display: flex;
  flex-direction: column;
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
  font-size:20px;
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


@media (max-width: 800px){
  body{
    flex-direction: column;
  }
  
  .upper-div{
    flex-direction: column;
  }
  .description{
    width: 100%;
  }
}

</style>