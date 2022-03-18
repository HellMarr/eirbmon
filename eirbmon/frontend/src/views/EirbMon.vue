<template>
    <EirbMonItem name="Salamèche" id="#000AAA" price="0.001" :types="['electrik','ghost','fire']" color="#9ADCFF"></EirbMonItem>
    <ProgressBar value="100"></ProgressBar>
    <ProgressBar2 value="20"></ProgressBar2>
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
.container{
    margin:2%;
}
</style>