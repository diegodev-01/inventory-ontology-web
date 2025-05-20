import { useState, useEffect, useRef } from 'react'
import { SearchBar } from '@components/search-bar/search-bar'
import { SearchResults } from '@components/search-results/search-results'
import './App.css'
import { searchFetch } from '@services/search-engine'

interface SearchResult {
  sujeto: string
  predicado: string
  objeto: string
}

function App() {
  const [query, setQuery] = useState<string>('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Cambiado el tipo aquí para evitar error
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setResults([])
      setError(null)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const data = await searchFetch(searchTerm)
      setResults(data.results)
    } catch (err) {
      console.error('Error fetching search results:', err)
      setError('Failed to fetch results. Please try again.')
    } finally {
      setLoading(false)
    }
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
    <div className="App">
      <h1 className="title">Ontologies Searcher</h1>
      <SearchBar query={query} setQuery={setQuery} onSearch={() => handleSearch(query)} />
      <SearchResults results={results} loading={loading} error={error} />
    </div>
  )
}

export default App
