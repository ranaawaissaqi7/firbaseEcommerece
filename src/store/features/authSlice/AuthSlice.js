import { createSlice } from "@reduxjs/toolkit";
const initialState={
    authStateChange:false,
    userEmail:null
}
export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers : {
    authState:(state,action)=>{
        state.authStateChange=action.payload
    },
    getUserEmail:(state,action)=>{
      state.userEmail=action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const {authState,getUserEmail} = AuthSlice.actions

export default AuthSlice.reducer