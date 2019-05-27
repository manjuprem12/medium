import React from 'react' 
import axios from '../../config/axios'
import StoryForm from './Form'

class StoryNew extends React.Component {
    constructor(props){
        super(props) 
        this.state={
            body:''
        }
        this.handleformSubmit = this.handleformSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    handleformSubmit(formData) {
        formData.body = this.state.body
        console.log(formData)
        axios.post('/stories', formData)
            .then((response) => {
                console.log(response.data)
                this.props.history.push('/stories')})
            .catch((err)=>console.log(err))
        //    .then(response => {
        //        console.log(response.data)
        //     })
    }



    onChange(value){
        console.log("value got")
        this.setState( () =>({
            body:value
        }))

    }   

    render(){
        return (
            <div>
               <center><h2 className="form-heading">Add Story</h2></center> 
                <StoryForm  onChange={this.onChange} handleformSubmit={this.handleformSubmit} /> 
            </div>
        )
    }
}

export default StoryNew