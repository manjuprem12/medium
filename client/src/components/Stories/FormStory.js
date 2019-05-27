import React, {Component} from 'react'
import {EditorState , convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import Topic from '../Topics/Topic'
import Tag from '../Tags/Tag'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
import { unemojify } from 'node-emoji';

class FormStory extends Component {
  constructor(props){
    super(props)
    this.state = {
      editorState : EditorState.createEmpty(), 
      topic : '',
      tag:[],
      title : '',
      body : ''
    }
    this.onEditorStateChange = this.onEditorStateChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleTopicChange = this.handleTopicChange.bind(this)
    this.handleTagsChange = this.handleTagsChange.bind(this)
   
  }
  onEditorStateChange(editorState){
    // const { onChange,value } = this.props;
    const newValue = unemojify(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
    console.log(newValue,'newValue')
    // if(value !== newValue) {
    //   onChange(newValue);
    // }
    this.setState({
      editorState, body : newValue
    });
  };
  handleChange(e){
    e.persist()
    this.setState(() => ({
      [e.target.name] : e.target.value
    }))
  }
  handleTagsChange(tag){
    this.setState(() => ({tag}))
  }
  handleTopicChange(topic){
    this.setState(() => ({ topic }))
   
  }
  handleSubmit = (e) => {
   
  e.preventDefault()
  //console.log("button clicekd")
    const formData = {
      title : this.state.title ,
      tag : this.state.tag,
      topic : this.state.topic,
      body : this.state.body
    }
    // console.log(formData)
   this.props.handleformSubmit(formData)
  }
  
 
  render() {
    const { editorState} = this.state
    return(
      <div>
        <form onSubmit = {this.handleSubmit}>
          <div>
            <label>
              Title
              <input type = "text" value = {this.state.title}  name = "title" onChange={ this.handleChange} />
            </label> <br/>
           
            <label><Topic  handleTopicChange= {this.handleTopicChange} /></label> <br/>
            <label><Tag handleTagsChange = {this.handleTagsChange}/></label><br/>
            Body :
            <Editor 
              editorState = {editorState}
             
              wrapperClassName="demo-wrapper"
              editorClassName = "demo-editor"
              onEditorStateChange = {this.onEditorStateChange} 
            />
            <input type= "submit" />
          </div>
        </form>
      </div>
    )
  }
}
export default FormStory
