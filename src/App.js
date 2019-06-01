import React, { Component } from 'react';
import './App.css';
import Form from './components/Form/form';
import Question from './components/question';

// State stores the title and description and also the count of the number of questions created and a array of question objects
class App extends Component {

  constructor() {
    super()
    this.state = {
        title: "",
        titleDescription: "",
        count: 0,
        questions: [
          
        ]
        
    }
}

  // Update the state of title on change of the title input field to update the form on the right side
  onTitleChange = (event) => {
    this.setState({ title: event.target.value });
  }


  // Update the state of titleDescription on change of the description input field to update the form on the right side
  onDescriptionChange = (event) => {
    this.setState({ titleDescription: event.target.value });
  }


  /* 
   Create a new question object and insert in the array of questions object
   Each question will have an Id using the count property in the state incremented for each question created
   Each question has its own question name and description and have an option input (OInput) that refs its input field in the question.js file
   Options is an array of options radio button to creat on the form side of the page 
   */
  addQuestion = () => {
      this.setState({  
        count: this.state.count+1,
        questions: [...this.state.questions, 
          {
            id: this.state.count,
            QName: "",
            DName: "",
            OInput: "",
            Options: []
          }]
      })
    
  }

  // Called on each time the question title of a specific question is changed its 
  // given the id and the event info to update on the form side
  changeQuestionTitle = (id, event) => {
        let newQuestions = this.state.questions;
        newQuestions[id].QName = event.target.value;
        this.setState({
          questions: newQuestions
        })
  }

  
  // Called on each time the question description of a specific question is changed its 
  // given the id and the event info to update on the form side
  changeQuestionDesc = (id, event) => {
    let newQuestions = this.state.questions;
    newQuestions[id].DName = event.target.value;
    this.setState({
      questions: newQuestions
    })
}

  // Allows for the "Enter" key to be used to submit a question option given the id of the question
  // It will find the question and push the new option into the option array
  onQuestionOptionEnter = (id, event) => {
    if (event.key === 'Enter' && event.target.value.length > 0 ){
      let newQuestions = this.state.questions;
      newQuestions[id].Options.push(event.target.value);
      this.setState({
        questions: newQuestions
      })
      event.target.value = "";
  }
  }


  // Get the question id and the option id so we can find it and delete it
  // Uses splice to remove that specific value from the array
  onQuestionOptionDelete = (questionID, optionID) => {
      let newQuestions = this.state.questions;
      newQuestions[questionID].Options.splice(optionID, 1);
      this.setState({
        questions: newQuestions
      })
  }
  
  // Save the current options field to Option Input (OInput) using referenece on the question.js file for each questions to allow users
  // To sumbit options using 'Enter' key and the Add Option button
  onQuestionOptionChange = (id, event) => {
    let newQuestions = this.state.questions;
    newQuestions[id].OInput = event.target.value;
    this.setState({
      questions: newQuestions
    })
  }

  // Same as the about function just using the reference of OInput to add when the Add Option button is clicked
  onQuestionOptionButton = (id, input) => {
    if (input.value.length > 0) {
        let newQuestions = this.state.questions;
        newQuestions[id].Options.push(input.value);
        input.value = "";
        this.setState({
          questions: newQuestions
        })
    }
  }

  // Find and delete the button with the id given
  onQuestionDeleteButton = (id) => {
    let newQuestions = this.state.questions;
    let questionPositionDelete = newQuestions.findIndex( 
      (question) => {
        return question.id === id
      }
    );
    newQuestions.splice(questionPositionDelete, 1);
    this.setState({
      questions: newQuestions
    })
  }

  

  render() {
    const {title, titleDescription, questions, count } = this.state;

    return (
      <div>
      <h1 className="mt-4 text-center title">Basic Multiple Choice Generator</h1>
        <div className="row"> 
          <div className="col-md-6 ">
                <form>
                <div className="shadow p-3 mb-5 bg-white rounded">
                  <div className="form-group">
                    <input className="form-control" id="Title" placeholder="Title" onChange={this.onTitleChange}/>  
                  </div>

                  <div className="form-group">
                    <textarea className="form-control" id="Description" rows="5" placeholder="Form Description" onChange={this.onDescriptionChange}></textarea>
                  </div>
                </div>
                </form>
                
                {
                  // Pass all of the functions to the question component so they can update the state and the form component can grab the state changes and update the form side
                }
                {
                  count > 0 ? 
                    <Question 
                      display={questions} 
                      changeQuestionTitle={this.changeQuestionTitle}  
                      changeQuestionDesc={this.changeQuestionDesc} 
                      onQuestionOptionEnter={this.onQuestionOptionEnter} 
                      onQuestionOptionDelete={this.onQuestionOptionDelete}
                      onQuestionOptionChange={this.onQuestionOptionChange}
                      onQuestionOptionButton={this.onQuestionOptionButton}
                      OInput={this.state.OInput}
                      onQuestionDeleteButton={this.onQuestionDeleteButton}
                    />
                  :
                  <div></div> 
                }
                

                <button type="button" className="btn btn-info" onClick={this.addQuestion}> ADD QUESTION </button>


          </div>
            {
              // Display the form of the right side 
            }
            <div className="col-md-6 ">
                <Form title={title}  titleDescription={titleDescription} questions={questions} />
            </div>
      </div>
    </div>
    );
  }
}

export default App;
