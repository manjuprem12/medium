import React from 'react'
import axios from '../../config/axios'
import Select from 'react-select'

class Tag extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            tagOptions : []
        }
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount(){
        let tagOptions = []
        axios.get('/tags')
            .then((response) => {
                tagOptions = response.data.map(tag => ({
                    label : tag.tags,
                    value :tag.tags,
                    id : tag._id
                }))
               // console.log(tagOptions)
                this.setState({tagOptions})
            })
            .catch(err => console.log(err))

    }
    handleChange(e) {
        const values = e.map(tag => tag.id)
        this.props.handleTagsChange(values)
    }
    render(){
        // console.log(this.state.tagOptions)
        return(
            <div>
                Select a Tag
                <Select isMulti
                    onChange = {this.handleChange}
                    options = {this.state.tagOptions} />
            </div>
        )
    }
}
export default Tag