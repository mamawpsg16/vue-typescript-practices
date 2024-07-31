<script setup lang="ts">
import PostList from '@/views/posts/PostList.vue';
import TypescriptTest from '@/views/typescript-test/Index.vue';
</script>

<template>
  <main id="main-cointainer">
    <!-- <PostList/> -->
    <TypescriptTest/>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
