import { Button, Modal } from "react-bootstrap"

export const ConfirmationModal=({show,onHide,handleConfirmDelete})=>{
    return (
        <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure you want to delete this user?
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
                Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
                Yes, Delete
            </Button>
        </Modal.Footer>
    </Modal>
    )
}