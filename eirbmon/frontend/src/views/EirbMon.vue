<template>
    <div class="container-eirbmon" style="padding-bottom:205px">
        <EirbMonItem :nft_id="nft_id" :nft_potential="nft_potential" :nft_price="nft_price" :nft_type="nft_type" :nft_bg_color="nft_bg_color" :nft_antenna_color="nft_antenna_color" :nft_wings_color="nft_wings_color"></EirbMonItem>
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
            nft_antenna_color:undefined,
            nft_wings_color:undefined,
        };
    },
    components: {
        EirbMonItem,
    },
    async mounted(){
        let res= await axios.get("/api/eirbmon/"+this.id.toString());
        let nft_info = res.data.data;
        this.nft_id=nft_info.nft_id;
        this.nft_potential=nft_info.nft_potential;
        this.nft_price=nft_info.nft_price;
        this.nft_type=nft_info.nft_type;
        this.nft_color=nft_info.nft_color;
        this.nft_type=nft_info.nft_type;
        this.nft_bg_color=nft_info.nft_bg_color;
    },
}
</script>

<style scoped>

</style>