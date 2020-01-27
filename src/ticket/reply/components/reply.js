import React from 'react';
import { Row, Col, Button, Card, Form } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { con } from '../../../config/config';
import axios from 'axios';
import Message from '../../../share/messages';
import { history } from '../../../history';

export class Reply extends React.Component {
	state = {
		requesting: false,
		error: false,
		message: '',
		parent: this.props.match.params.id,
		subject: '',
		body: '',
		status: '',
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
			await axios.post(`${con.url}/tickets/reply`, {
					parent: this.state.parent,
					subject: this.state.subject,
					body: this.state.body,
					status: this.state.status
				},
				{
					headers: {
						'Authorization': `bearer ${JSON.parse(localStorage['token'])}`
					}
				}
			);

			this.setState({
				requesting: false,
				message: 'Replied Successfully!'
			}, () => {
				setTimeout(() => {
					history.push('/ticket/list')
				}, 1000);
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
			let response = await axios.get(`${con.url}/tickets/${this.props.match.params.id}`, {
				headers: {
					'Authorization': `bearer ${JSON.parse(localStorage['token'])}`
				}
			});

			this.setState({
				requesting: false,
				status: response.data.ticket.status
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
					<Card.Header>Reply to ticket #{match.params.id}</Card.Header>
					<Card.Body>
						<Row>
							<Col md="auto">
								<Form onSubmit={this.handleSubmit}>
									<Form.Group>
										<Form.Label>Subject</Form.Label>
										<Form.Control
											name="subject"
											type="text"
											id="subject"
											className="subject"
											label="Subject"
											placeholder="Subject"
											value={this.state.subject}
											onChange={this.handleChange}
										/>
									</Form.Group>
									<Form.Group>
										<Form.Label>Body</Form.Label>
										<Form.Control
											name="body"
											type="text"
											id="body"
											className="body"
											label="Body"
											placeholder="Body"
											value={this.state.body}
											onChange={this.handleChange}
										/>
									</Form.Group>
									<Form.Group>
										<Form.Label>Ticket Status</Form.Label>
										<Form.Control 
											as="select"
											name="status"
											value={this.state.status}
											onChange={this.handleChange}
										>
											<option value="pending">Pending</option>
											<option value="answered">Answered</option>
											<option value="closed">Closed</option>
										</Form.Control>
									</Form.Group>
									<Button variant="primary" type="submit">
										Reply
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

export default withRouter(Reply);
