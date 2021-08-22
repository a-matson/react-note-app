import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import useHttp from './hooks/use-http';
import { getNotes } from './api';

import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Modal from './pages/Modal';

import Header from './components/UI/Header';

import { NoteType, Actuator } from './models/datatypes';

const App = () => {
	// paths that modal windows appear at
	const modalPaths = ['/notes/:noteId', '/notes/:noteId/edit'];
	// setting state for toggling visibility of new note adding component
	// this state is lifted to the App as it would keep the state of closed component,
	// even if you move to other links of the app, to return the state refresh the page
	// on load state is set to whether you're at url of /new
	const [isNewNoteClosed, setNewNoteClosed] = useState<boolean>(window.location.pathname !== '/new');
	// to avoid constant data passing through levels and since I didn't introduce Redux
	// the app keeps notes as a state in app's root
	const [notes, setNotes] = useState<NoteType[]>([]);
	// import of the hook for communication with json-server
	const { sendRequest: fetchNotes, status, data, error } = useHttp(getNotes);
	// handler of notes state modification
	const reloadDataHandler = useCallback(
		(props: Actuator<NoteType> | null = null) => {
			if (props) {
				if (props.action === 'add')
					// if we have data then we are adding note
					setNotes((prevNotes) => prevNotes.concat(props.data));
				else if (props.action === 'delete')
					// otherwise removing note with the given id
					setNotes((prevNotes) =>
						prevNotes.filter((note) => {
							return note.id !== props.data.id;
						})
					);
				else if (props.action === 'edit')
					// replacing object with matching id with new data
					setNotes((prevNotes) =>
						prevNotes.map((note) =>
							note.id === props.data.id ? props.data : note
						)
					);
				// otherwise we are just loading list
			} else fetchNotes(false);
		},
		[fetchNotes]
	);

	// for each time data loads catch the change and update the state to cause rendering
	useEffect(() => {
		if (status === 'completed' && !error && data) setNotes(data);
	}, [data, status, error]);

	// forcing re-rendering after modifying notes state
	useEffect(reloadDataHandler, [reloadDataHandler]);

	return (
		<Fragment>
			<Header />
			<Switch>
				{/* To not re-render background for modal windows, main path accepts sub paths that cause modals */}
				<Route path={['/', '/home', '/new', ...modalPaths]} exact>
					<Route path={modalPaths} exact>
						<Modal
							onReloadData={reloadDataHandler}
							data={{ notes, status, error }}
						/>
					</Route>
					<Home
						data={{ notes, status, error, isNewNoteClosed }}
						onReloadData={reloadDataHandler}
						onCloseNewNote={setNewNoteClosed}
					/>
				</Route>
				<Route path="/about" component={About} exact />
				<Route component={NotFound} />
			</Switch>
		</Fragment>
	);
};

export default App;
