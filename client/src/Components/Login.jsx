import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { fetchLogin } from "../Redux/authAction";

const Login = props => {
  const onFinish = values => {
    props.auth_login(values);
  };

  if (props.auth == true) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <h2 className="text-center mt-4">Login Form</h2>
      <div className="col-md-5 m-auto border border-dark rounded p-4 my-4">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              {
                required: true,
                message: "Please input your E-mail!"
              }
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!"
              }
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <Link to="/register">register now!</Link>
          </Form.Item>
        </Form>
      </div>
      <p className="text-center">{props.login}</p>
    </>
  );
};

const mapStateToProps = state => ({
  auth: state.auth.status,
  login: state.auth.message
});
const mapDispatchToProps = dispatch => ({
  auth_login: res => dispatch(fetchLogin(res))
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
