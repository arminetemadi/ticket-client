import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectMessages } from '../selector';
import { registerRequesting } from '../actions';
import { Link } from 'react-router-dom';
import Message from '../../share/messages';
import {Form, Row, Col, Button, Card} from 'react-bootstrap';

export class Register extends React.Component {
	state = {
		fullname: '',
		email: '',
		password: '',
		passwordConfirmation: '',
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault();

		if (this.state.password !== this.state.passwordConfirmation) {
			alert('Password and Password Confirmation does not match!');
		} else if (this.state.fullname && this.state.email && this.state.password && this.state.passwordConfirmation) {
			this.props.onSubmit({
				fullname: this.state.fullname,
				email: this.state.email,
				password: this.state.password,
				password_confirmation: this.state.passwordConfirmation
			})
		} else {
			alert('You must fill all the fields!');
		}
	}

	render() {
		const { messages } = this.props;

		return (

			<Row className="justify-content-center mt-5">
				<Card>
					<Card.Header>Login</Card.Header>
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
										<Form.Control
											name="email"
											type="text"
											id="email"
											className="email"
											label="Email"
											placeholder="Email"
											value={this.state.email}
											onChange={this.handleChange}
										/>
									</Form.Group>
									<Form.Group>
										<Form.Label>Password</Form.Label>
										<Form.Control
											name="password"
											type="password"
											id="password"
											className="password"
											label="Password"
											placeholder="Password"
											value={this.state.password}
											onChange={this.handleChange}
										/>
									</Form.Group>
									<Form.Group>
										<Form.Label>Password Confirmation</Form.Label>
										<Form.Control
											name="passwordConfirmation"
											type="password"
											id="passwordConfirmation"
											className="passwordConfirmation"
											label="Password Confirmation"
											placeholder="Password Confirmation"
											value={this.state.passwordConfirmation}
											onChange={this.handleChange}
										/>
									</Form.Group>
									<Button variant="primary" type="submit">
										Register
									</Button>
								</Form>
							</Col>
						</Row>
						<Row className="justify-content-md-center mt-2">
							<Col md="auto">Already have an account? <Link to="/login"> Login </Link></Col>
						</Row>
						<Row className="justify-content-md-center">
							<Col md="auto"><div>{!!messages.length && <Message message={messages[0].body} />}</div></Col>
						</Row>
					</Card.Body>
				</Card>
			</Row>
		);
	}
}

Register.propTypes = {
	handleSubmit: PropTypes.func,
	onSubmit: PropTypes.func,
	messages: PropTypes.array
};

export const mapStateToProps = (state) => ({
	messages: selectMessages(state)
});

export const mapDispatchToProps = (dispatch) => ({
	onSubmit: (value) => {
		dispatch(registerRequesting(value))
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
