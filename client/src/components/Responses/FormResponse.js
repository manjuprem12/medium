import React from 'react'

class FormResponse extends React.Component {
   
    constructor(props){
        super(props)

        this.state = {
            response :''
        }
    }
    handleChange(e) {
        e.persist()
        this.setState(() => ({
            [e.target.name] : e.target.value
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            response : this.state.response
        }
        
    }
    render(){
        return(
            <div>
                <form onSubmit = {this.handleSubmit}>
                    <label>
                        Response 
                        <input type = "text" value = {this.state.response} onChange = {this.handleChange} name = "response" />

                    </label><br/>

                    <input type ="submit" />
                </form>
            </div>
        )
    }
}
export default FormResponse