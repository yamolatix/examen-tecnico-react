import React, { useRef, useState } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'

function App() {
  const { movies } = useMovies()
  // const inputRef = useRef() /* Usar en la forma NO controlada (Caso 1 y 2) */
  //  Usar en la forma controlada.(Caso 3)
  const [query, setQuery] = useState("")
  const [error, setError] = useState(null)


  console.log("render");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Forma NO controlada más por vanilla JS
    // Para guardar UN (1) input donde se le asigna un "name" a la etiqueta y se busca con el FormData
    // 1
    /* const fields = new window.FormData(e.target)
    const data = fields.get("search")
    console.log("data", data); */
    //////////////////////////////////////////////////////////////////////////////////////////////////

    // Para guardar MUCHOS inputs y no recaer en hacer la anterior búsqueda de querys uno por uno. 
    // 2
    /* const fields = Object.fromEntries(new window.FormData(e.target))
    console.log("search", fields); */
    //////////////////////////////////////////////////////////////////////////////////////////////////

    // 3
    console.log("query", { query });
  }

  // Forma controlada por React
  // 3
  const handleChange = (e) => {
    const searchQuery = e.target.value /* Para asegurarnos de estar usando el último valor del estado y que no quede un paso atrás */
    setQuery(searchQuery)

    if (searchQuery == "") {
      setError("No se puede buscar una película vacia")
      return
    }

    if (searchQuery.match(/ˆ\d+$/)) {
      setError("No se pueden buscar números")
      return
    }

    if (searchQuery.length < 3) {
      setError("Debe tener un máximo de tres caracteres")
      return
    }

    setError(null)
  }

  return (
    <div className='page'>

      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          {/* 1 */}
          {/* <input name="search" ref={inputRef} type='text' placeholder='Carrie, Harry Potter, Matrix...' /> */}

          {/* 2 */}
          {/* <input name="busqueda" ref={inputRef} type='text' placeholder='Carrie, Harry Potter, Matrix...' />
          <input name="avanzada" ref={inputRef} type='text' placeholder='Carrie, Harry Potter, Matrix...' />
          <input name="fromEntries" ref={inputRef} type='text' placeholder='Carrie, Harry Potter, Matrix...' /> */}

          {/* 3 */}
          <input onChange={handleChange} type='text' placeholder='Carrie, Harry Potter, Matrix...' />
          <button type='submit'>Buscar</button>


        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
