import React from 'react';

function RenderMovies({ movies }) {
    return (
        <ul>
            {movies.map(movie =>
            (
                <li key={movie.id}>
                    <h3>{movie.title}</h3>
                    <p>{movie.year}</p>
                    <img src={movie.image} alt={movie.title} />
                </li>
            ))}

        </ul>
    )
}

function RenderNoResults() {
    return (<h1>No hay películas para esta búsqueda</h1>)

}

export function Movies({ movies }) {
    /* Antes hago un chequeo de que el arreglo tiene un resultado */
    const hasMovies = movies?.length > 0

    return (
        hasMovies ? <RenderMovies movies={movies} /> : <RenderNoResults />
    )
}