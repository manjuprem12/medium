import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'

class ListResponse extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            responses : []

        }
    }
    
    componentDidMount() {
        axios.get('/responses')
            .then(response => this.setState(() => ({ responses: response.data })))
            // .then(response => console.log(response.data))
    }


    render(){
        return(
            <div>
                {this.state.length == 0 ? (<p> No responses found !! add one response </p> ): (
                    <div>
                        <h2> Response List  : {this.state.responses.length} </h2>
                        <ul>
                            {this.state.responses.map(response => {
                                return (
                                    <div key = {response._id} >
                                        <li><Link to = {`/responses/${response._id}`}>{response.body}</Link></li>
                                    </div>
                                )
                            })}
                        </ul>
                    </div>
                )}
                
            </div>
        )
    }
}
export default ListResponse