import { createSlice } from '@reduxjs/toolkit'
import { ProductCardProps } from '../../components/ProductCard'
import { IFormValues } from '../../components/Payment'
import { StatusTransaction } from '../../hooks/usePayment'

export const name = 'payment'

export const initialState = {
  product: {},
  creditCard: {},
  transaction: {},
  loading: false,
  error: null,
}

export type TStatePayment = {
  product: ProductCardProps
  creditCard: IFormValues
  transaction: {
    id: string
    time: string
    status: StatusTransaction
    messageError?: string | null
    product: ProductCardProps
    creditCard: IFormValues
  }
  loading: boolean
  error: string | null
}

export const paymentSlice = createSlice({
  name,
  initialState,
  reducers: {
    fillPayment: (state, action) => {
      if (action.payload.product) {
        state.product = action.payload.product
      }

      if (action.payload.creditCard) {
        state.creditCard = action.payload.creditCard
      }

      if (action.payload.transaction) {
        state.transaction = action.payload.transaction
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    reset: (state) => {
      state.product = {}
      state.creditCard = {}
      state.transaction = {}
    },
  },
})

export const { fillPayment, setLoading, setError, reset } = paymentSlice.actions

export default paymentSlice.reducer
