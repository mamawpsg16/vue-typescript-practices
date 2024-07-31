<template>
    <Item :posts="posts"  @updateCounter="handleCounterUpdate"/>
    <!-- <p>{{ counter }}</p> -->
    <!-- <input type="text" @change="handleChange" /> -->
    <!-- <input v-model="greetingUppercased"> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { MyComponentData } from '@/types/posts/ComponentData';
import Item from './components/Item.vue';
export default defineComponent({
    setup () {
        return {}
    },
    components:{
        Item
    },
    data(): MyComponentData {
        return {
            posts: [
                { id: 1, title: 'ABC', year: 2024 },
                { id: 2, title: 'DEF', year: 2022 },
                { id: 3, title: 'GHI', year: 2023 }
            ],
            counter:1,
            message:null
        };
    },
    computed: {
        // explicitly annotate return type
        greeting(): string {
            return this.message + '!'
        },

        // annotating a writable computed property
        greetingUppercased: {
            get(): string {
                return this.greeting.toUpperCase()
            },
            set(newValue: string) {
                this.message = newValue.toUpperCase()
            }
        }
    },
    methods:{
        updatePost(){
            this.posts.push({ id: Math.trunc(Math.random() * 100) + 1, title: 'JK', year: 2024 })
        },

        handleCounterUpdate(incrementBy:number){
            console.log(incrementBy,"INCREMENT BRO");
            this.counter += incrementBy;
        },

        handleChange(event: Event) {
            console.log((event.target as HTMLInputElement).value)
        },

        lookupHeadphonesManufacturer(color: "blue" | "black"): (string | void) {
            if (color === "blue") {
                return "beats";
            } else {
            console.log('ELSE');
            }
        }
    }
})
</script>
