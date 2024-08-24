'use client'

import { useState } from 'react';
import { useAppSelector } from "@/store";
import { PokemonGrid } from "./PokemonGrid";
import { IoHeartOutline } from 'react-icons/io5';

const NoFavorites = () => {
  return (
    <div className='flex flex-col items-center flex-center justify-center h-[50vh]'>
      <h2>No hay favoritos</h2>
      <IoHeartOutline className='text-red-500' size={ 100 } />
    </div>
  )
}

export const FavoritesGrid = () => {
  const favorites = useAppSelector( state => Object.values(state.pokemons.favorites));
  //const [pokemons, setPokemons] = useState(favorites)

  return (
    <>
    {
      favorites.length > 0 ?
      <PokemonGrid pokemons={ favorites } /> :
      <NoFavorites/>
    }
    </>
  )

}