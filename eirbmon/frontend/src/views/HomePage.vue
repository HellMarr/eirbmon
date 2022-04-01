<template>
<body>
    <div class="carousel-container">
        <div class="gap"></div>
        <input type="radio" name="slider" id="item-1" checked>
        <input type="radio" name="slider" id="item-2">
        <input type="radio" name="slider" id="item-3">
        <div class="cards">
            <label class="card" for="item-1" id="song-1">
                <CardItem name="Salamèche" id="#000AAA" price="0.001" :types="['telecom']" color="lightgrey"></CardItem>
            </label>
            <label class="card" for="item-2" id="song-2">
                <CardItem name="Salamèche" id="#000AAA" price="0.001" :types="['matmeca']" color="lightgrey"></CardItem>
            </label>
            <label class="card" for="item-3" id="song-3">
                <CardItem name="Salamèche" id="#000AAA" price="0.001" :types="['elec']" color="lightgrey"></CardItem>
            </label>
        </div>

        <div class="infos">
            <div class="upper-part">
                <div class="info-area" id="title">
                    <label class="eirbmon-info" id="eirbmon-info-1">
                        <div class="title">EirbMon 1</div>
                    </label>
                    <label class="eirbmon-info" id="eirbmon-info-1">
                        <div class="title">EirbMon 2</div>
                    </label>
                    <label class="eirbmon-info" id="eirbmon-info-1">
                        <div class="title">EirbMon 3</div>
                    </label>
                </div>
            </div>
            <div class="lower-part">
                <div class="info-area" id="test">
                    <label class="eirbmon-info" id="eirbmon-info-1">
                        <div class="subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce posuere, tortor nec ultricies dapibus, massa diam tempus lectus, sed iaculis libero neque eget ex. Integer ante mauris, imperdiet ac diam in, tempus cursus nibh. Nullam auctor tempor dui ac commodo. Nullam quis erat ipsum. Quisque lacinia nisl non mi efficitur, quis tempor tortor vestibulum. Aliquam in vehicula ex. Mauris non dui purus. Suspendisse dignissim semper aliquet.</div>
                    </label>
                </div>
            </div>
        </div>
    </div>


    <div class="image-container">
        <div class="image"></div>
    </div>
    
    <div class="video-container">
        <iframe class="video" width="560" height="315" src="https://www.youtube.com/embed/zPpmYJ8CKVg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <div class="video-text">
            <div class="title">Présentation du jeu</div>
            <div class="subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce posuere, tortor nec ultricies dapibus, massa diam tempus lectus, sed iaculis libero neque eget ex. Integer ante mauris, imperdiet ac diam in, tempus cursus nibh. Nullam auctor tempor dui ac commodo. Nullam quis erat ipsum. Quisque lacinia nisl non mi efficitur, quis tempor tortor vestibulum. Aliquam in vehicula ex. Mauris non dui purus. Suspendisse dignissim semper aliquet.</div>
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
    justify-content: center;
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
}

.video-text{
    padding:25px;
    max-width: 400px;
    background-color: red;
    border: 1px solid #ddd;
    border-radius: 15px;
}

.video-text .title {
    color: #403d40;
    font-size: 40px;
    line-height: 60px;
}

.video-text .subtitle {
    font-size: 20px;
    line-height: 20px;
    color: #c6c5c6;
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