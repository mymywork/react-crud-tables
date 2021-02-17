import React from 'react'
//import { connect } from 'react-redux'
import { Navbar, Nav, Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import ModalProperties from './modal/ModalProperties'
import withModal from '../hoc/withModal'
import request from 'superagent'
import { Route, Switch, matchPath, Link, withRouter, Redirect } from 'react-router-dom'
import Add from './Add'
import Entities from './Entities'

class Login extends React.Component {

  constructor (props) {
    super(props)
    this.state = { users: null, form: this.props.entity }
  }

  componentDidMount () {

    request.post('https://localhost/login')
      .set('Content-Type', 'application/json')
      .withCredentials()
      .send('{"email":"email", "password":"password"}')
      .then((res) => {
        console.log(res.body)
        //token=res.body
        this.setState({ token: res.body })
      })
      .catch(() => {

      })
  }

  handleChangeField(x) {
    return (e) => this.setState({ form: { ...this.state.form, [x]: e.target.value } });
  }

  render () {
    const { modal, request, entity, error } = this.props
    console.log('Render Main')

    return (
      <React.Fragment>
        <Container fluid={'lg'}>
          <br />
          <Row>
            <Col md={2}>
            </Col>
            <Col md={6}>
            <Form>
              <Form.Group as={Row} controlId="formHorizontalText">
                <Form.Label column sm={2}>
                </Form.Label>

                <Form.Label column sm={3}>
                  Login into.
                </Form.Label>
              </Form.Group>

              { error && <Alert variant='danger'>
                {error}
              </Alert>}

              {Object.keys(entity).map((x) => {
                  return (
                    <Form.Group as={Row} controlId="formHorizontal">
                      <Form.Label column sm={2}>
                        {x}
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control placeholder={x} value={this.state.form[x]} onChange={this.handleChangeField(x)} />
                      </Col>
                    </Form.Group>)
                }
              )}

              <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
                  <Button onClick={()=> {
                    console.log('Login form state=',this.state)
                    request(this.state.form)
                  }}>Sign in</Button>
                </Col>
              </Form.Group>
            </Form>
            </Col>
            <Col md={2}>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}

export default withModal('modal')(Login)
