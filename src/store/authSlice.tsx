import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
  isAuth: boolean
  biometricAuthAvailable: boolean
}

const initialState: AuthState = {
  isAuth: false,
  biometricAuthAvailable: false
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state) => {
      state.isAuth = true
    },
    setUnauth: (state) => {
      state.isAuth = false
    },
    setBiometricAuthAvailable: (state, action: PayloadAction<boolean>) => {
      state.biometricAuthAvailable = action.payload
    }
  }
})

export const { setAuth, setUnauth, setBiometricAuthAvailable } =
  authSlice.actions
export default authSlice.reducer
