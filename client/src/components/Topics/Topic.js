import React from 'react'
import axios from '../../config/axios'
//import { Link } from 'react-router-dom'

class Topic extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            topics : [],
            topicValue : ''
        }
        this.selectChange = this.selectChange.bind(this)
    }
    componentDidMount(){
        axios.get('http://localhost:3005/topics')
            .then((response) => {
                this.setState(() => ({
                    topics : response.data
                }))
            })
    }
    selectChange(e){
        const topicValue = e.target.value
        this.setState(() => ({
            topicValue
        }))
        this.props.handleTopicChange(topicValue)
    }
    render() {
        return(
            <div> 
                <h2> Topics </h2>
                <label>
                    Select Topic
                    <select onChange = {this.selectChange} value = {this.state.topicValue}>
                        <option value = ""> Select </option>
                        {this.state.topics.map(topic => {
                            return (
                                <option key = {topic._id} value = {topic._id}>{topic.name}</option>
                            )
                        })}
                    </select>
                </label> <br/>
              
            </div>
        )
    }
}
export default Topic