<template>
    <div class="container-eirbmon">
        <EirbMonItem nft_id=1253 nft_potential=100 nft_price=0.001 nft_type="elec" nft_color="#9ADCFF"></EirbMonItem>
    </div>
</template>

<script>
import EirbMonItem from '../components/EirbMonItem.vue'
import axios from 'axios';

export default {
    name: "HomePage",
    data(){
        return{
            id:this.$route.params.id,
            nft_id:undefined,
            nft_potential:undefined,
            nft_price:undefined,
            nft_type:undefined,
            nft_color:undefined,
        };
    },
    components: {
        EirbMonItem,
    },
    async mounted(){
        let res= await axios.get("/api/eirbmon/"+this.id.toString());
        this.nft_id=res.data.nft_id;
        this.nft_potential=res.data.nft_potential;
        this.nft_price=res.data.nft_price;
        this.nft_type=res.data.nft_type;
        this.nft_color=res.data.nft_color;
    },
}
</script>

<style scoped>

</style>