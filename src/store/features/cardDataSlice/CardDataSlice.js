import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'

const initialState={
    cardData:[],
    loading:false,
}
export const CardDataSlice = createSlice({
  name: 'carddata',
  initialState,
  reducers:{
    removeCard:(state,action)=>{
        state.cardData=state.cardData.filter((items)=>items._id!==action.payload)
    },
},   
  extraReducers:(builder)=>{
      builder
           .addCase(fetchCardData.pending,(state,action)=>{
            state.loading=true;
           })
           .addCase(fetchCardData.fulfilled,(state,action)=>{
            state.loading=false;
            state.cardData=action.payload
           })
           .addCase(fetchCardData.rejected,(state,action)=>{
            state.loading=false;
           })
  }



})

// createAysincThunck
export const fetchCardData=createAsyncThunk ("cardData/fetch",async(userEmail)=>{
  console.log("USER STORE UIDEEEE ",userUid)
    const res= await fetch(`http://localhost:8000/getCardDetail/${userEmail}`);
    const cardData=await res.json();
    return cardData;
})
// Action creators are generated for each case reducer function
export const {removeCard} = CardDataSlice.actions

export default CardDataSlice.reducer