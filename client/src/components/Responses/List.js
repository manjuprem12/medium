import React from 'react'
import axios from '../../config/axios';

class List extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            responses : [],
            response:''
        }
    }
    componentDidMount(){
        const id = this.props.storyId
        console.log(id)
        axios.get(`/responses/${id}`)
        // .then(response => this.setState(() => ({responses : response.data})))
        .then(response => {
            this.setState(() => ({
                
                responses:response.data
            
            }))
            //
        })
     
           //.then(response => console.log(response.data))
    }
    handleChange = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.name] : e.target.value
        }))
    }
    handlerResponseSubmit = (e) => {
        e.preventDefault()
        // // const formData = {
        // //     response : this.state.response 
        // // }
        // // const id = this.props.storyId
        // // axios.post(`/responses/${id}`)
        // //   //  .then(response => console.log("after posting",response.data))
        // //   .then(response => this.setState(() => ({
        // //       response:response.data
        // //   })))
        //   const formData ={
        //       response:this.state.response
        //   }
        //   console.log("from ersposne",formData)
        //   this.props.handlerResponseSubmit(formData)

      
        const formData={
            response:this.state.response
        }
        console.log(formData)
       // this.props.handlerResponseSubmit(formData)
    

    }
    
    
    
    render(){
        console.log("from response page",this.state.responses)
        return( 
            <div>
                <h2> Helloooo</h2>
            
     
              <ul>
                   {this.state.responses.map(resp => {
                       return(
                           <li key={resp._id}>{resp.body}</li>
                       )
                   })}
               </ul>  
              <form onSubmit = {this.handlerResponseSubmit}>
              <label>
                   Response 
                   <input type = "text" value = {this.state.response} name ="response" onChange = {this.handleChange}/>
               </label>
               <input type = "submit" />
              </form>
            </div>
        )
    }
}

export default List