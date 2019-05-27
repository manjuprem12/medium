import React, { Component } from 'react';
import { EditorState , convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import Topic from '../topic/topic'
 import Tag from '../tags/tags'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html';

import { unemojify } from 'node-emoji';


class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      topic : '',
      tag : [],
      title : ''
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleTopicChange = this.handleTopicChange.bind(this)
    this.handleTagsChange = this.handleTagsChange.bind(this)
    //this.handleEditorChange = this.handleEditorChange.bind(this)
  }

  onEditorStateChange(editorState){
    //console.log(this.props)
      const { onChange, value } = this.props;
  
      const newValue = unemojify(
        draftToHtml(convertToRaw(editorState.getCurrentContent()))
      );
  
      if (value !== newValue) {
        onChange(newValue);
      }
  
      this.setState({
        editorState
      });
    };
  

  handleChange(e){
      e.persist()
      this.setState(()=> ({
          [e.target.name] : e.target.value
      }))
  }

  handleTagsChange(tag){
    // console.log(typeof(tag))
    // console.log(tag)
    this.setState(() =>({tag}))
  }

  handleTopicChange(topic){
    this.setState(()=>({topic}))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const formData = {
      title : this.state.title,
      tag : this.state.tag,
      topic : this.state.topic
    }
   this.props.handleformSubmit(formData)
  }

  render() {
    const { editorState } = this.state;
    return (
        <div>
        <form onSubmit = {this.handleSubmit}>
            <div>
                <label>
                    Title
                    <input type = "text"value = {this.state.title} name = "title" onChange = {this.handleChange}/>
                </label><br/>
       
                            <label><Topic handleTopicChange={this.handleTopicChange}/></label>  <br/>
               <label> <Tag handleTagsChange={this.handleTagsChange}/></label><br/>
            Body :

            
                {/* <Editor
                  editorState={editorState}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  onEditorStateChange={this.onEditorStateChange}
                />
                <textarea
                  disabled
                  value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                /> */}
                <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorStateChange}
                />
                <input type = "submit"/>
            </div>
      </form>
      </div>
    )
  }
}

export default  Form