import { NoteType } from "./models/datatypes";

const DB = '/api';

export async function getNotes():Promise<NoteType[]> {
	// if note id is passed then we retrieve a specific note
	const response = await fetch(DB);
	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || 'Could not get data.');
	}

	return data;
}

export async function addNote(noteData: NoteType):Promise<NoteType[]> {
	const response = await fetch(`${DB}`, {
		method: 'POST',
		body: JSON.stringify(noteData),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	
	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || 'Could not create note.');
	}
	return [data];
}

export async function deteleNote(noteId: number) {
	const response = await fetch(`${DB}/${noteId}`, { method: 'DELETE' });
	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || 'Could not delete note.');
	}

	return null;
}

export async function editNote(noteData: NoteType):Promise<NoteType[]> {
	const response = await fetch(`${DB}/${noteData.id}`, {
		method: 'PATCH',
		body: JSON.stringify(noteData),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || 'Could not edit note.');
	}

	return [data];
}