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
			let response = await axios.get(`${con.url}/users`, {
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
				errorMessage: (error.response && error.response.status === 403) ? 'Not Authorized!' : 'An error occured!',
			});
		}
	}

	componentDidMount() {
    this.loadData();
  }

	render() {
		const { requesting, error, errorMessage, data } = this.state;

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
			list = data.map((item, index) => (
				<tr key={index}>
					<td>{item.fullname}</td>
					<td>{item.email}</td>
					<td>{item.created_at}</td>
					<td>
						<Link to={'/user/edit/' + item.id}>
							<Button variant="primary" size="sm">Edit</Button>
						</Link>
					</td>
				</tr>
			));
		}

		return (
			<Row className="justify-content-center mt-5">
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Fullname</th>
							<th>Email</th>
							<th>Created at</th>
							<th>Actions</th>
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
