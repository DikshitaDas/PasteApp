import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: (() => {
    try {
      return JSON.parse(localStorage.getItem("pastes")) || [];
    } catch (e) {
      console.error("Failed to parse 'pastes' from localStorage:", e);
      return [];
    }
  })(),
};

export const pasteSlice = createSlice({
  name: "pastes",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste Created Successfully");
    },
    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item)=>item._id===paste._id)

      if(index>=0){
        state.pastes[index] =paste
        localStorage.setItem("pastes", JSON.stringify(state.pastes))

        toast.success("Paste Updated")
      }

    },
    resetAllPastes: (state) => {
      state.pastes=[]
      localStorage.removeItem("pastes")
    },
    removeFromPastes: (state, action) => {
      const { _id } = action.payload; // Destructure _id from payload
      const index = state.pastes.findIndex((item) => item._id === _id); // Use _id to find
    
      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Deleted");
      }
    }
    
  },
});

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;
