import { useEffect, useRef, useState } from "react"

export function useSearch() {
    const [search, updateSearch] = useState("")
    const [error, setError] = useState(null)
    const isFirstInput = useRef(true)

    useEffect(() => {
        if (isFirstInput.current) {
            //Si el isFirstInput.current estando en true. En caso de que sea la primera vez le cambia el valor en caso de que el search sea un string vacio. 
            isFirstInput.current = search === "" //En este caso al ser un string vacio el valor de isFirstInput es true. Pero cuando la persona empiece a escribir, será false y podrán correr las validaciones de abajo.
            return
        }

        if (search == "") {
            setError("No se puede buscar una película vacia")
            return
        }

        if (search.match(/ˆ\d+$/)) {
            setError("No se pueden buscar números")
            return
        }

        if (search.length < 3) {
            setError("Debe tener un máximo de tres caracteres")
            return
        }

        setError(null)
    }, [search])
    
    return { search, updateSearch, error }
}