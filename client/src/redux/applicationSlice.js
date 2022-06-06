import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import applicationService from './applicationService'
import {ethers} from 'ethers'

export const getApplications = createAsyncThunk(
    'app/get-applications',
    async (_key, thunkAPI) => {
      try {
        return await applicationService.getApplications(_key)
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

export const applyApplication = createAsyncThunk(
    'app/apply-application',
    async (data, thunkAPI) => {
      try {
        return await applicationService.applyApplication(data)
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

  export const withdrawApplication = createAsyncThunk(
    'app/apply-application',
    async (key, thunkAPI) => {
      try {
        return await applicationService.withdrawApplication(key)
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

export const rejectApplication = createAsyncThunk(
    'app/reject-application',
    async (data, thunkAPI) => {
      try {
        return await applicationService.rejectApplication(data)
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

export const approveApplication = createAsyncThunk(
    'app/approve-application',
    async (data, thunkAPI) => {
      try {
        return await applicationService.approveApplication(data)
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
    applications: {}
}

export const applicationSlice = createSlice({
    name:"applications",
    initialState,
    reducers: {
        refreshApplicationState: (state, action)=> {
            state.applications = {}
            state.isError = false,
            state.isLoading = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getApplications.pending, (state, action)=> {
            state.isLoading = true
        })
        builder.addCase(getApplications.fulfilled, (state, action) => {
            const key = Object.keys(action.payload)
            if(!state.applications.hasOwnProperty(key[0])){

                console.log('action,',action.payload)
                const {payload} = action
                console.log({payload})
                console.log("key", key[0])
                // console.log("app", state.applications)
                state.applications = {...state.applications, ...payload},
                state.isLoading = false,
                state.isError = false
            } else {
                console.log('already exists')
            }
        })
        builder.addCase(getApplications.rejected, (state, action) => {
            state.isLoading = false,
            state.applications ={},
            state.isError = true
          })
        builder.addCase(applyApplication.pending, (state, action)=> {
            state.isLoading = true
        })
        builder.addCase(applyApplication.fulfilled, (state, action) => {
            console.log('applications',action.payload )
          state.isLoading = false,
          state.isError = false
        })
        builder.addCase(applyApplication.rejected, (state, action) => {
            state.isLoading = false,
            state.isError = true
          })
      },
})

// Action creators are generated for each case reducer function
export const {refreshApplicationState } = applicationSlice.actions

export default applicationSlice.reducer