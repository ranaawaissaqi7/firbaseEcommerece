import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
const initialState={
    apiData:[],
    loading:false,
    error:{}
}
export const ApiDataSlice = createSlice({
  name: 'apiData',
  initialState,

  extraReducers:(builder)=>{
      builder
           .addCase(fetchApiData.pending,(state,action)=>{
            state.loading=true;
           })
           .addCase(fetchApiData.fulfilled,(state,action)=>{
            state.loading=false;
            state.apiData=action.payload
           })
           .addCase(fetchApiData.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
           })
  }
})

// createAysincThunck
export const fetchApiData=createAsyncThunk ("apiData/fetch",async()=>{
    const res= await fetch("https://fakestoreapi.com/products");
    const apiData=await res.json();
    return apiData;
})
// Action creators are generated for each case reducer function
export const {} = ApiDataSlice.actions

export default ApiDataSlice.reducer