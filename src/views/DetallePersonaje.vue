<template>
  <ion-page>
    <ion-content v-if="personaje">
      <!-- Contenedor de la imagen -->
      <div class="gif-container">
        <img src="@/assets/PERSONAJESDETALLES.gif" alt="Dragon Ball Logo" class="gif">
      </div>
      <!-- Mostrar información detallada del personaje -->
      <div class="detalle-personaje">
        <div class="personaje-info">
          <h1>{{ personaje.NOMBRE }}</h1>
          <img :src="personaje.IMAGEN" :alt="'Imagen de ' + personaje.NOMBRE" class="personaje-imagen">
          <p><strong>Descripción:</strong> {{ personaje.DESCRIPCION }}</p>
          <p><strong>Raza:</strong> {{ personaje.RAZA }}</p>
          <p><strong>Poderes:</strong> {{ personaje.PODERES }}</p>
          <p><strong>Universo:</strong> {{ personaje.UNIVERSO }}</p>
          <p><strong>Biografía:</strong> {{ personaje.BIOGRAFIA }}</p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent } from '@ionic/vue';
export default {
  name: 'DetallePersonaje',
  components: {
    IonPage, IonContent
  },
  data() {
    return {
      personaje: null, // Objeto para almacenar la información del personaje
    };
  },
  async created() {
    const id = this.$route.params.id; // Obtener el ID del personaje desde la ruta
    const response = await fetch(`http://pruebaapi.myddns.me/public/tarjeta/${id}`);
    if (response.ok) {
      this.personaje = await response.json(); // Asignar la información del personaje al objeto personaje
    } else {
      console.error('No se pudo obtener la información del personaje');
    }
  },
};
</script>

<style scoped>
.detalle-personaje {
  padding: 50px;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); 
}


.personaje-info {
  max-width: 800px; 
  padding: 20px;
  background-color: hsl(60, 20%, 99%); 
  border-radius: 10px; 
}

.personaje-imagen {
  width: 100%; 
  max-height: 500px; 

}

.gif-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.gif-imagen {
  width: 60%;
  max-height: 100px;
  background: #db9046;
  margin: 10px;
}

.gif{
  width: 60%;
  max-height: 100px;
  background: #db9046;
  
}


.personaje-imagen {
  border-radius: 10px;
  transition: box-shadow 0.3s ease; 
}

.personaje-imagen:hover {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3); 
}


ion-content {
  --background: #db9046;
}
</style>
