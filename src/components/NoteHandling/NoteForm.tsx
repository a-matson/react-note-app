import React, { useRef } from 'react';
import { NoteType } from '../../models/datatypes';

import classes from './NoteForm.module.css';

const validateInput = (input: string): Boolean => {
	// minimal form validation
	return input.trim().length > 0;
};

type NoteFormType = {
	onHandleNote: (props: NoteType) => void;
	data?: NoteType;
	loading: boolean;
	params?: { buttonText: string };
}

const NoteForm: React.FC<NoteFormType> = (props) => {
	// References for easy access of input fields
	const textInputRef = useRef<HTMLTextAreaElement>(null);
	const titleInputRef = useRef<HTMLInputElement>(null);

	// if data isn't provided set empty values
	const data = props.data ?? { title: undefined, text: undefined };
	// set submit text
	const { buttonText } = props.params ?? { buttonText: 'Add' };

	const submitHandler = (event: React.FormEvent) => {
		event.preventDefault();
		// getting values
		const textInput = textInputRef.current!.value;
		const titleInput = titleInputRef.current!.value;
		// validating
		if (validateInput(textInput) && validateInput(titleInput)) {
			// passing data up for saving in db
			props.onHandleNote({
				title: titleInput,
				text: textInput,
				date: new Date(),
			});
		}
	};

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<input
				type="text"
				ref={titleInputRef}
				placeholder="Title"
				defaultValue={data.title}
			/>
			<textarea
				ref={textInputRef}
				placeholder="Description"
				defaultValue={data.text}
			></textarea>
			<div>
				<button type="submit">
					{props.loading ? 'Sending...' : buttonText}
				</button>
				{props.children}
			</div>
		</form>
	);
};

export default NoteForm;
