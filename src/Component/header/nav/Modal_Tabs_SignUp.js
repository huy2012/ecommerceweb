import {useState} from 'react'
import { Form, Input, Button, Checkbox , message , Space} from 'antd';
import { UserOutlined, LockOutlined , GoogleOutlined} from '@ant-design/icons';
import { Typography } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { getAuth , createUserWithEmailAndPassword  } from "firebase/auth";

import {showModalLogSign , hideModalLogSign, setTabsKey} from '../../../redux/reducer';
import app from '../../Firebase/firebase';

const { Title } = Typography;

const Modal_Tabs_SignUp = () => {

    const [form] = Form.useForm();

    const state = useSelector((state) => state.ecommerce);
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [passWord, setPassWord] = useState('');

    const onFinish = (values) => {
        handleSignUp();
    };

    const handleSignUp = () => {
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, email, passWord)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
                message.success("Đăng ký thành công !");
                setEmail('');
                setPassWord('');
                form.resetFields();
                dispatch(setTabsKey("1"));
                // dispatch(hideModalLogSign());
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                message.error(errorMessage);
            });
    };

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };

    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input value={email} onChange={(e)=> setEmail(e.target.value)} />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password value={passWord} onChange={(e)=> setPassWord(e.target.value)} />
            </Form.Item>


            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" >
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Modal_Tabs_SignUp;
