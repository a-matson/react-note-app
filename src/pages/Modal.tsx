import { Link, Route, useParams } from 'react-router-dom';
import { Actuator, NoteType } from '../models/datatypes';

import EditNote from '../components/NoteHandling/EditNote';
import Overlay from '../components/UI/Overlay';
import Section from '../components/UI/Section';
import NotFound from './NotFound';

type ModalType = {
	data: {error: string | null, status: string, notes: NoteType[] | null},
	onReloadData: (data: Actuator<NoteType>) => void
}

const Modal: React.FC<ModalType> = (props) => {
	// data passed from links leading to modals
	const params = useParams();
	// we know that noteId must exist as otherwise this page won't be loaded
	const noteId = +(params as any).noteId;
	// loading notes from the App
	const { notes, status, error } = props.data;

	const findNote = (noteId:number, notes:NoteType[]) => {
		// checking if we have element with given id in the notes
		const note = notes.find((note) => note.id === noteId);
		return note || null;
	};

	const prepShow: React.FC = () => {
		// check if loading
		if (status === 'pending' || error || !notes || notes.length === 0)
			return <Section>Loading...</Section>;
		// find requested note
		const note = findNote(noteId, notes);
		// if note doesn't exist
		if (!note) return <NotFound />;

		return (
			<Section>
				<h1>{note.title}</h1>
				<p>{note.text}</p>
				<Link to={`/notes/${note.id}/edit`}>
					<button>Edit</button>
				</Link>
			</Section>
		);
	};

	const prepEdit: React.FC = () => {
		// check if loading
		if (status === 'pending' || !notes || notes.length === 0)
			return <Section>Loading...</Section>;
		// find requested note
		const note = findNote(noteId, notes);
		// if note doesn't exist show error
		if (!note) return <NotFound />;

		return (
			<EditNote
				onReloadData={props.onReloadData} loading={status === 'pending'} error={error}
				params={{ data: note, preset: { buttonText: 'Update' } }}
			/>
		);
	};

	return (
		<Overlay>
			<Route path="/notes/:id" component={prepShow} exact />
			<Route path="/notes/:id/edit" component={prepEdit} exact />
			{error && <Section>{error}</Section>}
		</Overlay>
	);
};

export default Modal;
