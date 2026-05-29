import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ModalState {
  isOpen: boolean;
  initialMode: 'login' | 'signup';
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    initialMode: 'login',
  } as ModalState,
  reducers: {
    openModal: (state, action: PayloadAction<'login' | 'signup' | undefined>) => {
      state.isOpen = true;
      state.initialMode = action.payload ?? 'login';
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer