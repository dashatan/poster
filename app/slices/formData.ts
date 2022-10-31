import { createSlice } from "@reduxjs/toolkit";

export interface FormDataSliceInterface {
    post: {key:string,value:string}[]
}

export const initialState: FormDataSliceInterface = {
    post: [
        {key:"category",value:""},
        {key:"title",value:""},
        {key:"description",value:""},
        {key:"images",value:""},
    ]
}; 

export const FormData = createSlice({
    name: "formData",
    initialState,
    reducers: {
        post: (state, action) => {
            state.post = action.payload;
        },
    },
});

export const { post } = FormData.actions;
export default FormData.reducer;
