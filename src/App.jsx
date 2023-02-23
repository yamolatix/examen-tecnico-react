import React from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'

function App() {
  // const inputRef = useRef() /* Usar en la forma NO controlada (Caso 1 y 2) */
  //  Usar en la forma controlada.(Caso 3)
  const { search, updateSearch, error } = useSearch()

  const { movies, getMovies, loading } = useMovies({ search })

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
    // console.log("search", { search });

    getMovies()
  }

  // Forma controlada por React
  // 3
  const handleChange = (e) => {
    // const searchQuery = e.target.value /* Para asegurarnos de estar usando el último valor del estado y que no quede un paso atrás */
    /* if (searchQuery.star) */
    updateSearch(e.target.value)
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
          <input onChange={handleChange}
            style={{
              border: "1px solid transparent",
              borderColor: error ? "red" : "transparent"
            }} value={search} name="search"
            type='text' placeholder='Carrie, Harry Potter, Matrix...' />
          <button type='submit'>Buscar</button>


        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>

      <main>
        {
          loading ? <p>Cargando...</p> : <Movies movies={movies} />
        }
      </main>
    </div>
  )
}

export default App
