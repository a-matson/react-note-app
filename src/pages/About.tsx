import Section from '../components/UI/Section';

const About = () => {
	return (
		<Section>
			<h1>About us page</h1>
			<p>
				This app keeps at all times a local list of notes. This list is kept in
				a state within the root of the App that allows to pass them to children
				components as well as allow them to update them.
			</p>
			<p>
				Communication with the database is established through a custom hook
				that requires passing a function that makes an actual request to the
				server. The hook is created to use the reducer as states would cause
				problems with memory leaks as there might be multiple requests to the
				same state at the same time.
			</p>
			<p>
				Such a way of an update of variables requires the usage of side effects
				to catch changes. Since side effects tend to cause infinite loops
				useCallback is often used to make it run once.
			</p>
			<p>
				Potentially, such an app would've benefited from using Redux to avoid
				chains like `onReloadData`, however, I didn't want to implement it at
				the state I was at and for such a small scale app I would say Redux
				would've been redundant.
			</p>
			<p>
				The solution in which way modals are handled through a single `Modal`
				page is not the best solution in a long term but is very convenient.
			</p>
		</Section>
	);
};

export default About;
