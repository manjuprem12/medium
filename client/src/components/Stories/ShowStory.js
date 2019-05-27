import React from 'react'
import {Link} from 'react-router-dom'
import axios from '../../config/axios'
import ReactHtmlParser from 'react-html-parser'

//import List from '../Responses/List'

class ShowStory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            story : {},
            body :''
        }
        this.handleDelete = this.handleDelete.bind(this)
    }
    handleDelete() {
        const confirmDelete = window.confirm("Are u sure ?")
        if(confirmDelete) {
            axios.delete(`/stories/${this.state.story._id}`)
                .then(() => this.props.history.push('/stories'))
                .catch(err => window.alert(err))
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/stories/${id}`)
       // .then(response => console.log(response.data))
       .then(response => this.setState(() => ({story : response.data })))
    }
    render() {
  console.log("from show page",this.state.story.topic)
        const html = this.state.story.body
       // console.log(html,'body')
        return(
            <div>
                
                <h2> Welcome </h2>
                <h2>Title : {this.state.story.title } </h2>
                
                <p> CreatedAt - {this.state.story.createdAt}</p>
                {/* <p> Author - {this.state.story.user ? this.state.story.user.username : null }</p> */}
               
                <div>Body :  {ReactHtmlParser(html)} </div>
              
              <p> Topic - {this.state.story.topic && this.state.story.topic.name} </p>
              <ul>
            
           { <p> Tag : {this.state.story.tag &&  this.state.story.tag.map(tag => {
                        return(
                           
                                <li key={tag._id}>{tag.tags}</li>
                         

                        )
                    })
                  }
           </p> }
                
           
                      </ul>
                <Link to = {`/stories/edit/${this.state.story._id}`} >Edit </Link>
                <button onClick = {this.handleDelete} >
                    Delete
                </button><br/>
             
                <Link to = '/stories'> Back </Link> <br/>

                
                {/* <List handleResponseSubmit={this.handleResponseSubmit} storyId={this.props.match.params.id}/> */}
            </div>
        )
    }
} 

export default ShowStory