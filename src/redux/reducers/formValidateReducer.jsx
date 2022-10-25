import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  arrUser: [],
  user: {
    masv: '',
    tensv: '',
    phone: '',
    email: ''
  },
  errUser: {
    masv: '',
    tensv: '',
    phone: '',
    email: ''
  },
  searchingArrayUser: [

  ]
}

const formValidateReducer = createSlice({
  name: 'formValidateReducer',
  initialState,
  reducers: {
    addNewUser: (state, action) => {
      state.user = action.payload
      state.arrUser.push(state.user)
    },
    deleteUser: (state, action) => {
      const maSV = action.payload;
      state.arrUser = state.arrUser.filter((user) => {
        return user.masv !== maSV
      })
    },
    addUserFromLocalStorage: (state, action) => {
      state.arrUser = [...action.payload]
    },
    editUser: (state, action) => {
      state.user = action.payload
    },
    updateUser: (state, action) => {

      const newUser = action.payload;
      const index = state.arrUser.findIndex((user) => {
        return user.masv === newUser.masv
      })
      if (index !== -1) {
        state.arrUser[index] = { ...newUser };
      } else {
        alert("Người dùng không có trong danh sách.Vui lòng kiểm tra lại!!")
      }


    },
    findUser: (state, action) => {
      function removeAccents(str) {
        var AccentsMap = [
          "aàảãáạăằẳẵắặâầẩẫấậ",
          "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
          "dđ", "DĐ",
          "eèẻẽéẹêềểễếệ",
          "EÈẺẼÉẸÊỀỂỄẾỆ",
          "iìỉĩíị",
          "IÌỈĨÍỊ",
          "oòỏõóọôồổỗốộơờởỡớợ",
          "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
          "uùủũúụưừửữứự",
          "UÙỦŨÚỤƯỪỬỮỨỰ",
          "yỳỷỹýỵ",
          "YỲỶỸÝỴ"
        ];
        for (var i = 0; i < AccentsMap.length; i++) {
          var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
          var char = AccentsMap[i][0];
          str = str.replace(re, char);
        }
        return str;
      }

      const newArrUser = []
      for (var i = 0; i < state.arrUser.length; i++) {
        if (removeAccents(state.arrUser[i].tensv).search(action.payload) !== -1) {
          newArrUser.push(state.arrUser[i]);
        }
        console.log(removeAccents(state.arrUser[i].tensv));
      }
      console.log(newArrUser)
      state.searchingArrayUser = [...newArrUser]
    },
    validateEmpty: (state, action) => {
      state.errUser = action.payload
    },
    validateID: (state, action) => {
      state.errUser.masv = action.payload
    },
    validateName: (state, action) => {
      state.errUser.tensv = action.payload
    },
    validatePhone: (state, action) => {
      state.errUser.phone = action.payload
    },
    validateEmail: (state, action) => {
      state.errUser.email = action.payload
    },
    // Reducer này em dùng để bắt trường hợp khi ta thêm 1 user mới vào mảng thì 
    // searchingArrayUser sẽ bị clear để mảng arrUser hiển thị ra UI cho người dùng 
    changeArrUser: (state, action) => {
      state.searchingArrayUser = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
    }
  }
});

export const { setUser, changeArrUser, validateEmail, validatePhone, validateName, addNewUser, deleteUser, addUserFromLocalStorage, editUser, updateUser, findUser, validateEmpty, validateID } = formValidateReducer.actions

export default formValidateReducer.reducer