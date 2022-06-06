import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import adminService from './adminService'

export const getAllAdmins = createAsyncThunk(
    'admin/get-admins',
    async (userData, thunkAPI) => {
      try {
        return await adminService.getAllAdmins(userData)
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

export const approveAdmin = createAsyncThunk(
    'admin/approve-admin',
    async (userData, thunkAPI) => {
      try {
        return await adminService.approveAdmin(userData)
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

export const approveGuideAdmin = createAsyncThunk(
  'admin/approve-guide-admin',
  async (userData, thunkAPI) => {
    try {
      return await adminService.approveGuideAdmin(userData)
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


export const rejectAdmin = createAsyncThunk(
    'admin/reject-admin',
    async (userData, thunkAPI) => {
      try {
        return await adminService.rejectAdmin(userData)
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

export const approveProfileUpdate = createAsyncThunk(
  'admin/approve-admin',
  async (userData, thunkAPI) => {
    try {
      return await adminService.approveProfileUpdate(userData)
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
    admins: null
}

export const adminSlice = createSlice({
    name:"admins",
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(getAllAdmins.pending, (state, action)=> {
            state.isLoading = true
        })
        builder.addCase(getAllAdmins.fulfilled, (state, action) => {
          state.isLoading = false,
          state.admins = action.payload
        })
        builder.addCase(getAllAdmins.rejected, (state, action) => {
            state.isLoading = false,
            state.admins = null,
            state.isError = true
          })
      },
})

// Action creators are generated for each case reducer function
export const { } = adminSlice.actions

export default adminSlice.reducer