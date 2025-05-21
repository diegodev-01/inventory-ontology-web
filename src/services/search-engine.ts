const API_URL = import.meta.env.VITE_API_URL

export const searchFetch = async (query: string) => {
  if (query.length < 1) {
    return { results: [] }
  }
  const response = await fetch(`${API_URL}search?query=${query}`)
  const data = await response.json()
  return data
}

export const searchDBpedia = async (query: string) => {
  if (query.length < 1) {
    return { results: [] }
  }
  const response = await fetch(`${API_URL}search-db?query=${query}`)
  const data = await response.json()
  return data
}
