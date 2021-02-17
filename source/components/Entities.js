import React from 'react'
//import { connect } from 'react-redux'
import { Table, Button, Row, Col } from 'react-bootstrap'
import ModalProperties from './modal/ModalProperties'
import withModal from '../hoc/withModal'
import request from 'superagent'
import { Link, Route } from 'react-router-dom'
import Add from './Add'
import Edit from './Edit'
import { withRouter, matchPath } from 'react-router-dom'

class Entities extends React.Component {

  constructor (props) {
    super(props)
    this.state = { entities: null }
  }

  componentDidMount () {
    this.componentDid()
  }

  componentDidUpdate () {
    this.componentDid()
  }

  componentDid () {
    const { modal, token, location, history, url } = this.props

    console.log('entities componentDidMount')

    let match = matchPath(location.pathname, {
      path: '/:base',
      exact: false,
      strict: false
    })

    let base = match.params.base
    console.log('Match entities = ', match, location)

    let baseurl = url + '/' + base

    if (token && this.state.entities == null) {
      request
        .get(baseurl)
        .auth(this.props.token, { type: 'bearer' })
        .set('Accept', 'application/json')
        .then(res => {
          console.log(res.body)
          this.setState({ entities: res.body })
        })
    }

  }

  render () {
    const { modal, token, location, history, url, entity } = this.props
    console.log('Render entities')
    console.log('entities token = ', token)
    console.log('entities = ', this.state.entities)

    let match = matchPath(location.pathname, {
      path: '/:base',
      exact: false,
      strict: false
    })

    let base = match.params.base
    console.log('Match entities = ', match, location)

    let baseurl = url + '/' + base

    return (
      <React.Fragment>
        {this.state.entities != null && <Route path={`/${base}/edit/:id`} exact={false} render={({ match }) => {
          console.log('Match=', match)
          return (<Edit
            entity={entity}

            request={(json) => {
              request
                .put(baseurl + '/' + json.id)
                .auth(this.props.token, { type: 'bearer' })
                .set('Accept', 'application/json')
                .send(json)
                .then(res => {
                  console.log(res.body)
                  this.setState({ entities: [...this.state.entities, res.body] })
                  history.push(`/${base}`)
                })
            }}

            base={base}
            item={this.state.entities.filter(x => x.id == match.params.id)[0]}


          />)
        }}/>}

        <Route path={`/${base}/add`} exact={false} render={({ match }) => {
          return (<Add
            entity={entity}
            request={(json) => {
              request
                .post(baseurl)
                .auth(this.props.token, { type: 'bearer' })
                .set('Accept', 'application/json')
                .send(json)
                .then(res => {
                  console.log(res.body)
                  this.setState({ entities: [...this.state.entities, res.body] })
                  history.push(`/${base}`)
                })
            }}
            base={base}

          />)
        }}/>

        <Route path={`/${base}`} exact={true} render={({ match }) => (
          <React.Fragment>
            <br />
            <Row>
              <Col>
                <Link to={`/${base}/add`}><Button variant="success">Add</Button></Link>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Table striped bordered hover>
                  <thead>
                  <tr>
                    {Object.keys(entity).map((x) => {
                      return <th>{x}</th>
                    })}
                    <th>actions</th>
                  </tr>
                  </thead>

                  <tbody>
                  {this.state.entities &&
                  this.state.entities.map(x =>
                    <tr>
                      {Object.keys(entity).map((k) => {
                        return <td>{x[k]}</td>
                      })}
                      <td>
                        <Link to={`/${base}/edit/` + x.id}><Button variant="primary">edit</Button></Link>
                        &nbsp;&nbsp;&nbsp;
                        <Button variant="danger" onClick={() => {
                          modal.show({
                            header: 'Delete it ?',
                            request: (json) => {
                              request
                                .delete(`${baseurl}/${x.id}`)
                                .auth(this.props.token, { type: 'bearer' })
                                .set('Accept', 'application/json')
                                //.send(json)
                                .then(res => {
                                  console.log(res.body)
                                  this.setState({ entities: [...this.state.entities, res.body] })
                                  history.push(`/${base}`)
                                })
                            }
                          })
                        }}>delete</Button>{' '}
                      </td>
                    </tr>
                  )}

                  </tbody>
                </Table>
              </Col>
            </Row>
            <ModalProperties modal={modal}/>

          </React.Fragment>
        )}/>


      </React.Fragment>
    )
  }
}

export default withRouter(withModal('modal')(Entities))