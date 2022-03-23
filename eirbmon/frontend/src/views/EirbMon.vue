<template>
    <div class="container-eirbmon">
        <EirbMonItem name="Salamèche" id="#000AAA" price="0.001" :types="['elec']" color="#9ADCFF"></EirbMonItem>
        <ProgressBar value="100"></ProgressBar>
        <ProgressBar2 value="20"></ProgressBar2>
    </div>
</template>

<script>
import EirbMonItem from '../components/EirbMonItem.vue'


export default {
    name: "HomePage",
    components: {
        EirbMonItem,
    }
}
</script>

<style scoped>

</style>