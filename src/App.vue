<script>
import MovieList from './components/MovieList.vue'
import Machi from '@/assets/machi.jpg'
export default {
  name: 'App',
  data() {
    return {
      currentView: 'home',
      icons: ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram'],
      dialog: false,
      Machi,
    }
  },

  components: {
    MovieList,
  },
}
</script>

<template>
  <v-app>
    <v-app-bar app class="headerstyle">
      <v-toolbar-title>Movie App</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn class="cloud-btn" @click="currentView = 'home'"> Home </v-btn>

      <v-btn class="cloud-btn" @click="currentView = 'movies'"> Movies </v-btn>
    </v-app-bar>

    <v-main>
      <div id="home">
        <!-- Skift til Homepage -->
        <div v-if="currentView === 'home'">
          <v-container
            class="fill-height d-flex flex-column justify-center align-center text-center"
          >
            <h1>Welcome to my Movie App</h1>
            <p>This is my homepage. I don't know what to put here</p>

            <h3>Meet the developer team</h3>

            <!-- show picture if true/clicked -->
            <v-btn class="hpbtn mt-4" @click="dialog = true"> Show developer </v-btn>
          </v-container>
        </div>
        <v-dialog v-model="dialog" max-width="600">
          <v-card>
            <v-card-title>Machi the developer</v-card-title>

            <v-img :src="Machi" cover />

            <v-card-actions>
              <v-spacer />
              <!-- Close image -->
              <v-btn variant="text" @click="dialog = false"> Close </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Skift til Movies page -->
        <MovieList v-if="currentView === 'movies'" />
      </div>
    </v-main>

    <!-- Footer -->

    <v-footer class="w-100 text-center d-flex flex-column ga-2 py-2 headerstyle">
      <div class="d-flex ga-3">
        <v-btn
          v-for="icon in icons"
          :key="icon"
          :icon="icon"
          density="comfortable"
          variant="text"
        ></v-btn>
      </div>

      <v-divider class="my-2" thickness="2" width="50"></v-divider>

      <!--     <div class="text-body-small font-weight-regular opacity-60">
        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo
        interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed
        massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi
        vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui
        sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque
        penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </div> -->

      <v-divider></v-divider>

      <div class="text-body-small font-weight-regular opacity-60">
        © Copyright {{ new Date().getFullYear() }} - All Rights Reserved ❘ Designed by Maja Bijedić
      </div>
    </v-footer>
  </v-app>
</template>

<style scoped>
#home {
  min-height: 70vh;
  margin: 20px;
}

.headerstyle {
  background-color: rgb(228, 160, 183);
}

.cloud-btn {
  background-image: url('assets/cloudtest.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;

  width: 140px;
  height: 63px;

  color: rgb(85, 80, 80);
  text-transform: none;
  font-weight: 600;

  box-shadow: none;
  margin-top: 5px;
}

.hpbtn {
  background-color: rgb(228, 160, 183);
}
</style>
