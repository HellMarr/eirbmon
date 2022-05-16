<template>
    <div class="container">
        <div class="profile-description">
            <div class="title">Inventory</div>
            <div>Your metamask address is {{ addr }}</div>
        </div>
        <div class="market">
            <ul>
                <li v-for="nft in nft_list" :key="nft">
                    <CardItem page="profile" :nft_owner=nft.nft_owner :nft_id=nft.nft_id :nft_price=nft.nft_price :nft_type=nft.nft_type :nft_bg_color=nft.nft_bg_color :image=nft.nft_image :nft_potential=nft.nft_potential></CardItem>                      
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import detectEthereumProvider from '@metamask/detect-provider';
    import axios from 'axios';
    import {addNftInMarket} from '../script/blockchain.js';
    import Web3 from "web3/dist/web3.min.js";
    import CardItem from '@/components/CardItem.vue';
    const _contract = require("../../../blockchain/build/contracts/NFTMarketplace");
    const _contractMint = require("../../../blockchain/build/contracts/mintNft.json");

    const getAddr = async (provider) => {
        const addr = await provider.request({method: 'eth_requestAccounts'});
        return addr[0];

    }

    const getContract = async (web3, contract, CONTRACT_ADDRESS_MARKETPLACE) => {
        return new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS_MARKETPLACE)
    }


    export default {
        name: "ProfileView",
        components: { CardItem },
        data() {
            return {
                addr: undefined,
                nft_list:[],
                provider: undefined,
                marketplaceContract: undefined,
                CONTRACT_ADDRESS_MARKETPLACE: "0x1568aa48477086083237153bbd6faf38a1697182",
                CONTRACT_ADDRESS_MINT: "0x70DCf436b3F8B9b0B7507727b63fe0deaf257aFC",
                conctract: undefined,
                price: undefined,
                web3: undefined
            }
        },
        async mounted() {
            const _provider = await detectEthereumProvider();
            this.addr = await getAddr(_provider)
            this.provider = _provider;
            this.contract = _contract;
            this.web3 = new Web3(this.provider);
            this.marketplaceContract = await getContract(this.web3, this.contract, this.CONTRACT_ADDRESS_MARKETPLACE)
            this.mintContract = new this.web3.eth.Contract(_contractMint.abi, this.CONTRACT_ADDRESS_MINT)

            axios.get("/api/profile/"+this.addr).then((res) => {
                console.log(res.data);
                this.nft_list=res.data;
            }).catch(()=>{
                alert("Something Went Wrong")
            })

            window.ethereum.on('accountsChanged',()=>{
                window.location.reload();
            });
        },
        methods: {
            sleep(milliseconds) {
                return new Promise(resolve => setTimeout(resolve, milliseconds))
            },
            sellNft: async function (_tokenId, _price, _from) {
                // const web3 = new Web3(this.provider);
                console.log("token:",_tokenId," price:", _price, " from:", _from)
                try {
                    let transactionReceipt = null
                    const transactionHash = await addNftInMarket(this.mintContract, this.provider, this.marketplaceContract, _tokenId, _price, _from)
                    while (transactionReceipt == null) { // Waiting expectedBlockTime until the transaction is mined
                        transactionReceipt = await this.web3.eth.getTransactionReceipt(transactionHash);
                        console.log("waiting")
                        await this.sleep(1000)
                    }
                    if(transactionReceipt.status === false){
                        throw "transaction reverted"
                    }
                    axios.post("/api/profile/sell", {user_wallet:this.addr, token_id:_tokenId, price:_price}).then((res) => {
                        console.log(res.data)
                    }).catch((err) => {
                        alert(err)
                    })
                } catch (err) {
                   console.log("err")
                }
                
            }

        }
}
</script>

<style scoped>

.title{
    font-size: 30px;;
}

.profile-description {
    width: auto;
    border-radius: 20px;
    background-size: cover;
    background: rgba(238, 238, 238, 0.7);
    /* align-items: center;
    justify-content: center; */
    padding:20px 40px;
    margin-bottom: 10px;
    text-overflow: ellipsis;
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