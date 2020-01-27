import React from 'react';
import { Row, Col, Button, Card, Form } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { con } from '../../../config/config';
import axios from 'axios';
import Message from '../../../share/messages';

export class Edit extends React.Component {
	state = {
		requesting: false,
		error: false,
		message: '',
		id: this.props.match.params.id,
		fullname: '',
		email: ''
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = async (event) => {
		event.preventDefault();

		if (this.state.requesting) {
			return;
		}

		this.setState({
			requesting: true
		});

		try {
			await axios.put(`${con.url}/users/update`, {
					id: this.state.id,
					fullname: this.state.fullname
				},
				{
					headers: {
						'Authorization': `bearer ${JSON.parse(localStorage['token'])}`
					}
				}
			);

			this.setState({
				requesting: false,
				message: 'Updated Successfully!'
			})
		} catch (error) {
			this.setState({
				requesting: false,
				error: true,
				message: (error.response.status === 403) ? 'Not Authorized!' : 'An error occured!',
			});
		}
	}

	loadData = async () => {
		if (this.state.requesting) {
			return;
		}

		this.setState({
			requesting: true
		});

		try {
			let response = await axios.get(`${con.url}/users/${this.props.match.params.id}`, {
				headers: {
					'Authorization': `bearer ${JSON.parse(localStorage['token'])}`
				}
			});

			this.setState({
				requesting: false,
				fullname: response.data.user.fullname,
				email: response.data.user.email
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
		const { message } = this.state;
		const { match } = this.props;

		return (
			<Row className="justify-content-center mt-5">
				<Card>
					<Card.Header>Edit User #{match.params.id}</Card.Header>
					<Card.Body>
						<Row>
							<Col md="auto">
								<Form onSubmit={this.handleSubmit}>
									<Form.Group>
										<Form.Label>Fullname</Form.Label>
										<Form.Control
											name="fullname"
											type="text"
											id="fullname"
											className="fullname"
											label="Fullname"
											placeholder="Fullname"
											value={this.state.fullname}
											onChange={this.handleChange}
										/>
									</Form.Group>
									<Form.Group>
										<Form.Label>Email</Form.Label>
										<Col>
											<Form.Control plaintext readOnly defaultValue={this.state.email} />
										</Col>
									</Form.Group>
									<Button variant="primary" type="submit">
										Update
									</Button>
								</Form>
							</Col>
						</Row>
						<Row className="justify-content-md-center">
							<Col md="auto"><div>{!!message && <Message message={message} />}</div></Col>
						</Row>
					</Card.Body>
				</Card>
			</Row>
		);
	}
}

export default withRouter(Edit);
