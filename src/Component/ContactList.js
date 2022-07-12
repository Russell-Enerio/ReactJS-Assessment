import React, {useState, useEffect} from 'react'
import { db } from '../Firebase/firebase'
import { onValue, ref } from 'firebase/database'
// import { Link } from 'react-router-dom'
import TableBodyComponent from './TableBody'
import Form from './Form'
import Swal from 'sweetalert2'
function ContactList() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [editId, setEditId] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const [contactsList, setContactsList] = useState([])
    const [tableId, setTableId] = useState('')

    //ADD
    const addHandler = (e) => {
        e.preventDefault()

        fetch(`https://reactjs-assessment-ccd2a-default-rtdb.firebaseio.com/contact-list.json` , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                
                displayName: name,
                email: email,
                number: number
                }
            )
        }).then(res => res.json()).then((convertedData) => {
            console.log(convertedData)
            const pushData = {
                key: convertedData.name,
                
                name: name,
                email: email,
                number: number
                }
            setContactsList([...contactsList, pushData])

            Swal.fire({
                icon: 'success',
				title: 'Contact has been added successfully'
            
            })
            
        }).catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong'

            })
        })
        setName('')
        setEmail('')
        setNumber('')
        setIsEmpty(true)
    }

    // GET/READ Data from DB

        //If firebase custom request is used
        // useEffect(() => {
            
        //     onValue(ref(db, "contact-list"), (snapshot) => {
        //         setContactsList([])
        //         const jsonData = snapshot.val()
        //         const tempArr = []
        //         // console.log(jsonData)
                
        //             for (const objKey in jsonData) {
                        
        //                 tempArr.push({
                            
        //                     key: objKey,
        //                     id: jsonData[objKey].id,
        //                     name: jsonData[objKey].displayName,
        //                     email: jsonData[objKey].email,
        //                     number: jsonData[objKey].number
                       
        //                     })
        //                 console.log(jsonData)
        //                 setContactsList(tempArr)
        //                 console.log(tempArr)
        //             }
        //     }) //end of onValue
        // }, []) //end of useEffect



        useEffect (() => {
            setContactsList([])
            fetch(`https://reactjs-assessment-ccd2a-default-rtdb.firebaseio.com/contact-list.json`).then(res => res.json()).then(jsonData => {
                 
                let tempArr = []
                for (const objKey in jsonData) {
                    
                                    tempArr.push({
                                        
                                        key: objKey,
                                        // id: jsonData[objKey].id,
                                        name: jsonData[objKey].displayName,
                                        email: jsonData[objKey].email,
                                        number: jsonData[objKey].number
                                   
                                        })
                                    setContactsList(tempArr)
                                    console.log(tempArr)
                                }
            })
            
        }, [])






        //DELETE

        const handleDelete = (listdata) => {
            console.log(listdata.key) //resulsts in getting the key
            //when delete button is clicked, this will trigger the sweet alert prompt.
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {

            if (result.isConfirmed) {
                console.log(listdata.key)
                fetch(`https://reactjs-assessment-ccd2a-default-rtdb.firebaseio.com/contact-list/${listdata.key}.json`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json()).then(response => {
                    setContactsList(prevState => {
                        return prevState.filter((item) => {
                            return item.key !== listdata.key
                        })
                    })
                    Swal.fire(
                        'Deleted!',
                        'Contact has been deleted.',
                        'success'
                      )
                }).catch(error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Something went wrong'
    
                    })
                })
            }

          })
        };

        //ORIG Version before implementing sweet alert

        // const handleDelete = (listdata) => {
        //     console.log(listdata.key) //resulsts in getting the key
            
        //     fetch(`https://reactjs-assessment-ccd2a-default-rtdb.firebaseio.com/contact-list/${listdata.key}.json`, {
        //         method: 'DELETE',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     }).then(res => res.json()).then(response => {
        //         // console.log(response)
        //         // alert('deleted')
        //     }).catch(error => {
        //         Swal.fire({
        //             icon: 'error',
		// 			title: 'Something went wrong'

        //         })
        //     })
        //   };



        //UPDATE

        const handleUpdate = (listdata) => {
            
            setIsEdit(true);
            setIsEmpty(false)
            setName(listdata.name);
            setEmail(listdata.email);
            setNumber(listdata.number)
            setEditId(listdata.key)
            
            setTableId(listdata.id)
            
          };


        const submitEdit = (e) => {
            
            e.preventDefault()
            fetch(`https://reactjs-assessment-ccd2a-default-rtdb.firebaseio.com/contact-list/${editId}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        // id: tableId,
                        displayName: name,
                        email: email,
                        number: number
                    }
                )
            }).then(res => res.json()).then(response => {
                setContactsList((prevState) => {
                    const newState = JSON.parse(JSON.stringify(prevState))
                    //prevState(from DB) is immutable. Need to stringify and parse it to make a new copy
                    let index = newState.findIndex((item) => {
                    //
                        console.log(item)
                        return item.key === editId
                        //returns index
                })
                    const updateData = {
                        key: editId,
                        // id: tableId,
                        name: name,
                        email: email,
                        number: number
                    }
                    newState[index] = updateData
                    return newState
                })
                Swal.fire({
                    icon: 'success',
					title: 'Contact has been updated'

                })
            }).catch(error => {
                Swal.fire({
                    icon: 'error',
					title: 'Something went wrong'

                })
            })

                setName('')
                setEmail('')
                setNumber('')
                setEditId('')
                setIsEdit(false)
                setIsEmpty(true)
                setTableId('')
          };
        
          
        
        


  return (
    <div>

        <Form 
        setName={setName} 
        setEmail={setEmail}
        setNumber={setNumber}
        submitEdit={submitEdit}
        submitAdd={addHandler}
        setEditId={setEditId}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        setIsEmpty={setIsEmpty}
        isEmpty={isEmpty}
        name={name}
        email={email}
        number={number}
        />

        <TableBodyComponent tableData={contactsList} handleUpdate={handleUpdate} handleDelete={handleDelete}/>  
        
    </div>
  )
}

export default ContactList
