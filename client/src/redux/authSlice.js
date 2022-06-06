import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

export const createUserProfile = createAsyncThunk(
    'profile/create-profile',
    async (userData, thunkAPI) => {
      try {
        return await authService.createUserProfile(userData)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )

export const createAdminProfile = createAsyncThunk(
  'profile/create-admin-profile',
  async (adminData, thunkAPI) => {
    try {
      return await authService.createAdminProfile(adminData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
const initialState = {
    isLoading: false,
    isError: false,
    isLoggedIn: false,
    user: null,
    publicKey:'',
    jwt_token:''
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        setUserPublicKey: (state, action) => {
            state.publicKey = action.payload
        },
        setUserProfile: (state, action)=> {
            state.user = action.payload,
            state.isLoggedIn = true
        },
        setJwtToken: (state, action)=> {
          state.jwt_token = action.payload
        },
        signOutUser: (state)=> {
          state.isLoading= false,
          state.isError= false,
          state.isLoggedIn= false,
          state.user= null,
          state.publicKey='',
          state.jwt_token=''
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createUserProfile.pending, (state, action)=> {
            state.isLoading = true
        })
        builder.addCase(createUserProfile.fulfilled, (state, action) => {
          state.isLoading = false,
          state.user = action.payload,
          state.isLoggedIn = true
        })
        builder.addCase(createUserProfile.rejected, (state, action) => {
            state.isLoading = false,
            state.user = null,
            state.isLoggedIn = false,
            state.isError = true
          })
        builder.addCase(createAdminProfile.pending, (state, action)=> {
            state.isLoading = true
        })
        builder.addCase(createAdminProfile.fulfilled, (state, action) => {
          state.isLoading = false,
          state.user = action.payload,
          state.isLoggedIn = true
        })
        builder.addCase(createAdminProfile.rejected, (state, action) => {
            state.isLoading = false,
            state.user = null,
            state.isLoggedIn = false,
            state.isError = true
          })
      },
})

// Action creators are generated for each case reducer function
export const { setUserProfile, setUserPublicKey, setJwtToken, signOutUser} = authSlice.actions

export default authSlice.reducer