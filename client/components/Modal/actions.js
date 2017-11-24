import { OPEN_MODAL, CLOSE_MODAL } from '../../constants/actionTypes';

export const openModal = (name) => {
	return { type: OPEN_MODAL, currentName: name }
}

export const closeModal = () => {
	return { type: CLOSE_MODAL }
}