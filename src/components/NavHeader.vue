<template>
  <div class="sticky-top">
    <header class="d-flex justify-content-center py-3 bg-dark">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/About" class="nav-link" active-class="active">About Us</router-link>
        </li>
        <div class="col mg-1 justify-content-end">
          <li class="nav-item">
            <router-link to="/Account" class="nav-link" active-class="active">Account</router-link>
          </li>
        </div>
      </ul>
    </header>
  </div>
</template>

<style scoped></style>
