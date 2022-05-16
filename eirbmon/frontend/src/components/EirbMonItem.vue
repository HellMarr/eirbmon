<template>
  <div class="grid">
    <img class="image" :src="nft_image">
    <div class="description">
      <div class="head">
        <div class="infos">
          <div class="id">Eirbee#{{nft_id}}</div>
          <div v-if="nft_forsale" class="price">{{nft_price}} ETH</div>
        </div>
        <div v-if="nft_forsale" class="sale">
          <button class="buyBtn" @click="buy(nft_owner, nft_id, nft_price)"> Buy </button>
        </div>
        <div v-else-if="nft_owner===this.user_addr">
          <div class="sell">
              <input v-model="price" placeholder="Price" type="number">
              <button @click="sellNft(nft.nft_id,price,this.addr)">Sell</button>
          </div>
        </div>
      </div>
      <div class="properties">
        <div class="title">Properties</div>
        <div class="types">Type <div class="type" :class="nft_type">{{nft_type}}</div></div>
        <div class="types">Wings <div class="type" :style="wings">#{{nft_wings_color}}</div></div>
        <div class="types">Antenna <div class="type" :style="antenna">#{{nft_antenna_color}}</div></div>
        <div class="types">Background <div class="type" :style="background">#{{nft_bg_color}}</div></div>
        <div v-if="nft_accessories" class="types">
          <div v-if="!nft_accessories.length"> No items</div>
          <div v-else>Items</div>
          <div class="type" :class="nft_type" v-for="object in nft_accessories" :key="object">{{object}}</div>
        </div>
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

// blockchain
import {buyNftInMarket, fetchMarketItems} from '../script/blockchain.js'
import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from "web3/dist/web3.min.js";
import axios from 'axios';

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
      nft_image:String,
      nft_forsale:Boolean,
      nft_owner:String,
      nft_accessories:Array,
    },
    computed: {
      wings () {
        return `background-color: #${this.nft_wings_color};`;
      },
      antenna () {
        return `background-color: #${this.nft_antenna_color};`;
      },
      background () {
        return `background-color: #${this.nft_bg_color};`;
      }
    },
    methods: {
      async getItemId(marketplaceContract, nft_id, addr) {
        const items = await fetchMarketItems(marketplaceContract, addr);
        let itemId;
        items.forEach(element => {
          if (element["tokenId"] === nft_id.toString()) {
            itemId = element["itemId"]
          }
        })
        return itemId
      },
      sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
      },
      async buy (nft_owner, nft_id, nft_price) {
        console.log(nft_owner+" "+nft_id+" "+nft_price)
        // console.log("addr ",this.user_addr)
         const provider = await detectEthereumProvider();
            if (provider) {
                const web3 = new Web3(provider);
                const contract = require("../../../blockchain/build/contracts/NFTMarketplace")
                const CONTRACT_ADDRESS_MARKETPLACE = "0x1568aA48477086083237153BbD6Faf38A1697182"
                const marketplaceContract = new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS_MARKETPLACE);
                // const addr = await provider.request({method: 'eth_requestAccounts'})
                const itemId = await this.getItemId(marketplaceContract, nft_id, this.user_addr)
                try{
                  let transactionReceipt = null
                  const transactionHash = await buyNftInMarket(provider, marketplaceContract, this.user_addr, nft_owner, itemId, nft_price.toString(16))
                  while (transactionReceipt == null) { // Waiting expectedBlockTime until the transaction is mined
                      transactionReceipt = await web3.eth.getTransactionReceipt(transactionHash);
                      console.log("waiting")
                      await this.sleep(1000)
                  }
                  if(transactionReceipt.status === false){
                    throw "transaction reverted"
                  }
                  axios.post("/api/marketplace/buy", {user_wallet:this.user_addr, token_id:nft_id}).then((res) => {
                    console.log("after buy: ",res.data)
                    }).catch((err) => {
                      alert(err)
                  })
                  
                }catch(err) {
                  console.log(err)
                }

            } else {
                console.log("please install metamask")
            }
      }
    },
    components:{
      GaussianCurve
    },
    data(){
      return {
        user_addr:undefined
      };
    },
    async mounted(){
      const provider = await detectEthereumProvider();
      const addr = await provider.request({method: 'eth_requestAccounts'})
      this.user_addr = addr[0]
    }
}
</script>

<style scoped>
.grid {
  margin-left: 2.5%;
  width:95%;
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
  border: 4px rgb(142, 142, 142) solid;
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
  border: 4px rgb(142, 142, 142) solid;
}

.head{
  grid-area: 1 / 1 / 2 / 3;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.infos{
  display:flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
}
.id{
  font-size: 50px;
}
.price, .owner{
  font-size:25px;
}
.price, .id{
  font-family: 'Fredoka', sans-serif;
}

.sale{
  color:'red';
  font-size:40px;
  font-weight: bold;
  color:'red';
}

.sell{
  display: flex;
  flex-direction: row;
  justify-content: center;
}

input{
  font-size:20px;
  width: 100px;
  font-weight: bold;
  background: #FFF;
  padding: 0 10px;
  border: 2px solid rgb(104, 104, 104);
  border-radius: 10px 0 0 10px;
}

button {
  font-size:30px;
  font-weight: bold;
  background: #FFBF49;
  padding: 0 10px;
  border: 2px solid rgb(104, 104, 104);
  border-radius: 0 10px 10px 0;
}

button:hover{
  cursor: pointer;
}

.buyBtn{
  border-radius: 10px;
}

.properties{
  grid-area: 2 / 1 / 3 / 2;
  padding-left: 5%;
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

.potential svg{
  width: 30px;
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

.title{
  font-size: 30px;
  position: relative;
  top:0%;
  text-decoration: underline;
  padding-bottom: 10px;
}

.type {
  align-self: flex-start;
  padding: .2em .75em;
  border-radius: 1em;
  background: #a8a878;
  color: #000;
  text-transform: uppercase;
  font-family: 'Fredoka', sans-serif;
  font-size:18px;
  margin-left: 8px;
  border: 1px solid #AAA;
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


  @media (max-width: 850px) {
    .grid {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 5%;
    }

    .image{
      grid-area: 1 / 1 / 2 / 2;
      width:100%;
      border-radius:20px;
      background-size: cover;
      margin-bottom:15px;
    }

    .description{
      padding: 5%;
      gap:20px;
      display: flex;
      flex-direction: column;
    }

    .properties{
      padding-left: 5%;
    }

    .head{
      flex-direction: column;
    }
    
  }

</style>