import Section from '../UI/Section';
import NoteForm from './NoteForm';
import useHttp from '../../hooks/use-http';
import { editNote } from '../../api';
import { useEffect } from 'react';
import { NoteType, Actuator } from '../../models/datatypes';

type EditType = {
	params: { data: NoteType, preset: { buttonText: string } },
	loading: boolean,
	error: string | null,
	onReloadData: (data: Actuator<NoteType>) => void,
}

const EditNote: React.FC<EditType> = (props) => {
	// connection to db
	const {
		data: editData,
		sendRequest: updatingData,
		status: editStatus,
		error: editError,
	} = useHttp(editNote);
	const { data, preset } = props.params;

	useEffect(() => {
		// should not trigger on props as then it would get stuck in infinite loop
		if (editStatus === 'completed' && !editError && editData) {
			// data gets sent to App root to get processed and loaded to state
			props.onReloadData({ action: 'edit', data: editData[0] });
		}
	}, [editStatus, editError, editData, props]);

	const noteUpdateHandler = (formData: NoteType) => {
		// add id to data and send of request
		updatingData({ ...formData, id: data.id });
	};

	return (
		<Section>
			<NoteForm
				onHandleNote={noteUpdateHandler}
				params={preset}
				loading={editStatus === 'pending' && !props.error}
				data={data}
			/>
			{editError && <p>{editError}</p>}
		</Section>
	);
};

export default EditNote;
