import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Table, Button } from 'react-bootstrap';
import { con } from '../../../config/config';
import axios from 'axios';
import { selectUserInfo } from '../../../user/selector';

export class List extends React.Component {
	state = {
		requesting: false,
		error: false,
		errorMessage: '',
		data: []
	}

	loadData = async () => {
		if (this.state.requesting) {
			return;
		}

		this.setState({
			requesting: true
		});

		try {
			let url = (this.props.userInfo.roles.includes('TICKETS_ADMIN')) 
				? `${con.url}/tickets/all` 
				: `${con.url}/tickets/by-user`;
			let response = await axios.get(url, {
				headers: {
					'Authorization': `bearer ${JSON.parse(localStorage['token'])}`
				}
			});

			this.setState({
				requesting: false,
				data: response.data.result
			})
		} catch (error) {
			this.setState({
				requesting: false,
				error: true,
				errorMessage: (error.response.status === 403) ? 'Not Authorized!' : 'An error occured!',
			});
		}
	}

	componentDidMount() {
    this.loadData();
  }

	render() {
		const { requesting, error, errorMessage, data } = this.state;
		const { roles } = this.props.userInfo;

		let list;
		if (data.length === 0) {
			if (requesting) {
				list = <tr><td colSpan="100%">Loading ...</td></tr>;
			} else if (error) {
				list = <tr><td colSpan="100%">{errorMessage}</td></tr>;
			} else {
				list = <tr><td colSpan="100%">No items found.</td></tr>;
			}
		} else {
			list = data.map((item, index) => {
				let child;
				if (item.child.length > 0) {
					child = (
						<tr>
							<td colSpan="100%">
								<Table size="sm">
									<thead>
										<tr>
											<th>Reply Subject</th>
											<th>Reply Body</th>
											<th>Created at</th>
										</tr>
									</thead>
									<tbody>
									{item.child.map((childItem, childIndex) => (
										<tr key={childIndex}>
											<td>{childItem.subject}</td>
											<td>{childItem.body}</td>
											<td>{childItem.created_at}</td>
										</tr>
									))}
									</tbody>
								</Table>
							</td>
						</tr>
					);
				}

				return (
					<React.Fragment key={index}>
						<tr>
							<td>{item.subject}</td>
							<td>{item.body}</td>
							<td>{item.status}</td>
							<td>{item.user.fullname}</td>
							<td>{item.created_at}</td>
							{roles.includes('TICKETS_ADMIN') && (
								<td>
									<Link to={'/ticket/reply/' + item.id}>
										<Button variant="primary" size="sm">Reply</Button>
									</Link>
								</td>
							)}
						</tr>
						{child}
					</React.Fragment>
				);
			});
		}

		return (
			<Row className="justify-content-center mt-5">
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Subject</th>
							<th>Body</th>
							<th>Status</th>
							<th>Created by</th>
							<th>Created at</th>
							{roles.includes('TICKETS_ADMIN') && (
								<th>Actions</th>
							)}
						</tr>
					</thead>
					<tbody>
						{list}
					</tbody>
				</Table>
			</Row>
		);
	}
}

List.propTypes = {
	userInfo: PropTypes.object
};

const mapStateToProps = (state) => ({
	userInfo: selectUserInfo(state)
});

export default connect(mapStateToProps, null)(List);
