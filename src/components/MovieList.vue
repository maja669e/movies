<script>
import MovieDetails from './MovieDetails.vue'
import { movieService } from '../services/movieService.js'

export default {
  name: 'MovieList',

  components: {
    MovieDetails,
  },

  data() {
    return {
      movies: [],
    }
  },
  async mounted() {
    //Choosing my movies by id
    const movieIds = [4951, 9603, 10625, 9655, 8835]

    //Loads all movies from above ids
    const movies = await Promise.all(movieIds.map((id) => movieService.getMovieDetails(id)))

    //Takes the api data and converts it so it can be used in my code
    this.movies = movies.map((movie) => ({
      id: movie.id,
      movieName: movie.title,
      year: new Date(movie.release_date).getFullYear(),
      imdbId: movie.imdb_id,
      image: 'https://image.tmdb.org/t/p/w300' + movie.poster_path,
      likeCount: 0,
      comments: [],
      hasSeen: false,
    }))
  },
}
</script>

<template>
  <div>
    <h1>Movie List</h1>

    <v-container>
      <v-row class="ga-2">
        <!-- Looping through movies and putting them into grid layout -->
        <v-col v-for="(movie, index) in movies" :key="movie.id" cols="12" sm="6" md="4">
          <!-- Getting the data from moviedetails -->
          <MovieDetails
            :movie="movie"
            @like="movie.likeCount++"
            @add-comment="movie.comments.push($event)"
            @toggle-seen="movie.hasSeen = !movie.hasSeen"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
