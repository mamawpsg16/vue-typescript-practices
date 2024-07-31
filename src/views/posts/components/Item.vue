<template>
    <!-- <input type="number" v-model="incrementBy"> -->
    <!-- <button @click="handleUpdateCounter">Increment Counter</button> -->
    <div id="list-container">
        <div id="container">
            <div id="button">
                <p>ORDER BY: &nbsp; </p>
                <button type="button" id="order-by-id" @click="handlePostOrder('id')">ID</button>
                <button type="button" id="order-by-title" @click="handlePostOrder('title')">TITLE</button>
                <button type="button" id="order-by-year" @click="handlePostOrder('year')">YEAR</button>
            </div>
            <template v-if="sortedPosts.length <= 0">
                <p style="text-align: center; font-weight: bold;">No Data</p>
            </template>
            <div v-else class="list-item" v-for="post in sortedPosts" :key="post.id">
                <p>{{ post.id }}</p>
                <p>{{ post.title }}</p>
                <p>{{ post.year }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import type { PostList } from '@/types/posts/PostList';

type SortKey = keyof PostList;
type SortDirection = 'asc' | 'desc';
export default defineComponent({
    emits: ['updateCounter'],
    props: {
        posts: {
            type: Array as () => PostList[],
            default: () => []
        }
    },
    setup(props) {
        const sortKey = ref<SortKey>('id');
        const sortDirection = ref<SortDirection>('asc');

        const sortedPosts = computed(() => {
            return [...props.posts].sort((a, b) => {
                const key = sortKey.value as keyof PostList;

                if (typeof a[key] === 'string' && typeof b[key] === 'string') {
                    return sortDirection.value === 'asc'
                        ? a[key].localeCompare(b[key])
                        : b[key].localeCompare(a[key]);
                } else if (typeof a[key] === 'number' && typeof b[key] === 'number') {
                    return sortDirection.value === 'asc'
                        ? a[key] - b[key]
                        : b[key] - a[key];
                }
                return 0; // Default case if types don't match or are unexpected
            });
        });

        const handlePostOrder = (type: SortKey) => {
            if (sortKey.value === type) {
                // Toggle direction if the same key is clicked
                sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
            } else {
                // Set new key and default to ascending
                sortKey.value = type;
                sortDirection.value = 'asc';
            }
        };
        const incrementBy = ref<number>(0);
        return {
            sortedPosts,
            handlePostOrder,
            incrementBy
        };
    },
    methods:{
        handleUpdateCounter(){
            this.$emit('updateCounter',this.incrementBy)
        },
    }
})
</script>

<style scoped>
#list-container {
  display: flex;
  justify-content: center;
  padding: 20px;
}

#container {
  display: grid;
  grid-template-columns: 1fr; /* Single column for stacking items vertically */
  gap: 20px;
  width: 100%;
  max-width: 1200px; /* Adjust as needed */
}

#button {
  grid-column: 1;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

#button button {
  margin: 0 5px;
}

.list-item {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Distribute content in three equal columns */
  gap: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.list-item p {
  margin: 0;
}
</style>
