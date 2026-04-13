const API_KEY = 'e41cb4a6de7da05bc998f14c67212cc2'
const BASE_URL = 'https://api.themoviedb.org/3'

//Henter film per id
export const movieService = {
  async getMovieDetails(movieId) {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`)
    if (!response.ok) throw new Error('Movie not found')
    return await response.json()
  },
}
