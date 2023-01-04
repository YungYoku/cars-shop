<template>
  <div class="page404">
    <h2 class="title">404</h2>
    <router-link to="/" class="link">На главную</router-link>
  </div>
</template>

<style lang="scss" scoped>
.page404 {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #ff4040;
  padding: 20vh 0;

  .title,
  .link {
    color: white;
  }

  .title {
    font-size: 120px;
    font-weight: 700;
  }

  .link {
    font-size: 20px;
    padding: 10px;
    border: 2px solid white;
  }
}
</style>
