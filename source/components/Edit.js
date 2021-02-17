import React from 'react'
//import { connect } from 'react-redux'
import { Form, Table, Button, Container, Alert } from 'react-bootstrap'
import ModalProperties from './modal/ModalProperties'
import withModal from '../hoc/withModal'
import request from 'superagent'
import { Link } from 'react-router-dom'


class Edit extends React.Component {

  constructor(props) {
    super(props);
    this.state = { users: null, form: this.props.item }

  }

  componentDidMount() {
    this.componentDid()
  }

  componentDidUpdate() {
    this.componentDid()
  }


  componentDid() {
    const { modal, token } = this.props

    console.log('Users componentDidMount')

  }

  handleChangeField(x) {
    return (e) => this.setState({ form: { ...this.state.form, [x]: e.target.value } });
  }

  render () {
    const { modal, token, entity, request, item, base } = this.props
    console.log('Render Users')
    console.log('Users token = ', token)
    console.log('Users = ', this.state.users)
    console.log('Users entity = ', entity)


    return (
      <React.Fragment>
        <Container>
          <br />
          <Alert variant='primary'>
            Edit item
          </Alert>
          <Form>
            {Object.keys(entity).map((x) => {
                return (
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>{x}</Form.Label>
                    <Form.Control type="email" placeholder={x} value={this.state.form[x]} onChange={this.handleChangeField(x)} />
                  </Form.Group>)
              }
            )}

            <Button variant="primary" type="submit" onClick={()=> { console.log('Edit form state=',this.state)
              request(this.state.form)
            }}>
              Update
            </Button>&nbsp;&nbsp;&nbsp;
            <Link to={`/${base}`}>
              <Button variant="danger">
                Cancel
              </Button>
            </Link>

          </Form>
          <br />
        </Container>
      </React.Fragment>
    )
  }
}

export default withModal('modal')(Edit)