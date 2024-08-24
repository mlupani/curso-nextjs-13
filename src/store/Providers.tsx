'use client'

import { Provider } from 'react-redux'
import { store } from '.'
import { useEffect } from 'react'
import { setInitialState } from './pokemon/pokemonSlice'

interface Props {
    children: React.ReactNode
}

export const Providers = ({children}: Props) => {

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorite-pokemons') ?? '{}');
    store.dispatch(setInitialState(favorites))
  }, [])

  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}