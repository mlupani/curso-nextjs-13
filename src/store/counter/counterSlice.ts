import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
    count: number,
    isReady: boolean
}

const initialState: CounterState = {
    count: 2,
    isReady: false
}

const CounterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    initCounterState(state, action: PayloadAction<number>){
      if(!state.isReady){
        state.count = action.payload
        state.isReady = true
      }
    },
    addOne(state){
      state.count += 1
    },
    substractOne(state){
      if(state.count === 0) return;
      state.count -= 1
    },
    resetCount(state, payload: PayloadAction<number>){
      if(payload.payload < 0) return;
      state.count = 0
    },
  }
});

export const { addOne, substractOne, resetCount, initCounterState } = CounterSlice.actions

export default CounterSlice.reducer