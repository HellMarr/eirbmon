<template>
    
<div class="marketplace-container">
    <div class="menu">
        MENU
    </div>
    <div class="market">
        <ul>
            <li><CardItem name="Eirbee" id="#000AAA" price="0.001" :types="['elec']" color="#9ADCFF"></CardItem></li>
            <li><CardItem name="Eirbee" id="#001BZ1" price="9999" :types="['info']" color="#FFF89A"></CardItem></li>
            <li><CardItem name="Eirbee" id="#000AAA" price="0.001" :types="['telecom']" color="#FFB2A6"></CardItem></li>
            <li><CardItem name="Eirbee" id="#000AAA" price="1089" :types="['matmeca']" color="#FF8AAE"></CardItem></li>
            <li><CardItem name="Eirbee" id="#000AAA" price="0.001" :types="['matmeca']" color="#FCF4DD"></CardItem></li>
            <li><CardItem name="Eirbee" id="#000AAA" price="0.001" :types="['matmeca']" color="#DDEDEA"></CardItem></li>
            <li><CardItem name="Eirbee" id="#000AAA" price="0.001" :types="['matmeca']" color="#9ADCFF"></CardItem></li>
            <li><CardItem name="Eirbee" id="#0011BZ" price="9999" :types="['telecom','info']" color="#FFF89A"></CardItem></li>
            <li><CardItem name="Eirbee" id="#000AAA" price="0.001" :types="['elec','telecom','matmeca']" color="#FFB2A6"></CardItem></li>
            <li><CardItem name="Eirbee" id="#000AAA" price="1089" :types="['matmeca']" color="#FF8AAE"></CardItem></li>
            <li><CardItem name="Eirbee" id="#000AAA" price="0.001" :types="['matmeca']" color="#DDEDEA"></CardItem></li>
            <li><CardItem name="Eirbee" id="#000AAA" price="0.001" :types="['matmeca']" color="#FCF4DD"></CardItem></li>
        </ul>
    </div>
</div>
</template>

<script>
import CardItem from '../components/CardItem.vue'

export default {
    name: "MarketPlace",
    components: { CardItem }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.marketplace-container{
    padding: 0 5%;
}
.menu{
    height:50px;
    background-color:lightgrey;
    margin-bottom:20px;
    border-radius: 10px;
    position: relative;
}

.market ul{
    display: flex;
    flex-wrap: wrap;
}

.market ul li {
    list-style: none;
    flex: 1;
    align-items: center;
    padding-bottom: 20px;
}

@media(max-width:750px){
    .card-container{
        width: 250px;
    }
}

</style>
