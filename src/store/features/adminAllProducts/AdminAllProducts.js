import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { getDocs,collection,deleteDoc,doc } from "firebase/firestore/lite";
import { useEffect } from "react";
import { db } from "../../../config/firebase";
const initialState={
    adminProducts:[],
    loading:false
}
export const AdminAllProducts = createSlice({
  name: 'admin',
  initialState,
  reducers : {
    removeAdminCard:(state,action)=>{
      console.log("action pay ",action.payload)
      state.adminProducts=state.adminProducts.filter((items)=>items.id!==action.payload)
    },
    removeAdminCardf:(state,action)=>{
        //console.log("admin....",state.adminProducts)
      //  console.log("adminProd.. ",state)
      console.log("id",action.payload)
        deleteDoc(doc(db, "allProducts", action.payload));
        state.adminProducts=state.adminProducts.filter((items)=>items.id!==action.payload)
      }
  },
  
  extraReducers:(builder)=>{
    builder
         .addCase(fetchAdminCard.pending,(state,action)=>{
          state.loading=true;
         })
         .addCase(fetchAdminCard.fulfilled,(state,action)=>{
          state.loading=false;
          state.adminProducts=action.payload
         })
         .addCase(fetchAdminCard.rejected,(state,action)=>{
          state.loading=false;
         })
   }


})

// createAysincThunck
export const fetchAdminCard=createAsyncThunk ("cardData/fetch",async()=>{
  let arry=[]
  
  const querySnapshot = await getDocs(collection(db, `allProducts`));
  querySnapshot.forEach((doc) => {
    
    // doc.data() is never undefined for query doc snapshots
    console.log("store Data ", doc.id, " => ", doc.data());
    arry.push({...doc.data(),id:doc.id})
    //console.log("ttttt ",typeof(doc.data()))
    //console.log("....aaaa ",arry)
           
  });
  console.log("store arr",arry)
  const AdminAllProducts=arry;
    return AdminAllProducts;
})

// Action creators are generated for each case reducer function
export const {removeAdminCard,removeAdminCardf} = AdminAllProducts.actions

export default AdminAllProducts.reducer