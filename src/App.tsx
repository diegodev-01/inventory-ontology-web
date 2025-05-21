import { useState, useEffect, useRef } from 'react'
import { SearchBar } from '@components/search-bar/search-bar'
import { SearchResults } from '@components/search-results/search-results'
import './App.css'
import { searchFetch } from '@services/search-engine'
import { searchDBpedia } from '@services/search-engine'

interface SearchResult {
  sujeto: string
  predicado: string
  objeto: string
}

function App() {
  const [query, setQuery] = useState<string>('')

  const [resultsFetch, setResultsFetch] = useState<SearchResult[]>([])
  const [resultsDBpedia, setResultsDBpedia] = useState<SearchResult[]>([])

  const [loadingFetch, setLoadingFetch] = useState(false)
  const [loadingDBpedia, setLoadingDBpedia] = useState(false)

  const [errorFetch, setErrorFetch] = useState<string | null>(null)
  const [errorDBpedia, setErrorDBpedia] = useState<string | null>(null)

  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setResultsFetch([])
      setResultsDBpedia([])
      setErrorFetch(null)
      setErrorDBpedia(null)
      setLoadingFetch(false)
      setLoadingDBpedia(false)
      return
    }

    // Buscar con searchFetch
    setLoadingFetch(true)
    setErrorFetch(null)
    searchFetch(searchTerm)
      .then((data) => setResultsFetch(data.results))
      .catch((err) => {
        console.error('Error fetching with searchFetch:', err)
        setErrorFetch('Failed to fetch results from Search Engine.')
      })
      .finally(() => setLoadingFetch(false))

    // Buscar con searchDBpedia
    setLoadingDBpedia(true)
    setErrorDBpedia(null)
    searchDBpedia(searchTerm)
      .then((data: any) => setResultsDBpedia(data.results))
      .catch((err: any) => {
        console.error('Error fetching with searchDBpedia:', err)
        setErrorDBpedia('Failed to fetch results from DBpedia.')
      })
      .finally(() => setLoadingDBpedia(false))
  }

  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current)

    debounceTimeout.current = setTimeout(() => {
      handleSearch(query)
    }, 400)

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current)
    }
  }, [query])

  return (
    <section className="App">
      <h1 className="title">Ontologies Searcher</h1>
      <SearchBar
        query={query}
        setQuery={setQuery}
        onSearch={() => handleSearch(query)}
      />
      <div className="search-results">
        <SearchResults
          results={resultsFetch}
          loading={loadingFetch}
          error={errorFetch}
        />
        <SearchResults
          results={resultsDBpedia}
          loading={loadingDBpedia}
          error={errorDBpedia}
        />
      </div>
    </section>
  )
}

export default App
