import { NoteType, Actuator } from '../../models/datatypes';
import NoteItem from './NoteItem';
import classes from './NoteList.module.css';

type NoteListProps = {
	notes: NoteType[];
	onReloadData: (data: Actuator<NoteType>) => void
}

const NoteList: React.FC<NoteListProps> = (props) => {
	return (
		<div className={classes.container}>
			<ul>
				{/* sorting notes by time made/modified so the newer ones appear up top */}
				{props.notes
					.sort(
						(a: NoteType, b: NoteType): number =>
							new Date(b.date!).getTime() - new Date(a.date!).getTime()
					)
					.map((note: NoteType) => (
						// lifting the state up
						<NoteItem
							key={note.id}
							noteId={note.id!}
							onReloadData={props.onReloadData}
						>
							<b>{note.title}</b>
							<span>{note.text}</span>
						</NoteItem>
					))}
			</ul>
		</div>
	);
};

export default NoteList;
