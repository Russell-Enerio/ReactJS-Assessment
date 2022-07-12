import React from 'react'
import '../assets/css/Form.css'
function Form({setName, setEmail, setNumber, submitEdit, submitAdd, setEditId, isEdit, setIsEdit, name, email, number, isEmpty, setIsEmpty}) {
    
    
 

    let numberDigits = number.length
    
  return (
    <>
    <div className="form-container">
        <div className="form-controller">
            { isEdit ? (
            <>
            <form action="" onSubmit={submitEdit}>
                <div className="form__inputController">
                <input type="text" placeholder='Name' value={name} onChange={e => setName(e.target.value)}/>
                <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
                <input type="number" placeholder='Contact Number (11 digits)' value={number} onChange={e => setNumber(e.target.value)}/>
                
                {!name || !email || !number || (numberDigits < 11) ? 
                (
                    <button type='submit' disabled>Update</button>
                ) : (
                    <button type='submit'>Update</button>
                )}

                {/* EDIT Button */}
                <button onClick={() => {
                    setName('')
                    setEmail('')
                    setNumber('')
                    setEditId('')
                    setIsEdit(false)
                }}>Cancel</button>
                </div>
            </form>
            
            </>
            
            
            ) : (

            <>
                <form action="" onSubmit={submitAdd}>
                    <div className="form__inputController">
                        <input type="text" placeholder='Name' value={name} onChange={e => setName(e.target.value)}/>
                        <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
                        <input type="number" placeholder='Contact Number (11 digits)' value={number} onChange={e => setNumber(e.target.value)}/>

                        {!name || !email || !number || (numberDigits < 11) ? 
                        (
                            <button type='submit' disabled>Add</button>
                        ) : (
                            <button type='submit'>Add</button>
                        )}
                    </div>
                </form>
                
            </>
            )}
        </div>
        
    </div>
    <hr/>
    </>
  )
}

export default Form