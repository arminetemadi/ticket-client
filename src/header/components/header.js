import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { logoutHandle } from '../helper';
import { selectUserInfo } from '../../user/selector';

export class Header extends React.Component {
	render() {
		const { userInfo } = this.props;

		let isLoggedIn = !!userInfo && !!userInfo.email && userInfo.email.length > 0;
		if (!isLoggedIn)
			return null;

		return (
			<Navbar bg="light">
				<Navbar.Brand href="#home">Ticket System</Navbar.Brand>
				<Nav className="mr-auto">
					{!userInfo.roles.includes('USERS_ADMIN') && (
						<NavDropdown title="Ticket">
							<NavDropdown.Item href="/ticket/list">List</NavDropdown.Item>
							{!userInfo.roles.includes('TICKETS_ADMIN') && (
								<>
									<NavDropdown.Divider />
									<NavDropdown.Item href="/ticket/add">Add</NavDropdown.Item>
								</>
							)}
						</NavDropdown>
					)}
					{userInfo.roles.includes('USERS_ADMIN') && (
						<NavDropdown title="User">
							<NavDropdown.Item href="/user/list">List</NavDropdown.Item>
						</NavDropdown>
					)}
				</Nav>
				<Nav>
					<NavDropdown title={userInfo.fullname}>
						<NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item onClick={logoutHandle}>Logout</NavDropdown.Item>
					</NavDropdown>
				</Nav>
			</Navbar>
		);
	}
}

Header.propTypes = {
	userInfo: PropTypes.object
};

const mapStateToProps = (state) => ({
	userInfo: selectUserInfo(state)
});

export default connect(mapStateToProps, null)(Header);