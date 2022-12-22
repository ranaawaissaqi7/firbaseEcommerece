import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { getDocs,collection } from "firebase/firestore/lite";
import { db } from "../../../config/firebase";
const initialState={
    uid:null,
    userData:[],
    userCardData:[],
    loading:false
}
export const UserUidSlice = createSlice({
  name: 'uid',
  initialState,
  reducers : {
    changeUserUid:(state,action)=>{
        state.uid=action.payload
    },
    addUserData:(state,action)=>{
      state.userData.push(action.payload)
    },
    removeCard:(state,action)=>{
      console.log("action pay ",action.payload)
      state.userCardData=state.userCardData.filter((items)=>items.id!==action.payload)
    }
  },
  
  extraReducers:(builder)=>{
    builder
         .addCase(fetchCards.pending,(state,action)=>{
          state.loading=true;
         })
         .addCase(fetchCards.fulfilled,(state,action)=>{
          state.loading=false;
          state.userCardData=action.payload
         })
         .addCase(fetchCards.rejected,(state,action)=>{
          state.loading=false;
         })
   }


})

// createAysincThunck
export const fetchCards=createAsyncThunk ("cardData/fetch",async(uid)=>{
  let arry=[]
  console.log("store uuid ",uid)
  const querySnapshot = await getDocs(collection(db, `products${uid}`));
  querySnapshot.forEach((doc) => {
    
    // doc.data() is never undefined for query doc snapshots
    console.log("store Data ", doc.id, " => ", doc.data());
    arry.push({...doc.data(),id:doc.id})
    //console.log("ttttt ",typeof(doc.data()))
    //console.log("....aaaa ",arry)
           
  });
  console.log("store arr",arry)
  const userCardData=arry;
    return userCardData;
})

// Action creators are generated for each case reducer function
export const {changeUserUid,addUserData,removeCard} = UserUidSlice.actions

export default UserUidSlice.reducer