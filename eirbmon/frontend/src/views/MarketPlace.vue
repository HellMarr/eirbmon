<template>
<div class="marketplace-container">
    <div class="menu">
        <div class="form" id="type_form">
            <div class="title">Type</div>
            <span>
                <input type="radio" id="all" value="null" v-model="type_form">
                <label for="all">All</label>
            </span>
            <span>
                <input type="radio" id="Telecom" value="Telecom" v-model="type_form">
                <label for="Telecom">Telecom</label>
            </span>
            <span>
                <input type="radio" id="Matmeca" value="Matmeca" v-model="type_form">
                <label for="Matmeca">Matmeca</label>
            </span>
            <span>
                <input type="radio" id="Elec" value="Elec" v-model="type_form">
                <label for="Elec">Elec</label>  
            </span>
            <span>
                <input type="radio" id="Info" value="Info" v-model="type_form">
                <label for="Info">Info</label>
            </span>
        </div>
        <div class="form" id="pricesort_form">
            <div class="title">Price sorting</div>
            <span>
                <input type="radio" id="ascending" value="ascending" v-model="pricesort_form">
                <label for="ascending">Ascending</label>
            </span>
            <span>
                <input type="radio" id="descending" value="descending" v-model="pricesort_form">
                <label for="descending">Descending</label>
            </span>
        </div>
        <div class="form" id="pricemaxmin_form">
            <div class="title">Price range</div>
            <div class="subform-range">
                <input type="number" v-model.number="pricemin_form"/>
                <input type="number" v-model.number="pricemax_form"/>
            </div>
        </div>
        <div class="form" id="potentialsort_form">
            <div class="title">Potential Sorting</div>
            <span>
                <input type="radio" id="ascending" value="ascending" v-model="potentialsort_form">
                <label for="ascending">Ascending</label>
            </span>
            <span>
                <input type="radio" id="descending" value="descending" v-model="potentialsort_form">
                <label for="descending">Descending</label>
            </span>
        </div>
        <div class="form" id="potentialmaxmin_form">
            <div class="title">Potential range</div>
            <div class="subform-range">
                <input type="number" v-model.number="potentialmin_form"/>
                <input type="number" v-model.number="potentialmax_form"/>
            </div>
        </div>
        <button @click="getMarketplace">Go</button>
    </div>
    <div>{{route}}</div>

    <div class="market">
        <ul>
            <li v-for="nft in nft_list" :key="nft">
                <CardItem homepage="False" :nft_id=nft.nft_id :nft_price=nft.nft_price :nft_type=nft.nft_type :nft_bg_color=nft.nft_bg_color :image=nft.nft_image :nft_potential=nft.nft_potential></CardItem>
            </li>
        </ul>
    </div>
    <div v-if="(nft_list_length%60!=0)||(nft_list_length==0)" class="no-more-pages">No more Eirbee are matching your criteria</div>
    <button v-else @click="getMorePages" id="more-pages">Get more Eirbees</button>
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
            type_form:null,
            pricesort_form:"ascending",
            potentialsort_form:"descending",
            pricemin_form:0,
            pricemax_form:100,
            potentialmin_form:0,
            potentialmax_form:200,
            route:null,
            page:1,
            nft_list_length:1,
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
        },
        getMarketplace(){
            let route="/api/marketplace/?type="+this.type_form+"&price="+this.pricesort_form+"&potential="+this.potentialsort_form+"&minprice="+this.pricemin_form+"&maxprice="+this.pricemax_form+"&minpotential="+this.potentialmin_form+"&maxpotential="+this.potentialmax_form
            this.route=route;
            axios.get(route).then((res) => {
                if(res.data.msg === "Validation Failed"){
                    //let errors = res.data.errors;
                    let errorMsg = "";
                    alert(errorMsg);
                }
                else{
                    this.nft_list=res.data;
                    console.log(res);
                    this.nft_list_length=this.nft_list.length;
                }
                }).catch(()=>{
                    alert("Something Went Wrong");
            })
        },
        getMorePages(){
            this.page+=1;
            let route="/api/marketplace/?type="+this.type_form+"&price="+this.pricesort_form+"&potential="+this.potentialsort_form+"&minprice="+this.pricemin_form+"&maxprice="+this.pricemax_form+"&minpotential="+this.potentialmin_form+"&maxpotential="+this.potentialmax_form+"&page="+this.page
            this.route=route;
            axios.get(route).then((res) => {
                if(res.data.msg === "Validation Failed"){
                    //let errors = res.data.errors;
                    let errorMsg = "";
                    alert(errorMsg);
                }
                else{
                    this.nft_list=this.nft_list.concat(res.data);
                    console.log(res);
                    this.nft_list_length=this.nft_list.length;
                }
                }).catch(()=>{
                    alert("Something Went Wrong");
            })
        }
    },
    mounted(){
        axios.get("/api/marketplace/?type=null&price=ascending&potential=descending&minprice=0&maxprice=1000&minpotential=0&maxpotential=200").then((res) => {
            if(res.data.msg === "Validation Failed"){
                //let errors = res.data.errors;
                let errorMsg = "";
                alert(errorMsg);
            }
            else{
                this.nft_list=res.data;
                console.log(res);
                this.nft_list_length=this.nft_list.length;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.menu{
    background-color:#eee;
    box-shadow: 3px 3px 6px 5px #ccc;
    margin-bottom:20px;
    border-radius: 10px;
    padding:10px;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-content: center;
    flex-wrap: wrap;
    width:100%;
}

.form{
    display: flex;
    flex-direction: column;
    padding:5px 10px;
    border: 2px rgb(160, 160, 160) solid;
    border-radius: 10px;
}

.title{
    font-size: 50;
    font-weight: bold;
    justify-self: center;
}

input[type=number]{
    border:1px solid black;
    border-radius: 10px;
    width:80px;
    padding:2px 7px 2px 4px;
    margin:1px 5px;
}

span{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap:2px;
}

button{
    cursor: pointer;
    border: 2px rgb(160, 160, 160) solid;
    border-radius: 10px;
    padding:5px 10px;
    font-size: 30px;
}
button:hover{
    background-color: #ddd;
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

.no-more-pages{
    margin:50px;
    font-size: 40px;
}

#more-pages{
    width: 50%;
    margin:20px 0;
}

@media(max-width:750px){
    .menu{
        flex-direction: column;
        gap:10px;
    }
    .form{
        width:100%;
    }
    .card-container{
        width: 250px;
    }

    .no-more-pages{
        font-size: 25px;
    }
}
</style>