import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import BackButton from '../Component/BackButton'
import '../assets/css/Contact.css'
function Contact() {

    const [contactDetails, setContactDetails] = useState({})
    const {id} = useParams()
    // destructured the useParams into {id}

    //GET the data from DB
    useEffect(() => {
    fetch(`https://reactjs-assessment-ccd2a-default-rtdb.firebaseio.com/contact-list/${id}.json`).then(res => res.json()).then(userData => {
        // console.log(userData)
        setContactDetails(userData)
    })
    }, [])
    console.log(contactDetails)


  return (

    <div>
        {contactDetails ? (
          
          <div className="contact-details">
            
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <h2>{contactDetails.displayName}</h2>

                        </div>
                        <hr/>
                        <div className="card-text-container"> 
                            <div className="card-text"><p>ID: {id}</p></div>
                            <div className="card-text"><p>Email: {contactDetails.email}</p></div>
                            <div className="card-text"><p>Contact Number: {contactDetails.number}</p></div>
                        </div>
                        <BackButton />
                    </div>
                    
                </div>
                

                  

        </div>
        ) : (
          <div className="contact-error">
          <h1>No contact found</h1>
          <BackButton />
          </div>
        )}
    </div>
    
  )

}

export default Contact
