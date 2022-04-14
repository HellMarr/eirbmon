<template>
<head>


</head>
  <div class="container" :style="style">
    <img class="image" :src="nft_image_path">
    <div class="description">
      <div class="upper-div">
        <div class="name">#{{nft_id}}</div> 
      </div>
      <div class="types">
        <div class="type" :class="nft_type">
          {{nft_type}}
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
    nft_id:Number,
    nft_price:Number,
    nft_type:String,
    nft_bg_color:String,
  },
  computed: {
    style () {
     return `background-color: ${this.nft_bg_color};`;
    },
    nft_image_path(){
      return `../assets/000${this.nft_id}.svg;`
    }
  },
  // beforeCreate: {
  //   img: function () {
  //     document.getElementByClass('image').src = document.getElementByClass('image').src + this.nft_id + ".svg";
  //   }
  // }
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
  text-transform: capitalize;
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

.stats{
  font-family: 'Lato', sans-serif;
  color:rgb(65, 51, 51);
  text-transform: uppercase;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

</style>