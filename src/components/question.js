import React from 'react'

// All components passed from the above App.js file are used to update the state in the App.js file
export default function question({
    display, 
    changeQuestionTitle, 
    changeQuestionDesc, 
    onQuestionOptionEnter, 
    onQuestionOptionDelete, 
    onQuestionOptionChange, 
    onQuestionOptionButton, 
    OInput, 
    onQuestionDeleteButton
}) 
  {
  return (
    <div>
      {display.map( question => 
        <div className="shadow p-3 mb-5 bg-white rounded" key={question.id}>
                        <div className="form-group">
                        <input 
                          className="form-control mb-2"  
                          placeholder="Question" 
                          onChange={(event) => {changeQuestionTitle(question.id , event)}} 
                        /> 
                        <input 
                          className="form-control mb-2"  
                          placeholder="Question Description (Optional)" 
                          onChange={(event) => {changeQuestionDesc(question.id , event)}} 
                        />

                        <input 
                          className="form-control mb-2"  
                          placeholder="Add options" 
                          onKeyPress={(event) => {onQuestionOptionEnter(question.id , event)}} 
                          onChange={(event) => {onQuestionOptionChange(question.id, event)}}
                          ref={question => OInput = question }
                        /> 
                        
                        {question.Options.map( (option, id) => 
                          <div className="input-group w-50 ml-5 mb-2" key={id}>
                            <input type="text" className="form-control " value={option}  style={{cursor: 'default'}} readOnly  />
                            <div className="input-group-append" >
                              <button className="btn btn-outline-secondary" type="button" onClick={(event) => {onQuestionOptionDelete(question.id, id)}} ><i className="fa fa-trash"></i></button>
                            </div>
                          </div>
                        )}
                        
                      </div>
                      <button type="button" className="btn btn-info mr-2" onClick={() => onQuestionOptionButton(question.id, OInput)}>ADD OPTION</button>
                      <button type="button" className="btn btn-danger" onClick={() => onQuestionDeleteButton(question.id)} >DELETE QUESTION</button>
        </div>
        )}
    </div>
    
        

  )
}


