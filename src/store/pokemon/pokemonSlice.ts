import { SimplePokemon } from '@/pokemons';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PokemonInitialState {
    favorites: {[key: string]: SimplePokemon}
}

/*
const getInitialState = () => {
  const favoritePokemons = JSON.parse(localStorage.getItem('favorite-pokemons') ?? '{}') ;
  return favoritePokemons;
}
*/

const initialState:PokemonInitialState = {
  favorites: {}
}

const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    setInitialState(state, action: PayloadAction<PokemonInitialState>) {
      state.favorites = action.payload.favorites
    },
    toggleFavorite(state, action: PayloadAction<SimplePokemon>) {
      if (state.favorites[action.payload.id]) {
        delete state.favorites[action.payload.id]
      } else {
        state.favorites[action.payload.id] = action.payload
      }

      // ESTO NO SE DEBE HACER EN REDUX TOOLKIT, SE USA EL MIDDLEWARE
      //localStorage.setItem('favorite-pokemons', JSON.stringify(state));
    }
  }
});

export const { toggleFavorite, setInitialState } = pokemonSlice.actions

export default pokemonSlice.reducer