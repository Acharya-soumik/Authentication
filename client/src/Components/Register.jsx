import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, Route } from "react-router-dom";
import { fetchRegister } from "../Redux/authAction";
import { connect } from "react-redux";

const Register = props => {
  const onFinish = values => {
    props.auth_register(values);
  };

  return (
    <>
      <h2 className="text-center mt-4">New User Registration</h2>
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
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!"
              }
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
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
              register now
            </Button>
            Or <Link to="/login">login now!</Link>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  auth_register: res => dispatch(fetchRegister(res))
});
export default connect(null, mapDispatchToProps)(Register);
