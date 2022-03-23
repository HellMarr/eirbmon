<template>
    <div class="container">
        <img class="image" :style="style" src="../assets/abeille_sortie_accessories3.svg">
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
    </div>
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
.container{
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

.info {
  background: #16A116;
}
.telecom {
  background: #fbc235;
}
.elec {
  background: #198DBC;
}
.matmeca{
  background: #E74737;
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