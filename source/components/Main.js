import React from 'react'
//import { connect } from 'react-redux'
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap'
import ModalProperties from './modal/ModalProperties'
import withModal from '../hoc/withModal'
import request from 'superagent'
import { Route, Switch, matchPath, Link, withRouter, Redirect } from 'react-router-dom'
import Add from './Add'
import Entities from './Entities'
import Login from './Login'
import { apiUrl, authUrl } from '../config'

class Main extends React.Component {

  constructor (props) {
    super(props)
    this.state = { token: undefined }
  }

  componentWillMount () {
    this.getToken()
  }

  getToken() {
    const token = localStorage.getItem('token')
    if (token != '') {
      this.setState({ token: token })
    }
  }

  login(form) {
    const { modal, history, store } = this.props

    request.post(authUrl)
      .set('Content-Type', 'application/json')
      .ok(res => res.status < 500)
      .withCredentials()
      .send(form)
      .then((res) => {
        console.log('Reply:',res, res.body)
        if (res.body.error != undefined ) {
          this.setState({ error: res.body.error })
        } else {
          this.setState({ token: res.body, error: undefined })
          localStorage.setItem('token', res.body)
        }
      })
      .catch((e) => {
        console.log('Catch',e)

      })

  }
  logout() {
    localStorage.setItem('token', '')
    this.setState({ token: undefined })
  }

  render () {
    const {} = this.props
    console.log('Render Main')

    return (
      <React.Fragment>
        <div id='menu'>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand><Link to='/'>Anatoly</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link id="users" href="/users">Users</Nav.Link>
                <Nav.Link id="contracts" href="/contracts">Contracts</Nav.Link>
                <Nav.Link id="contractors" href="/contractors">Contractors</Nav.Link>
                <Nav.Link id="inits" href="/inits">Inits</Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                { this.state.token && <Nav.Link id="inits" onClick={this.logout.bind(this)}>Logout</Nav.Link> }
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar>
        </div>

        <Container fluid>
          <Switch>
            <Route path={'/'} exact={this.state.token != undefined} render={({ match }) => {
              if ( this.state.token == undefined ) return (<Login
                error={this.state.error}
                entity={{
                  email: '',
                  password: '',
                }}
                request={(form) => {
                  this.login(form)
                }}
              />)

              return <Redirect to={'/users'} push={true} />
            }}/>

            <Route path={'/login'} exact={true} render={({ match }) => {
              return <Login
                error={this.state.error}
                entity={{
                  email: '',
                  password: '',
                }}
                request={(form) => {
                  this.login(form)
                }}
              />
            }}/>

            <Route path={'/users'} exact={false} render={({ match }) => {
              return <Entities token={this.state.token}
                               url={apiUrl}
                               entity={{
                                 id: '',
                                 email: '',
                                 nickname: '',
                                 password: '',
                                 created_at: '',
                                 updated_at: ''
                               }}
              />
            }}/>

            <Route path={'/contracts'} exact={false} render={({ match }) => {
              return <Entities token={this.state.token}
                               url={apiUrl}
                               entity={{
                                 id: '',
                                 contractor: '',
                                 contractor_id: '',
                                 curr: '',
                                 prolong: '',
                                 expired_at: '',
                                 created_at: '',
                                 updated_at: ''
                               }}
              />
            }}/>


            <Route path={'/contractors'} exact={false} render={({ match }) => {
              return <Entities token={this.state.token}
                               url={apiUrl}
                               entity={{
                                 id: '',
                                 name: '',
                                 laddress: '',
                                 paddress: '',
                                 taxnumber: '',
                                 internal: '',
                                 created_at: '',
                                 updated_at: ''
                               }}
              />
            }}/>

            <Route path={'/inits'} exact={false} render={({ match }) => {
              return <Entities token={this.state.token}
                               url={apiUrl}
                               entity={{
                                 id: '',
                                 rev: '',
                                 doc: '',
                                 group: '',
                                 length: '',
                                 weght: '',
                                 created_at: '',
                                 updated_at: ''
                               }}
              />
            }}/>


          </Switch>
        </Container>

      </React.Fragment>
    )
  }
}

export default withRouter(withModal('modal')(Main))