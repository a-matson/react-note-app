import classes from './Dropdown.module.css';

const Dropdown: React.FC = (props) => {
	return (
		<div className={classes.dropdown}>
			<div>
			<ul>
				{/* expects buttons */}
				{props.children}
				</ul>
			</div>
		</div>
	);
};

export default Dropdown;
