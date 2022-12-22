import { configureStore } from '@reduxjs/toolkit'
import ApiDataReducer from "./features/apiDataSlice/ApiDataSlice";
import AuthReducer from "./features/authSlice/AuthSlice";
import CardDataReducer from "./features/cardDataSlice/CardDataSlice"
import UserUidReducer from "./features/userUidSlice/UserUidSlice"
import AdminAllProductsReducer from "./features/adminAllProducts/AdminAllProducts"
export const store = configureStore({
  reducer: {
    apiData:ApiDataReducer,
    auth:AuthReducer,
    carddata:CardDataReducer,
    uid:UserUidReducer,
    admin:AdminAllProductsReducer
  },
})

