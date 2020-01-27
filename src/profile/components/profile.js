import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectMessages } from '../selector';
import Message from '../../share/messages';
import { updateRequesting } from '../actions';
import {Form, Row, Col, Button, Card} from 'react-bootstrap';
import { selectUserInfo } from '../../user/selector';

export class Profile extends React.Component {
	state = {
		fullname: this.props.userInfo.fullname
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault();

		if (this.state.fullname) {
			this.props.onSubmit({fullname: this.state.fullname})
		} else {
			alert('You must fill all the fields!');
		}
	}

	render() {
		const { userInfo, messages } = this.props;

		return (
			<Row className="justify-content-center mt-5">
				<Card>
					<Card.Header>Profile</Card.Header>
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
											<Form.Control plaintext readOnly defaultValue={userInfo.email} />
										</Col>
									</Form.Group>
									<Button variant="primary" type="submit">
										Update
									</Button>
								</Form>
							</Col>
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

Profile.propTypes = {
	handleSubmit: PropTypes.func,
	onSubmit: PropTypes.func,
	userInfo: PropTypes.object,
	messages: PropTypes.array
};

const mapStateToProps = (state) => ({
	userInfo: selectUserInfo(state),
	messages: selectMessages(state)
});

const mapDispatchToProps = (dispatch) => ({
	onSubmit: (value) => {
		dispatch(updateRequesting(value))
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
