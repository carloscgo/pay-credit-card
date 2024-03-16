import { createSlice } from '@reduxjs/toolkit'

export const name = 'product'
export const initialState = {
  products: [],
  loading: false,
  error: null,
}

export const productSlice = createSlice({
  name,
  initialState,
  reducers: {
    fillProducts: (state, action) => {
      state.products = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { fillProducts, setLoading, setError } = productSlice.actions

export default productSlice.reducer
