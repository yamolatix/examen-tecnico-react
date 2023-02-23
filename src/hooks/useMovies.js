import { useRef, useState } from "react"
import { searchMovies } from "../services/movies"

export function useMovies({ search }) {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const previousSearch = useRef(search) // Esto es para que no vuelva a hacer el pedido si en el input sigue el mismo string


    const getMovies = async () => {

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
    return { movies, getMovies, loading }
}