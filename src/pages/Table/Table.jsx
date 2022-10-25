// eslint-disable-next-line
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeArrUser, deleteUser, editUser, findUser } from '../../redux/reducers/formValidateReducer';

export default function Table() {
    const { arrUser, searchingArrayUser } = useSelector(state => state.formValidateReducer);
    const dispatch = useDispatch();
    const removeAccents = (str) => {
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

    let noAccentsValue = ''
    const handleChange = (e) => {
        let { value } = e.target;
        noAccentsValue = removeAccents(value);
        const action = findUser(noAccentsValue)
        dispatch(action);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const action = findUser(noAccentsValue)
        dispatch(action);
    }


    useEffect(() => {
        const action  = changeArrUser([]);
        dispatch(action)
        // eslint-disable-next-line
    }, [arrUser])
    return (
        <>
            <form className='form mb-4 d-flex' onSubmit={handleSubmit}>
                <input type="text" className='form-control me-4' style={{ width: 400 }} onInput={handleChange} />
                <button className='btn btn-dark'>Search</button>
            </form>
            <table className="table">
                <thead>
                    <tr className='bg-dark text-white'>
                        <th>Mã SV</th>
                        <th>Họ Tên</th>
                        <th>Số Điện Thoại</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {searchingArrayUser.length > 0 ? searchingArrayUser.map((user, index) => {
                        return <tr key={index} >
                            <td>{user.masv}</td>
                            <td>{user.tensv}</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                            <td>
                                <button className='btn btn-danger  me-2' onClick={() => {
                                    const action = deleteUser(user.masv);
                                    dispatch(action)
                                }}>Del</button>
                                <button className='btn btn-primary' onClick={() => {
                                    const action = editUser(user)
                                    dispatch(action)
                                }}>Edit</button>
                            </td>
                        </tr>
                    }) : arrUser.map((user, index) => {
                        return <tr key={index} >
                            <td>{user.masv}</td>
                            <td>{user.tensv}</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                            <td>
                                <button className='btn btn-danger  me-2' onClick={() => {
                                    const action = deleteUser(user.masv);
                                    dispatch(action)
                                }}>Del</button>
                                <button className='btn btn-primary' onClick={() => {
                                    const action = editUser(user)
                                    dispatch(action)
                                }}>Edit</button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </>
    )
}
