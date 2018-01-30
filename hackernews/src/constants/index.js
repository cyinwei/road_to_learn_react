export const DEFAULT_QUERY = 'redux'
export const DEFAULT_HPP = 100

export const BASE_PATH = 'https://hn.algolia.com/api/v1'
export const PATH_SEARCH = '/search'
export const QUERY_PARAM = 'query'
export const PAGE_PARAM = 'page'
export const HPP_PARAM = 'hitsPerPage'

export const generateUrl = (searchTerm, page) =>
  `${BASE_PATH}${PATH_SEARCH}?${QUERY_PARAM}=${searchTerm}&\
${PAGE_PARAM}=${page}&${HPP_PARAM}=${DEFAULT_HPP}`