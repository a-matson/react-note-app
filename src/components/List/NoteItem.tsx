import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import classes from './NoteItem.module.css';
import { deteleNote } from '../../api';
import Dropdown from './Dropdown';
import useHttp from '../../hooks/use-http';
import { Actuator, NoteType } from '../../models/datatypes';

type NoteItemType = {
	noteId: number,
	onReloadData: (data: Actuator<NoteType>) => void // pass along
}

const NoteItem: React.FC<NoteItemType> = (props) => {
	// we don't expect response data from deleting request
	const { sendRequest, status, error } = useHttp(deteleNote);

	// use effect catches data change and request update of the list
	useEffect(() => {
		if (status === 'completed' && !error) { // not waiting for data
			props.onReloadData({ action: 'delete', data: { id: props.noteId } });
		}
	}, [status, error, props]);

	const noteRemoveHandler = () => {
		sendRequest(props.noteId);
	};

	return (
		<li className={'section ' + classes.note}>
			<Link to={`/notes/${props.noteId}`}>{props.children}</Link>
			<Dropdown>
				<button onClick={noteRemoveHandler}>Remove</button>
				{/* This dropdown allows for multiple buttons, hence something like this could be used: */}
				{/* <Link to={`/notes/${props.noteId}/edit`}><button>Edit</button></Link> */}
			</Dropdown>
		</li>
	);
};

export default NoteItem;
