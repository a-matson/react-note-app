export interface NoteType {
	id?: number,
	title?: string,
	text?: string,
	date?: Date
};

export interface Actuator<T> {
	action: string,
	data: T
};