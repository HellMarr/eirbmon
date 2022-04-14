<template>
<div class="marketplace-container">
    <div class="menu">
        MENU
        <button @click="getMarketItems"> check items in market place (see console / test)</button>
    </div>
    <div class="market">
        <ul>

            <li v-for="nft in nft_list" :key="nft">
                <CardItem homepage="False" :nft_id=nft.nft_id :nft_price=nft.nft_price :nft_type=nft.nft_type :nft_bg_color=nft.nft_bg_color></CardItem>
            </li>

        </ul>
    </div>
</div>
</template>

<script>
import CardItem from '../components/CardItem.vue';
import axios from 'axios';

// blockchain
import {fetchMarketItems} from '../script/blockchain.js'
import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from "web3/dist/web3.min.js";


export default {
    name: "MarketPlace",
    components: { CardItem },

    data:function(){
        return{
            nft_list:[],
        }
    },
    methods: {
        // récupère tableau des nfts dans le martketplace
        getMarketItems: async () => {
            const provider = await detectEthereumProvider();
            if (provider) {
                const web3 = new Web3(provider);
                const contract = require("../../../blockchain/build/contracts/NFTMarketplace")
                const CONTRACT_ADDRESS_MARKETPLACE = "0x0aD920cDD7547622ed470086FA787A75b2D7EefE"
                const marketplaceContract = new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS_MARKETPLACE);
                const addr = await provider.request({method: 'eth_requestAccounts'})
                const items = await fetchMarketItems(marketplaceContract, addr[0]);
                console.log(items)

            } else {
                console.log("please install metamask")
            }
        }
    },
    mounted(){
        axios.get("/api/marketplace").then((res) => {
            if(res.data.msg === "Validation Failed"){
                //let errors = res.data.errors;
                let errorMsg = "";
                alert(errorMsg);
            }
            else{
                this.nft_list=res.data.nft_list;
                console.log(res)
            }
        }).catch(()=>{
            alert("Something Went Wrong");
        })
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