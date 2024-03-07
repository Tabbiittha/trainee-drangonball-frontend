<template>
  <ion-page >

  </ion-page>
</template>

<script>

</script>

<style>
#container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 10px;
  justify-items: center;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 100%; 
  max-width: 200px; 
}

.card:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.imagen {
  width: 100%;
  height: auto; 
  max-height: 400px;
}

ion-title {
  color: #ff0;
  font-weight: bold;
}

.logo-image {
  width: 100px; 
  height: auto;
  margin-right: 30px; 
}

.custom-page {
  background-color: #242525; 
}

.search-bar {
  display: flex;
  align-items: center;
  width: 100%; 
  max-width: 300px; 
  margin-left: auto; 
  margin-right: 30px; 
}
</style>