import { Fragment } from 'react';
import Section from '../components/UI/Section';
import NoteList from '../components/List/NoteList';
import NewNote from '../components/NoteHandling/NewNote';
import { Actuator, NoteType } from '../models/datatypes';
import { Link } from 'react-router-dom';

type HomeType = {
	data: { notes: NoteType[],  error: string | null, status:string, isNewNoteClosed: boolean },
	onReloadData: (data: Actuator<NoteType>) => void,
	onCloseNewNote: (props: boolean) => void
}

const Home: React.FC<HomeType> = (props) => {
	const { status, error, notes, isNewNoteClosed } = props.data;
	// rendering data
	let content = <NoteList notes={notes!} onReloadData={props.onReloadData} />;
	// if still loading
	if (status === 'pending') content = <Section>Loading notes...</Section>;
	// if error
	if (error) content = <Section>{error}</Section>;
	// if no notes
	if (status === 'completed' && (!notes || notes.length === 0))
		content = <Section>No notes</Section>;
	
	return (
		<Fragment>
			{!isNewNoteClosed && <NewNote onReloadData={props.onReloadData} onCloseNewNote={props.onCloseNewNote} />}
			{isNewNoteClosed && <Link onClick={() => props.onCloseNewNote(false)} to='/new'><Section>Add note</Section></Link>}
			{content}
		</Fragment>
	);
};

export default Home;
