<template>
  <ion-page>
    <ion-content :fullscreen="true" class="custom-page">
      <div class="gif-container">
        <img src="@/assets/GIF.gif" alt="Dragon Ball Logo" class="gif-image">
      </div>

      <ion-searchbar 
        class="buscador"
        v-model="searchText"
        @ionChange="filterItems"
        placeholder="Buscar personaje...">
      </ion-searchbar>

      <ion-item class="custom-item">
        <ion-label>Selecciona un universo</ion-label>
        <ion-select
          v-model="seleccionaUniverso"
          placeholder="Todos"
          class="custom-select"
          @ionChange="filterItems">
          <ion-select-option value="">Todos</ion-select-option>
          <ion-select-option :value="universo.NOMBRE_UNIVERSO" v-for="universo in universos" :key="universo.ID_UNIVERSO">
            {{ universo.NOMBRE_UNIVERSO }}
          </ion-select-option>
        </ion-select>
      </ion-item>

      <div id="container" class="ion-padding">
        <template v-if="filteredPersonajes.length > 0">
          <ion-card color="warning" class="custom-card" v-for="(personaje, index) in filteredPersonajes" :key="index" @click="goToDetails(personaje.ID)">
            <ion-card-header>
              <div class="card">
                <img :src="personaje.IMAGEN" :alt="'Imagen de ' + personaje.NOMBRE" class="image">
                <div class="container"></div>
              </div>
              <ion-card-title>{{ personaje.NOMBRE }}</ion-card-title>
              <ion-card-subtitle ></ion-card-subtitle>
            </ion-card-header>
            <ion-card-content class="custom-card-content">
              <p>Raza: {{ personaje.RAZA }}</p>
              
              <p>Descripcion: {{ personaje.DESCRIPCION }}</p>
              
            </ion-card-content>
          </ion-card>
        </template>
        <template v-else>
          <div class="no-results">
            <img src="@/assets/RAYOS.gif" alt="No Results" class="gif">
          </div>
        </template>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage, IonSearchbar, IonItem, IonSelect, IonSelectOption, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/vue';

export default {
  name: 'HomePage',
  components: {
    IonContent, IonPage, IonSearchbar, IonItem, IonSelect, IonSelectOption, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle
  },
  data() {
    return {
      personajesArray: [],
      searchText: '',
      seleccionaUniverso: '',
      universos: []
    };
  },
  computed: {
    filteredPersonajes() {
      let filteredArray = this.personajesArray;
      
      // Filtrar por universo
      if (this.seleccionaUniverso) {
        filteredArray = filteredArray.filter(personaje => personaje.UNIVERSO === this.seleccionaUniverso);
      }
      
      // Filtrar por texto de búsqueda
      if (this.searchText.trim()) {
        filteredArray = filteredArray.filter(personaje => personaje.NOMBRE.toLowerCase().includes(this.searchText.trim().toLowerCase()));
      }
      
      return filteredArray;
    }
  },
  methods: {
    async getData() {
      try {
        // Obtener lista de personajes
        const personajesResponse = await fetch('http://pruebaapi.myddns.me/public/personajes');
        if (!personajesResponse.ok) {
          throw new Error('No se pudo obtener la información de los personajes correctamente');
        }
        const personajesData = await personajesResponse.json();
        this.personajesArray = personajesData;

        // Obtener lista de universos
        const universosResponse = await fetch('http://pruebaapi.myddns.me/public/listaUniversos');
        if (!universosResponse.ok) {
          throw new Error('No se pudo obtener la información de los universos correctamente');
        }
        const universosData = await universosResponse.json();
        this.universos = universosData;
      } catch (error) {
        console.error('Ha ocurrido un error:', error);
      }
    },
    goToDetails(id) {
      this.$router.push({ name: 'DetallePersonaje', params: { id: id } });
    },
    filterItems() {
  // Filtrar por universo y texto de búsqueda
  let filteredArray = this.personajesArray;
  
  if (this.seleccionaUniverso) {
    filteredArray = filteredArray.filter(personaje => personaje.UNIVERSO === this.seleccionaUniverso);
  }
  
  if (this.searchText.trim()) {
    filteredArray = filteredArray.filter(personaje => 
      personaje.NOMBRE.toLowerCase().includes(this.searchText.trim().toLowerCase()) ||
      personaje.RAZA.toLowerCase().includes(this.searchText.trim().toLowerCase()) ||
      personaje.PODERES.map(poder => poder.toLowerCase()).join(', ').includes(this.searchText.trim().toLowerCase())
    );
  }
  
  return filteredArray;
}
  },
  mounted() {
    this.getData();
  }
};
</script>

<style scoped>
#container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 10px;
  justify-items: center;
}

.gif-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.gif-image {
  width: 100%;
  max-height: 200px;
  background: #db9046;
  border-radius: 10px; 
}



.buscador {
  border-radius: 10px; 
}

.custom-item {
  border-radius: 10px; 
  margin: 10px; 
}

.custom-select {
  border-radius: 10px; 
}

.image{
  border-radius: 10px;
  width: 100%;
  height: auto; 
  max-height: 400px;
}

.custom-card {
  border-radius: 10px; 
}

ion-content {
  --background: #db9046;
}




</style>
