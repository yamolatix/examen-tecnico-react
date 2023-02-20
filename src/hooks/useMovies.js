import withResults from "../mocks/withResults.json"

export function useMovies() {
    const movies = withResults.Search

    const mappedMovies = movies.map((movie) => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        image: movie.Poster
    }))
    return { movies: mappedMovies }
}