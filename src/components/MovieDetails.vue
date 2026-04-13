<script>
export default {
  name: 'MovieDetails',

  props: {
    movie: Object,
  },

  data() {
    return {
      //Empty comments to begin with
      comment: '',
    }
  },

  computed: {
    fullSeenText() {
      //Changes the text based on if the checkbox is clicked
      return this.movie.hasSeen ? 'You have seen the movie' : 'You have not seen the movie'
    },

    likeColor() {
      //Changes the color on likes based on amount
      if (this.movie.likeCount <= 5) return 'grey'
      if (this.movie.likeCount <= 10) return 'blue'
      return 'green'
    },
  },

  methods: {
    //adds like
    addLike() {
      this.$emit('like')
    },

    postComment() {
      //Empties the textbox when comment added
      if (this.comment.trim()) {
        this.$emit('add-comment', this.comment)
        this.comment = ''
      }
    },

    //Clears the comment box
    clearComment() {
      this.comment = ''
    },

    //Toggles between seen checkbox
    toggleSeen() {
      this.$emit('toggle-seen')
    },

    openIMDB() {
      //Opens a new window with the imdb page
      if (this.movie.imdbId) {
        window.open('https://www.imdb.com/title/' + this.movie.imdbId, '_blank')
      }
    },
  },
}
</script>

<template>
  <!-- Adds class seen if the method hasSeen is true -->
  <v-card class="movie-card" :class="{ seen: movie.hasSeen }">
    <!-- Poster/Image -->
    <v-img :src="movie.image" height="300" class="movie-image" @click="openIMDB" />

    <!-- Title of movie-->
    <v-card-title class="d-flex justify-space-between align-center">
      <span class="text-truncate">{{ movie.movieName }}</span>
    </v-card-title>

    <v-card-text>
      <!-- Year of movie -->
      <v-chip size="small" class="year align-center">
        {{ movie.year }}
      </v-chip>
      <!-- Likes -->
      <div class="d-flex align-center ga-2 mb-3">
        <v-btn icon="mdi-thumb-up" variant="text" class="likebtn" @click="addLike" />

        <span :style="{ color: likeColor }"> Likes: {{ movie.likeCount }} </span>
      </div>

      <v-divider class="my-3" />

      <!-- Checkbox for seen/not seen. Toggles between the full text. Also changes seen class from above -->
      <v-checkbox
        :model-value="movie.hasSeen"
        @update:modelValue="toggleSeen"
        :label="fullSeenText"
        hide-details
      />

      <v-divider class="my-3" />

      <!-- Comments -->
      <v-expansion-panels variant="accordion">
        <v-expansion-panel>
          <v-expansion-panel-title>
            <!-- Amount of comments -->
            Comments ({{ movie.comments.length }})
          </v-expansion-panel-title>

          <v-expansion-panel-text>
            <!-- Checks if there are any comments and prints the else statement below if no comments -->
            <div v-if="movie.comments.length">
              <v-list density="compact">
                <!-- Loop through all comments in an array -->
                <v-list-item v-for="(comment, i) in movie.comments" :key="i" :title="comment" />
              </v-list>
            </div>

            <div v-else class="text-grey">No comments yet</div>

            <!-- Adds input field and makes sure you can post it by using enter -->
            <v-text-field
              v-model="comment"
              label="Write comment"
              density="compact"
              class="mt-3"
              @keyup.enter="postComment"
            />

            <div class="d-flex ga-2">
              <!-- Buttons for post and clear-->
              <v-btn size="small" color="primary" @click="postComment"> Post </v-btn>

              <v-btn size="small" variant="tonal" @click="clearComment"> Clear </v-btn>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.movie-card {
  border-radius: 16px;
  overflow: hidden;
  transition: 0.25s ease;
  box-shadow: 0px 12px 20px rgba(255, 182, 193, 0.35);
  margin: 20px;
}

.movie-card:hover {
  transform: translateY(-6px);
}

.movie-image {
  transition: transform 0.3s ease;
  cursor: pointer;
}

.movie-card:hover .movie-image {
  transform: scale(1.03);
}

.seen {
  box-shadow: 0 8px 17px rgb(255, 182, 205);
}

.likebtn {
  color: #e91e63;
}
.year {
  background-color: rgba(255, 182, 205, 0.564);
}
</style>
