<template>
<body>
    <div class="carousel-container">
        <div class="gap"></div>
        <input type="radio" name="slider" id="item-1" checked>
        <input type="radio" name="slider" id="item-2">
        <input type="radio" name="slider" id="item-3">
        <div class="cards">
            <label class="card" for="item-1" id="song-1">
                <CardItem homepage="True" nft_id="1" nft_price="0.001" nft_type="elec" nft_bg_color="rgb(218,247,166)"></CardItem>
            </label>
            <label class="card" for="item-2" id="song-2">
                <CardItem homepage="True" nft_id="2" nft_price="0.001" nft_type="elec" nft_bg_color="rgb(218,247,166)"></CardItem>
            </label>
            <label class="card" for="item-3" id="song-3">
                <CardItem homepage="True" nft_id="3" nft_price="0.001" nft_type="elec" nft_bg_color="rgb(218,247,166)"></CardItem>
            </label>
        </div>

        <div class="infos">
            <div class="upper-part">
                <div class="info-area" id="title">
                    <label class="eirbmon-info" id="eirbmon-info-1">
                        <div class="title">Eirbee#1</div>
                    </label>
                    <label class="eirbmon-info" id="eirbmon-info-1">
                        <div class="title">Eirbee#2</div>
                    </label>
                    <label class="eirbmon-info" id="eirbmon-info-1">
                        <div class="title">Eirbee#3</div>
                    </label>
                </div>
            </div>
            <div class="lower-part">
                <div class="info-area" id="test">
                    <label class="eirbmon-info" id="eirbmon-info-1">
                        <div class="subtitle">Buy or capture, then fight with your Eirbees!</div>
                    </label>
                </div>
            </div>
        </div>
    </div>


    <div class="image-container">
        <div class="image"></div>
    </div>
    
    <div class="video-container">
        <img width="560" height="315" class="video" src="../assets/Ingame_fight.png">
        <img width="560" height="315" class="video" src="../assets/Ingame.png">
        <div class="video-text">
            <div class="title">Eirbmon's game</div>
            <div class="subtitle">Collect bees from all the main sectors of Enseirb, exchange them with others, fight them, and increase their value! Become the most accomplished trainer in Enseirb!</div>
        </div>
    </div>

</body>
</template>

<script>
import CardItem from '../components/CardItem.vue'

export default {
    name: "HomePage",
    components: { CardItem }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* Code du carousel */

input[type=radio] {
    display: none;
}

.gap{
    margin:200px 0;
}

.carousel-container {
    height: 60%;
    transform-style: preserve-3d;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    margin-bottom:150px;
}

.card {
    position: absolute;
    width: 40%;
    height: 100%;
    top:-150px;
    left: 0;
    right: 0;
    margin: auto;
    transition: transform .4s ease;
    cursor: pointer;
}

.cards {
    position: relative;
    width: 100%;
    height: 100%;
}

img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
}

#item-1:checked ~ .cards #song-3, #item-2:checked ~ .cards #song-1, #item-3:checked ~ .cards #song-2 {
    transform: translatex(-40%) scale(.8);
    opacity: .4;
    z-index: 0;
}

#item-1:checked ~ .cards #song-2, #item-2:checked ~ .cards #song-3, #item-3:checked ~ .cards #song-1 {
    transform: translatex(40%) scale(.8);
    opacity: .4;
    z-index: 0;
}

#item-1:checked ~ .cards #song-1, #item-2:checked ~ .cards #song-2, #item-3:checked ~ .cards #song-3 {
    transform: translatex(0) scale(1);
    opacity: 1;
    z-index: 1;
}


.infos {
    border-radius: 8px;
    min-width: 200px;
    max-width: 400px;
    padding: 1%;
    margin:auto;
    align-items: center;
    justify-content: center;
    border-width: 1px;
    position: relative;
    right:15%
}

.upper-part {
    position: relative;
    display: flex;
    height: 60px;
    overflow: hidden;
}

.info-area {
    width: 100%;
    transition: transform .3s ease-out;
}

.eirbmon-info {
    display: block;
}

.eirbmon-info .title{
    color: #403d40;
    font-size: 40px;
    line-height: 60px;
}

.lower-part {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
}

.eirbmon-info .subtitle{
    font-size: 20px;
    line-height: 20px;
    color: #c6c5c6;
}

#item-2:checked ~ .infos #title {
    transform: translateY(0);
}

#item-2:checked ~ .infos #title  {
    transform: translateY(-60px);
}

#item-3:checked ~ .infos #title  {
    transform: translateY(-120px);
}

/* Background infini */

.image-container {
    overflow: hidden;
}

.image {
    z-index: -1;
    background: url(../assets/background2.png) repeat;
    height: 600px;
    width: 100%;
    opacity: 0.4;
    position: absolute;
}

/* Video container */

.video-container{
    height: 600px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 10px;
}

.video{
    border-radius: 15px;
    width: 450px;
    height: auto;
}

.video-text{
    padding:25px;
    max-width: 400px;
    background: linear-gradient(#FFBF49 0%, #FD992D 100%);
    border-radius: 15px;
}

.video-text .title {
    color: white;
    font-size: 40px;
    line-height: 60px;
}

.video-text .subtitle {
    font-size: 20px;
    line-height: 20px;
    color: white;
}

/* Footer */
footer{
    display: flex;
    align-items: center;
    justify-content: center;
}

#logo{
    height: 100%;
}
</style>