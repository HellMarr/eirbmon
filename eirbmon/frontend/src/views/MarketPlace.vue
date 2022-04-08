<template>
<div class="marketplace-container">
    <div class="menu">
        MENU
    </div>
    <div class="market">
        <ul>

            <li v-for="nft in nft_list" :key="nft">
                <CardItem :nft_id=nft.nft_id :nft_price=nft.nft_price :nft_type=nft.nft_type :nft_bg_color=nft.nft_bg_color></CardItem>
            </li>

        </ul>
    </div>
</div>
</template>

<script>
import CardItem from '../components/CardItem.vue';
import axios from 'axios';

export default {
    name: "MarketPlace",
    components: { CardItem },

    data:function(){
        return{
            nft_list:[
                {nft_id:"#000AAA",nft_price:"0.001",nft_type:"elec",nft_bg_color:"rgb(218,247,166)",},
                {nft_id:"#001BZ1",nft_price:"9999",nft_type:"elec",nft_bg_color:"#FFF89A"},
                {nft_id:"#000AAA",nft_price:"0.001",nft_type:"elec",nft_bg_color:"#FFB2A6"},
                {nft_id:"#000AAA",nft_price:"1089",nft_type:"elec",nft_bg_color:"#FF8AAE"},
                {nft_id:"#000AAA",nft_price:"0.001",nft_type:"elec",nft_bg_color:"#FCF4DD"},
                {nft_id:"#000AAA",nft_price:"0.001",nft_type:"elec",nft_bg_color:"#DDEDEA"},
                {nft_id:"#000AAA",nft_price:"0.001",nft_type:"elec",nft_bg_color:"#9ADCFF"},
                {nft_id:"#0011BZ",nft_price:"9999",nft_type:"elec",nft_bg_color:"#FFF89A"},
                {nft_id:"#000AAA",nft_price:"0.001",nft_type:"elec",nft_bg_color:"#FFB2A6",},
                {nft_id:"#000AAA",nft_price:"1089",nft_type:"elec",nft_bg_color:"#FF8AAE"},
                {nft_id:"#000AAA",nft_price:"0.001",nft_type:"elec",nft_bg_color:"#DDEDEA"},
                {nft_id:"#000AAA",nft_price:"0.001",nft_type:"elec",nft_bg_color:"#FCF4DD"},
            ],
        }
    },
    methods: {
        getMarketplace: function() {

        axios.post("/api/marketplace").then((res) => {
            if(res.data.msg === "Validation Failed"){
            //let errors = res.data.errors;
            let errorMsg = "";
            alert(errorMsg);
            }
        }).catch(()=>{
            alert("Something Went Wrong");
        })
        }
  }
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
