import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';

const navLink = [
	{ name: 'Home', link: ['/', '/home', '/new'] },
	{ name: 'About', link: ['/about'] },
];

// this probably should be further broken to smaller components
const Header = () => {
	return (
		<header className={classes.header}>
			<div className={classes['header-logo']}>
				<img alt='Logo' src='/logo.png' className={classes['header-logo__icon']} />
				<h1>TODO APP</h1>
			</div>
			<nav>
				{navLink.map((data) => (
					<NavLink
						key={data.name}
						// from provided links first is taken!
						to={data.link[0]}
						// fix to make Home active for all links
						isActive={(match, location) => data.link.includes(location.pathname)}
						activeClassName={classes.active}
						exact
					>
						{data.name}
					</NavLink>
				))}
			</nav>
		</header>
	);
};

export default Header;
