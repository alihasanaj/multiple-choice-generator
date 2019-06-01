import React from 'react'
import './form.css'


/* 
  Displays the form on the right side of the page
  Input: Title of the Form, Title description , and questions created on the form
  Output: Displays the title, description, and questions and updates them when change on the left
*/
export default function form({title, titleDescription, questions}) {
  return (
    <div>
        <h1 className="mb-5">{title}</h1> 
        <p className="mb-5 formatDescription" >{titleDescription}</p>
        
        {questions.map( q => 
          <div key={q.id} className="mb-4">
            <h5 className="ma-1">{q.QName}</h5>
            <h6 className="ma-1">{q.DName}</h6>
           
              
              {
                q.Options.map( (option, id) => 
                
                <div className="radio ma-1 d-inline-block w-75 " key={id}>
                  <label ><input className="mr-1" type="radio" name={q.id} />{option}</label>
                </div>
              )}
          </div>
        )} 
    </div>
  )
}
