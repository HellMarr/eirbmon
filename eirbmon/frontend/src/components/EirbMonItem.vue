<template>
  <div class="grid">
    <img class="image" src="../assets/abeille_sortie_accessories3.svg">
    <div class="description">
      <div class="infos">
        <div class="id">Eirbee#{{nft_id}}</div>
        <div class="price">{{nft_price}} ETH</div>
      </div>
      <div class="properties">
        <div class="types">Type <div class="type" :class="nft_type">{{nft_type}}</div></div>
        <div class="types">Wings <div class="type">{{nft_wings_color}}</div></div>
        <div class="types">Antenna <div class="type">{{nft_antenna_color}}</div></div>
        <div class="types">Background <div class="type" :style="background">{{nft_bg_color}}</div></div>
        <div class="types">Object <div class="type">{{nft_type}}</div></div>

      </div>
      <div class="potential">
        <div class="price">Potential {{nft_potential}}</div>
        <GaussianCurve :left="nft_potential"/>
      </div>
    </div>
  </div>
</template>


<script>
import GaussianCurve from './GaussianCurve.vue'

export default {
    name: "EirbMonItem",
    props: {
      nft_id:Number,
      nft_price:Number,
      nft_type:String,
      nft_bg_color:String,
      nft_potential:Number,
      nft_antenna_color:String,
      nft_wings_color:String,
    },
    computed: {
      wings () {
        return `background-color: ${this.nft_wings_color};`;
      },
      antenna () {
        return `background-color: ${this.nft_antenna_color};`;
      },
      background () {
        return `background-color: ${this.nft_bg_color};`;
      }
    },
    components:{
    GaussianCurve
}
}
</script>

<style scoped>
.grid {
  margin-left: 10%;
  width:80%;
  display: grid;
  grid-template-columns: 0.7fr 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 10px;
  border-radius: 2%;
}

.image{
  grid-area: 1 / 1 / 2 / 2;
  width:100%;
  border-radius:20px;
  background-size: cover;
  margin:auto;
}

.description{
  width:100%;
  height:100%;
  border-radius: 20px;
  background-size: cover;
  background: rgba(238, 238, 238, 0.7);
  grid-area: 1 / 2 / 2 / 3;
  font-family: 'Fredoka', sans-serif;
  margin:auto;
  padding-right: 5%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 0.5fr 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.infos{
  grid-area: 1 / 1 / 2 / 3;
  display:flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.id{
  font-size: 50px;
}
.price{
  font-size:30px;
}
.price, .id{
  font-family: 'Fredoka', sans-serif;
}

.properties{
  grid-area: 2 / 1 / 3 / 2;
  padding-left: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.potential{
  grid-area: 2 / 2 / 3 / 3;
    display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.types{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  font-family: 'Fredoka', sans-serif;
  font-size:20px;
  margin:2px;
}

.type {
  align-self: flex-start;
  padding: .25em .75em;
  border-radius: 1em;
  background: #a8a878;
  color: #fafafa;
  text-transform: capitalize;
  font-family: 'Fredoka', sans-serif;
  font-size:20px;
  margin-left: 10px;
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
</style>