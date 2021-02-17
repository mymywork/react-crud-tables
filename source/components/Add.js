import React from 'react'
//import { connect } from 'react-redux'
import { Form, Table, Button, Container, Alert } from 'react-bootstrap'
import ModalProperties from './modal/ModalProperties'
import withModal from '../hoc/withModal'
import request from 'superagent'
import { Link } from 'react-router-dom'

class Add extends React.Component {

  constructor (props) {
    super(props)
    this.state = { users: null, form: {} }
  }

  componentDidMount () {
    this.componentDid()
  }

  componentDidUpdate () {
    this.componentDid()
  }

  componentDid () {
    const { modal, token } = this.props

    console.log('Users componentDidMount')

  }

  handleChangeField (x) {
    return (e) => this.setState({ form: { ...this.state.form, [x]: e.target.value } })
  }

  render () {
    const { modal, token, entity, request, base } = this.props
    console.log('Render Users')
    console.log('Users token = ', token)
    console.log('Users = ', this.state.users)
    console.log('Users entity = ', entity)
    console.log('Users base = ', base)

    return (
      <React.Fragment>
        <Container>
          <br/>
          <Alert variant='success'>
            Add new item
          </Alert>
          <Form>
            {Object.keys(entity).map((x) => {
                return (
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>{x}</Form.Label>
                    <Form.Control type="email" placeholder={x} value={this.state.form[x]} onChange={this.handleChangeField(x)}/>
                  </Form.Group>)
              }
            )}

            <Button variant="success" type="submit" onClick={() => {
              console.log('Add form state=', this.state)
              request(this.state.form)
            }}>
              Submit
            </Button>&nbsp;&nbsp;&nbsp;
            <Link to={`/${base}`}>
              <Button variant="danger">
                Cancel
              </Button>
            </Link>
          </Form>
          <br/>

        </Container>
      </React.Fragment>
    )
  }
}

export default withModal('modal')(Add)