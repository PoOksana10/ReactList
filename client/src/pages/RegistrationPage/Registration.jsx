import {Formik, Field, Form, ErrorMessage} from 'formik';
import {v4 as uuidv4} from 'uuid';
import * as Yup from 'yup';
import '../style.scss';
import {Outlet, Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { API_REGISTRATION } from '../../urls';


export default function Registration() {
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required').matches(/^[A-Z][a-z]{1,20}$/,
            'Wrong entry! Example: John'),
        lastName: Yup.string().required('Surname is required').matches(/^[A-Z][a-z]{1,20}$/,
            'Wrong entry! Example: Smith'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        username: Yup.string().required('Username is required').matches(/[A-Z][0-9][a-z]{6,20}$/,
            'Must have at least 1 uppercase, 1 lowercase letter, 1 number, be at least 8 characters long!'),
        password: Yup.string().required('Password is required').matches(/[A-Z][0-9][a-z]{6,20}$/,
            'Password must contain:\n' +
            '- at least 1 lowercase letter\n' +
            '- at least 1 uppercase letter\n' +
            '- at least 1 digit\n' +
            '- It must be at least 8 characters long'
        ),

    });
    const navigate = useNavigate()
    const send = async (value) => {

        const postData = {
            value
        };
        const token = uuidv4()
        const headers = {
            'Authorization': `${token}`,
            'Content-Type': 'application/json',
        };

        // Send the POST request
        await axios.post(API_REGISTRATION, postData, {headers})
            .then(response => {
                if (!response.data.check) {
                    alert(response.data.message);
                } else {
                    navigate('/')
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <>
            <div className='SignInForm'>
                <h2 className={'title'}>Registration Form</h2>
                <Formik
                    initialValues={
                        {
                            id: uuidv4(),
                            firstName: '',
                            lastName: '',
                            email: '',
                            username: '',
                            password: '',
                        }
                    }
                    onSubmit={(values, {resetForm}) => {
                        send(values).then()
                        resetForm()

                    }}
                    validationSchema={validationSchema}
                >
                    <Form>
                        <div className={'input-element'}>
                            <label htmlFor="firstName">First Name</label>
                            <Field type="text" id="firstName" name="firstName" className={'field'}/>
                            <ErrorMessage name="firstName" component="div" className="error"/>
                        </div>
                        <div className={'input-element'}>
                            <label htmlFor="lastName">Last Name</label>
                            <Field type="text" id="lastName" name="lastName" className={'field'}/>
                            <ErrorMessage name="lastName" component="div" className="error"/>
                        </div>
                        <div className={'input-element'}>
                            <label htmlFor="email">Email</label>
                            <Field type="email" id="email" name="email" className={'field'}/>
                            <ErrorMessage name="email" component="div" className="error"/>
                        </div>
                        <div className={'input-element'}>
                            <label htmlFor="username">Username</label>
                            <Field type="text" id="username" name="username" className={'field'}/>
                            <ErrorMessage name="username" component="div" className="error"/>
                        </div>
                        <div className={'input-element'}>
                            <label htmlFor="password">Password</label>
                            <Field type="password" id="password" name="password" className={'field'}/>
                            <ErrorMessage name="password" component="div" className="error"/>
                        </div >
                        <button type="submit" className={'submit-info'}>Submit</button>
                        <nav>
                            <ul>
                                <li>
                                    Click <Link to="/">here</Link> to Login...
                                </li>
                            </ul>
                        </nav>
                    </Form>
                </Formik>

            </div>
            <Outlet/>
        </>
    )
}