import { configureStore, combineReducers, createSlice } from "@reduxjs/toolkit";
import { githubApiSlice } from "../features/github/github-api-slice";
import storage from 'redux-persist/lib/storage'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  version: 1,
  storage: storage,
  timeout: null,
}

const searchTermSlice = createSlice({
  name: 'searchTerm',
  initialState: '',
  reducers: {
    setSearchTerm: (state, action) => {
      console.log('Incoming action :', action);
      state =  action.payload || '';
      return state;
    }
  }
})
export const { setSearchTerm }  = searchTermSlice.actions;

const dataTypeSlice = createSlice({
  name: 'dataType',
  initialState: 'Repos',
  reducers: {
    setDataType: (state, action) => {
      console.log('Incoming action :', action);
      state =  action.payload || '';
      return state;
    }
  }
})
export const { setDataType }  = dataTypeSlice.actions;

const pageNumberSlice = createSlice({
  name: 'pageNumber',
  initialState: 1,
  reducers: {
    setPageNumber: (state, action) => {
      console.log('Incoming action :', action);
      state =  action.payload || 1;
      return state;
    }
  }
})
export const { setPageNumber }  = pageNumberSlice.actions;

const reducers = combineReducers({
  [githubApiSlice.reducerPath]: githubApiSlice.reducer,
  searchTerm: searchTermSlice.reducer,
  dataType: dataTypeSlice.reducer,
  pageNumber: pageNumberSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Redux persist
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(githubApiSlice.middleware),
})

export let persistor = persistStore(store)
