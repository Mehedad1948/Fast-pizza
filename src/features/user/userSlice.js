import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';

const initialState = {
  userName: '',
  phoneNimber: '',
  address: '',
  addressStaus: '',
  isAuthenticated: false,
  userId: 1,
};

const localPosition = new Promise( function (resolve, reject){
  navigator.geolocation.getCurrentPosition(resolve, reject)
})

export const fetchAddress = createAsyncThunk(
  'user/fetchAddress',
  async function name() {
    console.log('fetch called');
    const position = await localPosition
    const latitude = position.latitude 
    const longitude = position.longitude 

    const addressObj = await getAddress(latitude, longitude)
    console.log(addressObj);
    const address = `${addressObj?.city}, ${addressObj?.locality}`

    return address
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName(state, action) {
      state.userName = action.payload;
      state.isAuthenticated = true
    },
    setPhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },
    setAddress(state, action) {
      state.address = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddress.fulfilled, (state, action)=> {
      state.address = action.payload
      state.addressStaus = 'idle'
    })
    builder.addCase(fetchAddress.pending, (state, action)=> {
      state.addressStaus = 'pending'
    })
    builder.addCase(fetchAddress.rejected, (state, action)=> {
      state.addressStaus = 'rejected'
    })
  }
});

export default userSlice.reducer;

export const { setName, setPhoneNumber, setAddress } = userSlice.actions;
