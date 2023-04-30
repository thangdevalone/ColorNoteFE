import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userApi from '../../api/userApi';
import StorageKeys from '../../constants/storage-keys.js';
export const register = createAsyncThunk(
  'user/register',
  async (payload) => {
    await userApi.register(payload)

    //save local storages 



  }
)
export const login = createAsyncThunk(
  'user/login',
  async (payload) => {
    const data = await userApi.login(payload)

    //save local storages 
    localStorage.setItem(StorageKeys.TOKEN, JSON.stringify(data.jwt));
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

    return {...data.user,jwt:data.jwt};
  }
)

export const refresh = createAsyncThunk(
  'user/refresh',
  async () => {
    const rs = await userApi.refresh()

    //save local storages 
    localStorage.setItem(StorageKeys.TOKEN, rs.access_token);

    return rs.access_token;
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    setting: {},
  },
  reducers: {
    logOut(state) {
      // clear local storage
      localStorage.removeItem(StorageKeys.USER)
      localStorage.removeItem(StorageKeys.TOKEN)

      // set state
      state.current = {}
    },
    Update(state, action) {
      const clone = { ...state.current, ...action.payload }
      localStorage.setItem(StorageKeys.USER, JSON.stringify(clone));
      state.current = clone
    }
  },
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.current = action.payload
      })
      .addCase(login.fulfilled, (state, action) => {
        state.current = action.payload
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.current.jwt = action.payload
      });
}
});

const { actions, reducer } = userSlice
export const { logOut, Update } = actions
export default reducer; 