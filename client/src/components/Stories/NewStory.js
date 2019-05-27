import React from 'react'
import axios from '../../config/axios'
 import FormStory from  './FormStory'

class NewStory extends React.Component {
    constructor(props) {
        super(props)
        // this.state = {
        //     body :''
        // }
       this.handleformSubmit = this.handleformSubmit.bind(this)
     //  this.onChange = this.onChange.bind(this)
   }
    handleformSubmit(formData) {
      //  formData.body = this.state.body
         console.log("new form",formData)
         axios.post('/stories',formData)
           // .then(response => console.log(response.data))
        //  .then(() => console.log(formData))
         //  .then(() =>  this.props.history.push('/stories'))
            
        //     .catch((err) => console.log(err))
    }
    // onChange(value){
    //     console.log("value getting")
    //     this.setState(() => ({
    //         body : value
    //     }))
    // }
    render() {
        return(
            <div>
               <center><h2 className="form-handling">Add Story</h2></center>
                <FormStory handleformSubmit = {this.handleformSubmit}  onChange = {this.props}/>
            </div> 
        )
    }
}
export default NewStory