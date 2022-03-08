import ModalEdit from "./ModalEdit";
import ModalAdd from "./ModalAdd";

import { useContext } from 'react';
import { AppContext } from './AppContext';

const SearchUser = () => {

    const {
        isShowingAddModal,
        isShowingEditModal,
        handleShowAddModal,
        handleHideAddModal,
        handleHideEditModal,
        handleSubmitAddModal,
        handleSubmitEditModal,
        value,
        data,
        modalId,
        handleOnChangeValue,
        handleShowModalAndSetId,
        handleOnClickDeleteUser
     } = useContext(AppContext);

    const selectedData = data.filter(u => u.Name.trim().toLowerCase().includes(value.toLowerCase()))
        .map(user =>
            <tr key={user.Id} >
                <td>{user.Id}</td>
                <td>{user.Name}</td>
                <td>{user.EmailAddress}</td>
                <td><button className="btn btn-danger btn-sm" onClick={() => handleOnClickDeleteUser(user.Id)}>
                    Delete
                </button>
                    <button className="btn btn-warning btn-sm" onClick={() => handleShowModalAndSetId(user.Id)}>
                        Edit
                    </button>
                    <ModalEdit isShowing={isShowingEditModal} modalId={modalId} hide={handleHideEditModal}
                        submit={handleSubmitEditModal} userId={user.Id} userName={user.Name} userEmail={user.EmailAddress} />
                </td>
            </tr>
        )

    return (
        <div className="user">
            <button className="btn btn-success" id="add-user-button" style={{ width: "150px" }} onClick={handleShowAddModal}>Add User</button>
            <ModalAdd isShowing={isShowingAddModal} hide={handleHideAddModal} submit={handleSubmitAddModal} />
            <input style={{ width: "220px", fontSize: "20px" }} type="text" id="search-user-input" value={value} onChange={handleOnChangeValue} maxLength={15} placeholder="Wpisz kogo szukasz..." />
            {value.length > 1 && selectedData.length > 0 ?
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedData}
                    </tbody>
                </table>
                : <h4>Brak danych...</h4>}
        </div>
    )
}
export default SearchUser;