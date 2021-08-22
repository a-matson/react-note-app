import Section from '../UI/Section';
import NoteForm from './NoteForm';
import useHttp from '../../hooks/use-http';
import { addNote } from '../../api';
import { useEffect } from 'react';
import { Actuator, NoteType } from '../../models/datatypes';
import { useHistory } from 'react-router-dom';

type NewNoteType = {
	onReloadData: (data: Actuator<NoteType>) => void,
	onCloseNewNote: (data:boolean) => void
}

const NewNote: React.FC<NewNoteType> = (props) => {
	const history = useHistory();
	// import of the hook for communication with json-server
	const { sendRequest, status, data, error } = useHttp(addNote);

	const handleNewNoteClosing = () => {
		history.push('/');
		// lift the state up
		props.onCloseNewNote(true);
	}

	useEffect(() => {
		// catching return and passing it up for rerendering
		if (status === 'completed' && !error && data) {
			props.onReloadData({ action: 'add', data: data[0] });
		}
	// should not trigger on props as then it would get stuck in infinite loop
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status, error, data]);

	return (
		<Section>
			<NoteForm loading={status === 'pending' && !error} onHandleNote={sendRequest}>
				<button onClick={handleNewNoteClosing}>Close</button>
			</NoteForm>
			{error && <p>{error}</p>}
		</Section>
	);
};

export default NewNote;
