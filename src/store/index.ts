import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'

import productReducer, {
  name as nameReducerProduct,
} from './slices/product.slice'
import paymentReducer, {
  name as nameReducerPayment,
} from './slices/payment.slice'

const rootReducer = combineReducers({
  [nameReducerProduct]: productReducer,
  [nameReducerPayment]: paymentReducer,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store)

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
