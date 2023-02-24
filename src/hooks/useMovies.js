import { useRef, useState, useMemo, useCallback } from "react"
import { searchMovies } from "../services/movies"

export function useMovies({ search, sort }) {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const previousSearch = useRef(search) // Esto es para que no vuelva a hacer el pedido si en el input sigue el mismo string


    const getMovies = useCallback(
        // El useCallback usa por debajo al useMemo, solo que esta pensado para las FUNCIONES!!! Por lo que searía una forma más sencilla de escribir exactamente lo mismo.

        // Para OPTIMIZAR el rendimiendo de la aplicacion y que NO ejecute getMovies constantemente por cada letra que se escriba en el input... se le pasa como parametro a la función que retorna el useMemo y se le saca al hook la dependencia del search. Por ende cuando se llame al getMovies() se le debe pasar como parametro el search.
        // Esto solo se puede hacer es si hay un problema de rendimiento!!!!
        async ({ search }) => {
            //Primero hago la validación. Si el search-estado es igual al "nuevo" string que se le está pasando por parametro (el del useRef.current) dejalo como está.
            if (search === previousSearch.current) return

            try {
                //En caso de que el search sea diferente al string pasado del input comparandolo con el anterior, se reemplaza por el nuevo. 
                setLoading(true)
                previousSearch.current = search
                const newMovies = await searchMovies({ search })
                setMovies(newMovies)
            }
            catch (e) {
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }
        , [])

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // Lo que sucede con esta función es que hace el sort por cada vez que se escribe en el input. Esto es porque al componente se le pasan DOS parametros. Y por más que no estemos haciendo el sort al escribir la busqueda el sort lo va haciendo por detras constantemente.
    // Esto, obviamente, puede traer dificultades si la busqueda es de 1000 pelitulas.
    /*     const sortedMovies = sort
            ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
            : movies */
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // useMemo es para poder memorizar computaciones que hemos hecho, que queremos evitar que se hagan a no ser que cambien las dependencias a la que le estemos pasando.

    const sortedMovies = useMemo(() => {
        //Este condicional quiero que lo hagas solo cuando cambien X dependencias. Por eso utilizo useMemo
        return sort
            ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
            : movies
    }, [sort, movies]) // Si no cambia el valor del sort o las películas el VALOR de sortedmovies lo mantenemos igual.

    return { movies: sortedMovies, getMovies, loading }
}