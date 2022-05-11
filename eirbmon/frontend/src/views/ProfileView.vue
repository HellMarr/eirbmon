<template>
    <div class="container">
        <div class="profile-description">
            Profile
            <div>Your metamask address is {{ addr }}</div>
        </div>
        <div class="market">
            <ul>
                <li v-for="nft in nft_list" :key="nft">
                    <CardItemProfile :nft_image=nft.nft_image :nft_id=nft.nft_id :nft_price=nft.nft_price :nft_type=nft.nft_type :nft_bg_color=nft.nft_bg_color></CardItemProfile>
                    <div class="sell">
                        <input v-model="price" placeholder="price">
                        <button @click="sellNft(nft.nft_id,price,this.addr)">sell</button>
                    </div>
                        
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import detectEthereumProvider from '@metamask/detect-provider';
    import CardItemProfile from '../components/CardItemProfile.vue';
    import axios from 'axios';
    import {addNftInMarket} from '../script/blockchain.js';
    import Web3 from "web3/dist/web3.min.js";
    const _contract = require("../../../blockchain/build/contracts/NFTMarketplace");

    const getAddr = async (provider) => {
        const addr = await provider.request({method: 'eth_requestAccounts'});
        return addr[0];

    }

    const getContract = async (provider, contract, CONTRACT_ADDRESS_MARKETPLACE) => {
        const web3 = new Web3(provider);
        return new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS_MARKETPLACE)
    }


    export default {
        name: "ProfileView",
        components: { CardItemProfile },
        data() {
            return {
                addr: undefined,
                nft_list:[],
                provider: undefined,
                marketplaceContract: undefined,
                CONTRACT_ADDRESS_MARKETPLACE: "0x94b62dB15F4b5349AD748B66a2ed341d2314eE37",
                conctract: undefined
            }
        },
        async mounted() {
            const _provider = await detectEthereumProvider();
            this.addr = await getAddr(_provider)
            this.provider = _provider;
            this.contract = _contract;
            this.marketplaceContract = await getContract(this.provider, this.contract, this.CONTRACT_ADDRESS_MARKETPLACE)

            axios.post("/api/profile", {user_wallet:this.addr}).then((res) => {
                console.log(res.data)
                this.nft_list=res.data;
            }).catch(()=>{
                alert("Something Went Wrong")
            })
        },
        methods: {
            sellNft: async function (_tokenId, _price, _from) {
                try {
                    await addNftInMarket(this.provider, this.marketplaceContract, _tokenId, _price, _from)
                } catch (err) {
                   console.log("err")
                }
                
            }

        }
}
</script>

<style scoped>

.profile-description {
    height: 80%;
    width: 40%;
    border-radius: 20px;
    background-size: cover;
    background: rgba(238, 238, 238, 0.7);
    /* align-items: center;
    justify-content: center; */

}

.container{
    padding: 0 5%;
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

.sell {
    justify-content: center;
    padding-left: 25%;
}

</style>