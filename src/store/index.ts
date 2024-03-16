import { configureStore } from '@reduxjs/toolkit'
import productReducer, {
  name as nameReducerProduct,
} from './slices/product.slice'
import paymentReducer, {
  name as nameReducerPayment,
} from './slices/payment.slice'

const store = configureStore({
  reducer: {
    [nameReducerProduct]: productReducer,
    [nameReducerPayment]: paymentReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
