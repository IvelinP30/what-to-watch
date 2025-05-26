export const HOME_PAGE = '/'
export const MOVIES_PAGE = '/movies'
export const SHOWS_PAGE = '/shows'
export const PEOPLE_PAGE = '/people'
export const PROVIDERS_PAGE = '/providers'
export const DETAILS_PAGE = '/:type/details/:id'
export const PERSON_DETAILS_PAGE = '/person/details/:id'
export const SEARCH_PAGE = '/search-results/:searchQuery'
export const ACCOUNT_FAVORITES = '/account/favorites'
export const ACCOUNT_WATCH_LATER = '/account/watch-later'
export const ACCOUNT_INFO = '/account/info'
export const ACCOUNT_RECOMMANDATIONS = '/account/recommendations'


export const PROTECTED_ROUTES = [
    ACCOUNT_FAVORITES,
    ACCOUNT_WATCH_LATER,
    ACCOUNT_INFO,
    ACCOUNT_RECOMMANDATIONS
];