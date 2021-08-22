import { Fragment } from 'react';
import { createPortal } from 'react-dom';
import classes from './Overlay.module.css';
import { useHistory } from 'react-router-dom';

const Backdrop: React.FC = () => {
	const history = useHistory();

	// if backdrop is clicked we are cancelling by going back/home
	const handleClosing = () => {
		// go back or return to main page
		if (history.length) history.goBack();
		else history.push('/');
	};
	return <div className={classes.backdrop} onClick={handleClosing} />;
};

const Modal: React.FC = (props) => {
	return <section className={classes.modal}>{props.children}</section>;
};

const Overlay: React.FC = (props) => (
	<Fragment>
		{/* Moving modal and backdrop to body element when rendering */}
		{createPortal(<Backdrop />, document.getElementById('backdrop-root')!)}
		{createPortal(
			<Modal>{props.children}</Modal>,
			document.getElementById('modal-root')!
		)}
	</Fragment>
);

export default Overlay;
