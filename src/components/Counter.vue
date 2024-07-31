<template>
    <div>
        <button @click="handleCounter">{{ count }}</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            count: 1
        }
    },
    methods:{
        handleCounter(){
            this.count += 1;
        }
    }
})
</script>

<style scoped>

</style>