<template>
    
<div class="grid-container">
    <div class="menu">
        MENU
    </div>
    <div class="market">
        <ul>
            <li><div class="card-container"><CardItem name="Salamèche" id="#000AAA" price="0.001" :types="['electrik','ghost','fight','flight']" color="#9ADCFF"></CardItem></div></li>
            <li><div class="card-container"><CardItem name="Salamèche" id="#001BZ1" price="9999" :types="['fire','water']" color="#FFF89A"></CardItem></div></li>
            <li><div class="card-container"><CardItem name="Salamèche" id="#000AAA" price="0.001" :types="['plant','ground','water']" color="#FFB2A6"></CardItem></div></li>
            <li><div class="card-container"><CardItem name="Salamèche" id="#000AAA" price="1089" :types="['ground','fire','water']" color="#FF8AAE"></CardItem></div></li>
            <li><div class="card-container"><CardItem name="Salamèche" id="#000AAA" price="0.001" :types="['ground','fire','water']" color="#FCF4DD"></CardItem></div></li>
            <li><div class="card-container"><CardItem name="Salamèche" id="#000AAA" price="0.001" :types="['ground','fire','water']" color="#DDEDEA"></CardItem></div></li>
            <li><div class="card-container"><CardItem name="Salamèche" id="#000AAA" price="0.001" :types="['ground','fire','water']" color="#9ADCFF"></CardItem></div></li>
            <li><div class="card-container"><CardItem name="Salamèche" id="#0011BZ" price="9999" :types="['fire','water']" color="#FFF89A"></CardItem></div></li>
            <li><div class="card-container"><CardItem name="Salamèche" id="#000AAA" price="0.001" :types="['plant','ground','water']" color="#FFB2A6"></CardItem></div></li>
            <li><div class="card-container"><CardItem name="Salamèche" id="#000AAA" price="1089" :types="['ground','fire','water']" color="#FF8AAE"></CardItem></div></li>
            <li><div class="card-container"><CardItem name="Salamèche" id="#000AAA" price="0.001" :types="['ground','fire','water']" color="#DDEDEA"></CardItem></div></li>
            <li><div class="card-container"><CardItem name="Salamèche" id="#000AAA" price="0.001" :types="['ground','fire','water']" color="#FCF4DD"></CardItem></div></li>
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

.menu{
    height:50px;
    background-color:grey;
    margin-bottom:20px;
    border-radius: 10px;
}
.card-container{
    max-width: 400px;
    min-width: 300px;
    max-height: 800px;
}

.market ul{
    display: flex;
    flex-wrap: wrap;
}

.market ul li {
    list-style: none;
    flex: 1;
    padding-bottom: 20px;
    padding-right: 20px;
    align-items: center;
}

@media(max-width:750px){
    .card-container{
        width: 250px;
    }
}

</style>
