import { createContext } from 'react';
import { useState } from 'react';
import React, { useEffect } from 'react';

export const AppContext = createContext();

const AppProvider = ({children, isActiveHeaderUnderline}) => {

    const [isShowingAddModal, setIsShowingAddModal] = useState(false);
    const [isShowingEditModal, setIsShowingEditModal] = useState(false);
    const [value, setValue] = useState('');
    const [data, setData] = useState([]);
    const [modalId, setModalId] = useState(null);

    const handleShowAddModal = () => {
        setIsShowingAddModal(true)
    }
    const handleHideAddModal = () => {
        setIsShowingAddModal(false)
    }
    const handleShowEditModal = () => {
        setIsShowingEditModal(true)
    }
    const handleHideEditModal = () => {
        setIsShowingEditModal(false)
    }

    const handleSubmitAddModal = (event) => {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'users/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name: event.target.Name.value.trim(),
                EmailAddress: event.target.EmailAddress.value.trim()
            })
        })
            .then(res => res.json())
            .then(result => {
                alert(result);
            },
                error => {
                    alert('Failed');
                    console.log(error)
                })
           //setIsShowingAddModal(false);
           updateData()
    }

    const handleSubmitEditModal = (event) => {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'users/' + event.target.UserId.value, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Id: event.target.UserId.value,
                Name: event.target.Name.value,
                EmailAddress: event.target.EmailAddress.value
            })
        })
            .then(res => res.json())
            .then(result => 
                //{alert(result);},
                null,
                error => {
                    alert('Failed');
                    console.log(error)
                })
                setIsShowingEditModal(false)
                updateData()
    }

    const handleOnChangeValue = (e) => {
        setValue(e.target.value.trim())
        updateData()
    }
    const updateData = () => {
        fetch(process.env.REACT_APP_API + 'users')
            .then(response => response.json())
            .then(resp => {
                setData(resp)
            },
                err => console.log(`Error ${err}`)
            )
        //.catch(err => console.log(`Error ${err}`))
    }
    //pozwala wyświetlić modal z konkretnym Id do edycji użytkownika
    const handleShowModalAndSetId = (id) => {
        handleShowEditModal()
        setModalId(id)
    }

    const handleOnClickDeleteUser = (id) => {
        if (window.confirm('Are you sure?')) {
            fetch(process.env.REACT_APP_API + 'users/' + id, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            //aktualizuje tabelę po usunięcu użytkownika
            setData(data.filter(user => user.Id !== id))
        }
    }
    //console.log(data);
    //aktualizuje dane po dodaniu i edycji użytkownika
    useEffect(() => {
        console.log("Zamontowano...")
        return () => {
            updateData();
            console.log("Aktualizacja danych...")
        }
    }, [isShowingEditModal, isShowingAddModal, isActiveHeaderUnderline])
    
  return(
    <AppContext.Provider value={{ 
        isShowingAddModal,
        isShowingEditModal,
        value,
        data,
        modalId,
        handleShowAddModal, 
        handleHideAddModal, 
        handleHideEditModal,
        handleSubmitAddModal,
        handleSubmitEditModal,
        handleOnChangeValue,
        handleShowModalAndSetId,
        handleOnClickDeleteUser,
        }}>
      {children}
    </AppContext.Provider>
  )
    
};
export default AppProvider;