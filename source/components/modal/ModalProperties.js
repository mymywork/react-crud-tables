import React from 'react'
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap'

class ModalProperties extends React.Component {

  componentDidMount () {
    this.input = React.createRef()
  }

  render () {
    const { modal } = this.props
    return (
      <React.Fragment>
        <Modal
          {...this.props}
          show={modal.isOpen}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton onHide={() => {
            modal.hide()
          }}>
            <Modal.Title id="contained-modal-title-vcenter">
              {modal.param ? modal.param.header : ''}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure ?</p>
          </Modal.Body>


          <Modal.Footer>
            <Button variant="danger" onClick={() => {
              modal.param.request()
              modal.hide()
            }}>Delete</Button>
            <Button onClick={() => {
              modal.hide()
            }}>Close</Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    )
  }

}

export default ModalProperties