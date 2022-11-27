import { configureStore, createSlice, getDefaultMiddleware } from '@reduxjs/toolkit'

const authSlice = createSlice({
    initialState: {
        user: JSON.parse(localStorage.getItem("user")) || null ,
        loading: false,
        error: null
    },
    name: "auth",
    reducers: {
      loginStart: (state, action) => {
        return {
            user: null,
            loading: true,
            error: null
        };
    },
      loginSuccess: (state, action) => {
        return {
            user: action.payload,
            loading: false,
            error: null
        };
    },
      loginFail: (state, action) => {
        return {
            user: null,
            loading: false,
            error: action.payload
        };
    },
      logout: (state, action) => {
        return {
            user: null,
            loading: false,
            error: null
        };
    }
}
});

export const { loginStart, loginSuccess, loginFail, logout } = authSlice.actions;

const darkModeSlice = createSlice({
    initialState: {
        darkMode: false
    },
    name: "dark-mode",
    reducers: {
        light: (state, action) => { 
            state.darkMode = false 
        },
        dark: (state, action) => { 
            state.darkMode = true
         },
        toggle: (state, action) => { 
            if(state.darkMode){
                state.darkMode = false
            } else{
                state.darkMode = true
            }
         }
    }
});

export const { light, dark, toggle } = darkModeSlice.actions;

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        mode: darkModeSlice.reducer
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false
    })
});