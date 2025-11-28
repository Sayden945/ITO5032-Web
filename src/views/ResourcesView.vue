<template>
  <div class="container py-5">
    <h1>Resources</h1>
  </div>
  <div class="container mb-5">
    <!-- Filter Navigation -->
    <ul class="nav nav-pills mb-4 justify-content-center">
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: activeFilter === 'all' }"
          @click="activeFilter = 'all'"
          >All</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: activeFilter === 'news' }"
          @click="activeFilter = 'news'"
          >News</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: activeFilter === 'media' }"
          @click="activeFilter = 'media'"
          >Media</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: activeFilter === 'blog' }"
          @click="activeFilter = 'blog'"
          >Blog</a
        >
      </li>
    </ul>

    <!-- Articles Grid -->
    <div class="row g-4">
      <div v-for="article in filteredArticles" :key="article.id" class="col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <span class="badge bg-primary mb-2">{{ article.type }}</span>
            <h5 class="card-title">{{ article.title }}</h5>
            <p class="card-text text-muted">{{ article.description }}</p>
            <small class="text-muted">{{ article.date }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.card {
  border: none;
}

.nav-link {
  cursor: pointer;
}
</style>
