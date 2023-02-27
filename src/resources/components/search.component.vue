<template>
    <div class="row">
        <div class="col-sm-8"><input type="search" class="form-control" v-model="data.key" :placeholder="placeholder"></div>
        <div class="col-sm-4"><button type="button" class="btn btn-primary btn-block my-0" @click="search">Search</button></div>
    </div>
</template>

<script>
export default {
    name: "search.component.vue",
    props: ['q','placeholder'],
    data(){
      return {
          data:{}
      }
    },
    methods:{
    
        search(){
            let input = {}
            input[this.q]= this.data.key;
           
            this.$emit('event',input);
        }
    }
}
</script>

<style scoped>

</style>