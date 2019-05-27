import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'

class ListStory extends React.Component{
   
    constructor(props){
        super(props)
        this.state={
            stories : []
        }
    }

    componentDidMount() {
        axios.get('/stories')
            .then(response => this.setState(() => ({ stories: response.data })))
            // .then(response => console.log(response.data))
    }
    
    render(){
        return(
            <div>
                    {this.state.length === 0 ? (<p> No  stories found . Add First Story </p>) :(
                        <div>
                             <h2> Listing story : {this.state.stories.length}</h2>
                            <ul>
                                {
                                    this.state.stories.map(story => {
                                        return(
                                            <div key={story._id}>
                                            <li><Link to={`/stories/${story._id}`}>{story.title}</Link></li>
                                            {/* <li>{story.body}</li>
                                            <li>{story.topic}</li> */}
                                            
                                            </div>
                                            
                                        )
                                    })
                                }

                            </ul>
                        </div>
                    )}
                    
            <Link to = '/stories/new'>Add Story</Link>
            </div>
           
        )
    }
}

export default ListStory