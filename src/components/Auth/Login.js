import React, { useState } from "react";
import { Form, Icon, Input, Button } from "antd";

const FormItem = Form.Item;
const login = (props) => {
	const [values, setValues] = useState({ email: "", password: "" });

	const handleChange = (name, value) => {
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		props.form.validateFields((err, values) => {
			if (!err) {
				props.getLoginInfo(values)
			}
		});
	};

	const onToggleToRegister = () => {
		props.onToggleToRegister()
	}

	const { getFieldDecorator } = props.form;
	return (
		<>
			<div className="auth-background" />
			<div className="logo">
				Smart Calendar
			</div>
			<Form onSubmit={handleSubmit} className="login-form">
				<h1 className="welcome">Login</h1>
				<FormItem className="login-field">
					<h5 className="login-field-name">EMAIL</h5>
					{getFieldDecorator('email', {
						rules: [{
							type: 'email', message: 'The input is not valid E-mail!',
						}, {
							required: true, message: 'Please input your E-mail!',
						}],
					})(
						<Input
							className="login-input"
							prefix={
								<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
							}
							placeholder="Email"
							onChange={handleChange}
						/>
					)}
				</FormItem>
				<FormItem className="login-field">
					<h5 className="login-field-name">PASSWORD</h5>
					{getFieldDecorator("password", {
						rules: [
						{ required: true, message: "Please input your password!" }
						]
					})(
						<Input
						className="login-input"
						prefix={
							<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
						}
						type="password"
						placeholder="Password"
						onChange={handleChange}
						/>
					)}
				</FormItem>
				<FormItem className="login-btn">
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button"
					>
						Login
					</Button>
				</FormItem>
				<div className="register">
				Need an account?{" "}
				<div className="login-link" onClick={onToggleToRegister}>
					Register
				</div>
				</div>
			</Form>
		</>
	);
}

export default Form.create()(login);