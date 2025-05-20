import { DocIcon } from '@/assets/DocIcon'
import './search-results.css'
import { Spinner } from '../spinner/Spinner'

interface SearchResult {
  sujeto: string
  predicado: string
  objeto: string
}

interface Props {
  results: SearchResult[]
  loading: boolean
  error: string | null
}

export const SearchResults = ({ results, loading, error }: Props) => {
  return (
    <div className="results-container">
      {loading && (
        <div className="loading" style={{ display: 'flex', justifyContent: 'center' }}>
          <Spinner />
        </div>
      )}
      {error && <p className="error">{error}</p>}

      {!loading && !error && results.length === 0 && (
        <div className="no-results">
          <span role="img" aria-label="no-results">
            <DocIcon />
          </span>
          <p>No se encontraron resultados. Intente con otra búsqueda.</p>
        </div>
      )}

      <ul className="results-list">
        {results.map((item, index) => (
          <li key={index} className="result-item">
            <strong>Sujeto:</strong> {item.sujeto} <br />
            <strong>Predicado:</strong> {item.predicado} <br />
            <strong>Objeto:</strong> {item.objeto}
          </li>
        ))}
      </ul>
    </div>
  )
}
