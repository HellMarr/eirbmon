<template>
  <div @click="RedirectToEirbmonPage" class="container" :style="style">
    <img class="image" :src="image">
    <div class="description">
      <div class="upper-div">
        <div class="name">#{{nft_id}}</div> 
      </div>
      <div class="types">
        <div class="type" :class="nft_type">
          {{nft_type}}
        </div>
        <div class="type">
          {{nft_potential}}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="white"><path d="M240.5 224H352C365.3 224 377.3 232.3 381.1 244.7C386.6 257.2 383.1 271.3 373.1 280.1L117.1 504.1C105.8 513.9 89.27 514.7 77.19 505.9C65.1 497.1 60.7 481.1 66.59 467.4L143.5 288H31.1C18.67 288 6.733 279.7 2.044 267.3C-2.645 254.8 .8944 240.7 10.93 231.9L266.9 7.918C278.2-1.92 294.7-2.669 306.8 6.114C318.9 14.9 323.3 30.87 317.4 44.61L240.5 224z"/></svg>
        </div>
      </div>
      <div class="stats">
        <div class="price">{{nft_price}} ETH</div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'CardItem',
  props:{
    nft_owner:String,
    nft_id:Number,
    nft_price:Number,
    nft_type:String,
    nft_bg_color:String,
    homepage:String,
    image:String,
    nft_potential:Number,
  },
  computed: {
    style () {
     return `background-color: #${this.nft_bg_color};`;
    }
  },
  methods: {
    RedirectToEirbmonPage(){
      if(this.homepage==="False"){
        this.$router.push(`/eirbmon/${this.nft_id}`);
      }
    }
  }
}
</script>

<style scoped>
/* Pour l'url de l'image regarder le parsing du webpath https://cli.vuejs.org/guide/html-and-static-assets.html#url-transform-rules*/
/*https://codepen.io/lyon-etyo/pen/OJmyMGd*/
.container{
  background: #ECE9E6;
  width: 300px;
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 50px;
  box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.1);
  background-size: cover;
  transition: box-shadow .15s ease-in-out;
}

.container:hover{
  cursor: pointer;
  box-shadow: 0 .5rem 2rem rgba(0, 0, 0, 0.3);
}

.image{
  padding: 15px;
}

.description{
  display: flex;
  flex-direction: column;
  gap: .5rem;
  background: rgba(238, 238, 238, 0.7);
  border-radius: 35px;
  margin-bottom: 15px;
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
  text-transform: uppercase;
}

.type svg{
  width: 10px;
}

.Info {
  background: #16A116;
}
.Telecom {
  background: #fbc235;
}
.Elec {
  background: #198DBC;
}
.Matmeca{
  background: #E74737;
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