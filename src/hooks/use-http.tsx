import { useReducer, useCallback } from 'react';
import { NoteType } from '../models/datatypes';

type Action = {
	type: 'SEND'
} | {
	type: 'ERROR'; errorMessage: string
} | {
	type: 'SUCCESS', responseData: NoteType[];
};

interface State {
	status: string;
	error: string | null;
	data: NoteType[] | null;
}

// reducer template for state handling
const httpReducer = (state: State, action: Action): State => {
	if (action.type === 'SEND') {
		return { ...state, status: 'pending' };
	}
	if (action.type === 'ERROR') {
		return { ...state, error: action.errorMessage, status: 'completed' };
	}
	if (action.type === 'SUCCESS') {
		return { ...state, data: action.responseData, status: 'completed' };
	}

 	return state;
};

const useHttp = (requestFunction: (data: any) => any) => {
	// creating states for some context if requested with reducer
	const [httpState, dispatch] = useReducer(httpReducer, { status: 'idle', error: null, data: null});

	// by using callback returning async function
	const sendRequest = useCallback(
		async (requestData) => {
			dispatch({ type: 'SEND' });
			try {
				// passing provided function to handle data
				const responseData = await requestFunction(requestData);
				dispatch({ type: 'SUCCESS', responseData });
			} catch (error) {
				dispatch({
					type: 'ERROR',
					errorMessage: error.message || 'Something went wrong!',
				});
			}
		},
		[requestFunction]
	);

	return {
		sendRequest,
		...httpState,
	};
};

export default useHttp;
