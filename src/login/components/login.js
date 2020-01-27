import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectMessages } from '../selector';
import Message from '../../share/messages';
import { loginRequesting } from '../actions';
import { Link } from 'react-router-dom';
import {Form, Row, Col, Button, Card} from 'react-bootstrap';

export class Login extends React.Component {
	state = {
		email: '',
		password: '',
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault();

		if (this.state.email && this.state.password) {
			this.props.onSubmit({email: this.state.email, password: this.state.password})
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
									<Button variant="primary" type="submit">
										Sign in
									</Button>
								</Form>
							</Col>
						</Row>
						<Row className="justify-content-md-center mt-2">
							<Col md="auto">Don't have an account? <Link to="/register"> Register Here </Link></Col>
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

Login.propTypes = {
	handleSubmit: PropTypes.func,
	onSubmit: PropTypes.func,
	messages: PropTypes.array
};

const mapStateToProps = (state) => ({
	messages: selectMessages(state)
});

const mapDispatchToProps = (dispatch) => ({
	onSubmit: (value) => {
		dispatch(loginRequesting(value))
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
