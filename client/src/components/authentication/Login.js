// import React from 'react'
// import axios from '../../config/axios'
// import { Redirect } from 'react-router-dom'

// class UserLogin extends React.Component{
//     constructor(props) {
//         super(props) 
//         this.state = {
//             email: '',
//             password : '',
//             notice : '',
//             redirect : false
//         }
//         this.handleChange = this.handleChange.bind(this)
//         this.handleSubmit = this.handleSubmit.bind(this)
//     }

//     handleSubmit(e) {
//         e.preventDefault()
//         const formData = {
//             email: this.state.email ,
//             password: this.state.password
//         }
//         console.log(formData)
//         axios.post ('/users/login', formData)
//                 console.log(formData)

//             // .then(response => {
//             //     axios.defaults.headers['x-auth'] = response.data.token
//             //     localStorage.setItem('token',response.data.token)
//             //     this.props.handleIsAuthenticated(true)
//             //     this.setState(() => ({ redirect : true }))
//             // })
//             // .catch(err => {
//             //     this.setState(() => ({
//             //         notice: err.response.data.notice
//             //     }))
//             // })

      
//     }
//     handleChange(e) {
//         e.persist()
//         this.setState(() => ({
//             [e.target.name] : e.target.value

//         }))

//     }
   
//     render() {
//         if(this.state.redirect) {
//             return <Redirect to = "/stories" />
//         }
//         return (
//             <div>
//                 <h2> Login </h2>
//                 {this.state.notice && <p> { this.state.notice } </p>}
//                 <form onSubmit = {this.handleSubmit} >
//                     <label>
//                         email
//                         <input type = "text" value = {this.state.email} onChange = {this.handleChange} name = "email"/>
//                     </label> <br/>

//                     <label>
//                         Password
//                         <input type = "password" value = {this.state.password} onChange = {this.handleChange} name = "password"/>
//                     </label> <br/>
//                     <input type = "submit" />
//                 </form>
//             </div>
//         )
//     }
// }
// export default UserLogin


import React from 'react'
import axios from '../../config/axios'
import { Redirect } from 'react-router-dom'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            notice: '',
            redirect: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        const formData = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post('/users/login', formData)
            .then(response => {
                console.log(response.data)
                axios.defaults.headers['x-auth'] = response.data.token
                localStorage.setItem('token', response.data.token)
                this.props.handleIsAuthenticated(true)
                this.setState(() => ({ redirect: true }))
            })
            .catch(err => {
                this.setState(() => ({
                    notice: err.response.notice
                }))
            })
    }
    handleChange(e) {
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }
       render() {
        if(this.state.redirect) {
            return (<Redirect to="/"/>)
        }
        return (
            <div className="form_class">
                <h2 className="regiser-heading">Login </h2>
                {this.state.notice && <p> {this.state.notice}</p>}
                <form onSubmit={this.handleSubmit} className="form_class_register">

                    <input type="text" value={this.state.email} onChange={this.handleChange}
                        name="email" placeholder="Enter Email"/>
                    <span className="fa fa-user errspan"></span><br/>

                    <input type="password" value={this.state.password} onChange={this.handleChange}
                        name="password" placeholder="Enter Password"/><span className="fa fa-lock errspan"></span><br/>
                    <input type="submit" className="register_name"/>
                </form>
            </div>
        )
    }
}

export default Login