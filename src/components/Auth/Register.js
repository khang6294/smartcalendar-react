import React, { useState } from "react";
import { Form, Input, Button, Icon } from "antd";

const FormItem = Form.Item;


const register = (props) => {
    const [values, setValues] = useState({ name: "", email: "", password: "" });

	const handleChange = (name, value) => {
		setValues({ ...values, [name]: value });
    };

	const handleSubmit = e => {
		e.preventDefault();
		props.form.validateFields((err, values) => {
			if (!err) {
				props.getSignUpInfo(values)
			}
		});
    };
    
    const onToggleToLogin = () => {
        props.onToggleToLogin()
    }
    const { getFieldDecorator } = props.form;
    return (
        <>
        <div className="auth-background" />
        <div className="logo">
            Smart Calendar
        </div>
        <Form onSubmit={handleSubmit} className="register-form">
            <h1 className="welcome">Register</h1>
            <FormItem className="login-field">
            <h5 className="login-field-name">FULL NAME</h5>
            {getFieldDecorator("name", {
                rules: [
                    { required: true, message: "Please input your full name!" }
                ]
            })(
                <Input
                className="login-input"
                prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Full name"
                onChange={handleChange}
                />
            )}
            </FormItem>
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
                type="email"
                className="login-input"
                prefix={
                    <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="example@example.com"
                onChange={handleChange}
                />
            )}
            </FormItem>
            <FormItem className="login-field">
            <h5 className="login-field-name">PASSWORD</h5>
            {getFieldDecorator("password", {
                rules: [
                    { required: true, message: "Please input your password!" },
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
                Sign me up
            </Button>
            </FormItem>
            <div className="register">
                Had an account already?{" "}
                <div className="login-link" href onClick = {onToggleToLogin}>
                    Login
                </div>
            </div>
        </Form>
        </>
    );
}

export default Form.create()(register);