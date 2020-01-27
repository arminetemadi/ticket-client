import React from 'react';
import Message from '../../../share/messages';
import {Form, Row, Col, Button, Card} from 'react-bootstrap';
import { con } from '../../../config/config';
import axios from 'axios';

export class Add extends React.Component {
	state = {
		subject: '',
		body: '',
		message: ''
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
			await axios.post(`${con.url}/tickets`, {
					subject: this.state.subject,
					body: this.state.body
				},
				{
					headers: {
						'Authorization': `bearer ${JSON.parse(localStorage['token'])}`
					}
				}
			);

			this.setState({
				requesting: false,
				message: 'Ticket Created Successfully!',
				subject: '',
				body: ''
			})
		} catch (error) {
			this.setState({
				requesting: false,
				error: true,
				message: 'An error occured!',
			});
		}
	}

	render() {
		const { subject, body, message } = this.state;
		return (
			<Row className="justify-content-center mt-5">
				<Card>
					<Card.Header>Add New Ticket</Card.Header>
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
											value={subject}
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
											value={body}
											onChange={this.handleChange}
										/>
									</Form.Group>
									{/* <Form.Group>
										<Form.Label>Example select</Form.Label>
										<Form.Control as="select">
											<option>1</option>
											<option>2</option>
											<option>3</option>
											<option>4</option>
											<option>5</option>
										</Form.Control>
									</Form.Group> */}
									<Button variant="primary" type="submit">
										Add
									</Button>
								</Form>
							</Col>
						</Row>
						<Row className="justify-content-md-center">
								<Col md="auto"><div>{message.length > 0 && <Message message={message} />}</div></Col>
						</Row>
					</Card.Body>
				</Card>
			</Row>
		);
	}
}

export default Add;
