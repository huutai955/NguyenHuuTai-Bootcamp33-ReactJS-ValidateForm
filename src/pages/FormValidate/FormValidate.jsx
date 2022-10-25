import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addNewUser, addUserFromLocalStorage, editUser, setUser, updateUser, validateEmail, validateEmpty, validateID, validateName, validatePhone } from '../../redux/reducers/formValidateReducer';
import Table from '../Table/Table';


export default function FormValidate() {
    const { arrUser, user, errUser } = useSelector(state => state.formValidateReducer);
    const dispatch = useDispatch();
    const [userClone, setUserClone] = useState({
        masv: '',
        tensv: '',
        phone: '',
        email: ''
    });

    const handleChange = (e) => {
        let { id, value, name } = e.target;
        let newErrors = { ...errUser }
        let messError = "";
        if (value.toString().trim() === "") {
            messError = name + " không được bỏ trống!!"
        }
        newErrors[id] = messError;
        const actionError = validateEmpty(newErrors)
        dispatch(actionError)
        const action = editUser({
            ...user,
            [id]: value
        })
        dispatch(action)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }


    useEffect(() => {
        if (localStorage.getItem('arrUser')) {
            const arr = JSON.parse(localStorage.getItem('arrUser'));
            const action = addUserFromLocalStorage(arr);
            dispatch(action)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("arrUser", JSON.stringify(arrUser));
    }, [arrUser])

    
    useEffect(() => {
        const action = setUser(userClone);
        dispatch(action)
    }, [arrUser])


    return (
        <div className='container'>
            <form action="" className='form' onSubmit={handleSubmit}>
                <div className="first d-flex">
                    <div className="form-group p-4 w-50">
                        <p>Mã SV</p>
                        <input type="text" className='form-control' id='masv' name='Mã sinh viên ' value={user.masv} onChange={handleChange} />
                        <p className='text-danger m-0'>{errUser.masv}</p>
                    </div>
                    <div className="form-group p-4 w-50">
                        <p>Họ Tên</p>
                        <input type="text" className='form-control' id='tensv' name='Tên sinh viên' value={user.tensv} onChange={handleChange} />
                        <p className='text-danger m-0'>{errUser.tensv}</p>
                    </div>
                </div>
                <div className="second d-flex">
                    <div className="form-group p-4 w-50">
                        <p>Số Điện Thoại</p>
                        <input type="text" className='form-control' id='phone' name='Số điện thoại' value={user.phone} onChange={handleChange} />
                        <p className='text-danger m-0'>{errUser.phone}</p>
                    </div>
                    <div className="form-group p-4 w-50">
                        <p>Email</p>
                        <input type="text" className='form-control' id='email' name='Email' value={user.email} onChange={handleChange} />
                        <p className='text-danger m-0'>{errUser.email}</p>
                    </div>
                </div>
                <div className="form-group">
                    <button className='btn btn-success m-4' onClick={() => {
                        for (let key in errUser) {
                            if (errUser[key] !== '') {
                                alert("Vui lòng nhập đầy đủ thông tin theo đúng yêu cầu!!")
                                return
                            }
                        }

                        for (let key in user) {
                            if (user[key] === "") {
                                alert("Vui lòng nhập đầy đủ thông tin theo đúng yêu cầu!!")
                                return
                            }

                        }

                        for (let key in arrUser) {
                            if (arrUser[key].masv === user.masv) {
                                let newMessage = 'Sinh viên này đã có trong danh sách!!'
                                const action = validateID(newMessage)
                                dispatch(action)
                                return
                            }
                        }

                        const regex = /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/;
                        if (regex.test(user.tensv) !== true) {
                            let newMessage = 'Tên không được chứa số hoặc kí tự đặc biệt!!'
                            const action = validateName(newMessage)
                            dispatch(action)
                            return
                        }

                        let vietnamNumberPhone = /((09|03|07|08|05)+([0-9]{8})\b)/g;
                        if (vietnamNumberPhone.test(user.phone) === false) {
                            let newMessage = 'Số điện thoại không hợp lệ!!';
                            const action = validatePhone(newMessage)
                            dispatch(action)
                            return
                        }

                        let mailformat = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
                        if (mailformat.test(user.email) === false) {
                            let newMessage = 'Email không hợp lệ!!';
                            const action = validateEmail(newMessage)
                            dispatch(action)
                            return
                        }

                        const action = addNewUser(user)
                        dispatch(action);
                    }}>Thêm Sinh Viên</button>
                    <button className='btn btn-primary' onClick={() => {
                        for (let key in errUser) {
                            if (errUser[key] !== '') {
                                alert("Vui lòng nhập đầy đủ thông tin theo đúng yêu cầu!!")
                                return
                            }
                        }

                    
                        const regex = /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/;
                        if (regex.test(user.tensv) !== true) {
                            let newMessage = 'Tên không được chứa số hoặc kí tự đặc biệt!!'
                            const action = validateName(newMessage)
                            dispatch(action)
                            return
                        }

                        let vietnamNumberPhone = /((09|03|07|08|05)+([0-9]{8})\b)/g;
                        if (vietnamNumberPhone.test(user.phone) === false) {
                            let newMessage = 'Số điện thoại không hợp lệ!!';
                            const action = validatePhone(newMessage)
                            dispatch(action)
                            return
                        }

                        let mailformat = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
                        if (mailformat.test(user.email) === false) {
                            let newMessage = 'Email không hợp lệ!!';
                            const action = validateEmail(newMessage)
                            dispatch(action)
                            return
                        }

                        console.log(user)
                        const action = updateUser(user)
                        dispatch(action)
                    }}>Cập Nhật</button>
                </div>
            </form>

            <Table />
        </div>
    )
}
