<template>
    <div class="container-eirbmon">
        <EirbMonItem    :nft_id="nft_id"
                        :nft_potential="nft_potential"
                        :nft_price="nft_price" :nft_type="nft_type"
                        :nft_bg_color="nft_bg_color"
                        :nft_antenna_color="nft_antenna_color"
                        :nft_wings_color="nft_wings_color"
                        :nft_image="nft_image"
                        :nft_forsale="nft_forsale"
                        :nft_accessories="nft_accessories"
                        ></EirbMonItem>
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
            nft_antenna_color:undefined,
            nft_wings_color:undefined,
            nft_image:undefined,
            nft_forsale:undefined,
            nft_accessories:undefined,
        };
    },
    components: {
        EirbMonItem,
    },
    async mounted(){
        let res= await axios.get("/api/eirbmon/"+this.id.toString());
        console.log(res.data);
        let nft_info = res.data;
        this.nft_id=nft_info.nft_id;
        this.nft_potential=nft_info.nft_potential;
        this.nft_price=nft_info.nft_price;
        this.nft_type=nft_info.nft_type;
        this.nft_type=nft_info.nft_type;
        this.nft_bg_color=nft_info.nft_bg_color;
        this.nft_antenna_color=nft_info.nft_pedicel_color;
        this.nft_wings_color=nft_info.nft_wings_color;
        this.nft_image=nft_info.nft_image;
        this.nft_forsale=nft_info.nft_forsale;
        this.nft_accessories=nft_info.nft_accessory_list;
    },
}
</script>

<style scoped>
.container-eirbmon{
    padding-bottom: 10px;
}
</style>