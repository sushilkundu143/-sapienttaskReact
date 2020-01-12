import React from 'react'
import FormFilterContainer from './FormFilterContainer'

class FormFilterComponent extends React.Component {
    constructor(){
        super()
        this.state = {
                Human: false,
                Alien: false,
                OtherSpecies: false,
                Male: false,
                Female: false,
                Unknown: false,
                OUnknown: false,
                Earth: false
        }
    }
    handleChange = event => {
        const {name, value, type, checked} = event.target
       if(type === 'checkbox') {
        this.setState({[name]: checked}, () => this.props.filters(this.state))
       } else {
           this.setState({[name]: value}, () => this.props.filters(this.state))
       }
    }
    render(){
        return (
            <FormFilterContainer data={this.state} handleChange={this.handleChange}  />
        )
    }
    
}

export default FormFilterComponent