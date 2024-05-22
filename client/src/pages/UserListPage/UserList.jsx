import axios from "axios";
import {useEffect, useState} from "react"
import {Formik, Field, Form} from "formik";
import '../style.scss'
import {v4 as uuidv4} from 'uuid';
import { API_SAVE_ITEM, API_LIST, API_DELETE_ITEM } from '../../urls';
import {useLocation, useNavigate, useParams} from "react-router-dom";

export default function UserList() {
    const navigate = useNavigate()
    const location = useLocation();
    const [list, setList] = useState([])
    const [token, setToken] = useState('')
    const headers = {
        'Authorization': token, 'Content-Type': 'application/json'}

    const newData = async () => {
        await axios.get(API_LIST, {headers})
            .then(response => {
                setList(response.data.todos)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    useEffect(() => {
        try {
            if(location.state.token) {
                setToken(location.state.token)
                newData().then()
            }
        } catch (error) {
            console.error(error)
            navigate('/error')
        }

    }, [])
    const save = async (values) => {
        const postData = {
            id: list.length + 1,
            name: values.newItem,
        };

        await axios.post(API_SAVE_ITEM, postData, {headers})
            .then(response => {
                console.log('Response:', response.data.message);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        newData().then()
    }

    const deleteLine = async (itemId) => {
        const postData = {
            id: itemId
        };
        await axios.post(API_DELETE_ITEM, postData, {headers})
            .then(response => {
                console.log('Response:', response.data.message);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        newData().then()
    }

    return (
        <div className='SignInForm'>
            <h2 className={'title'}>My List</h2>
            <Formik
                initialValues={{
                    newItem: '',
                }}
                onSubmit={(values, { resetForm }) => {
                    save(values).then()
                    resetForm()
                }}
            >
                <Form>
                    <div>
                        {list.map(element => (
                            <ul className={'list'} key={uuidv4()}>
                                <li  id={'list-line'}>
                                    {element.id} {element.name}
                                    <button type="button" className={'delete-item'} id={element.id}
                                            onClick={() => deleteLine(element.id).then()}>Delete
                                    </button>
                                </li>
                            </ul>
                        ))}

                    </div>
                    <div>
                        <label htmlFor="newItem">Add new item to list</label><br/>
                        <Field type="text" id="newItem" name="newItem" className={'newItem'}/>
                    </div>
                    <button type="submit" className={'save-item'}>Save</button>
                </Form>
            </Formik>
        </div>
    )
}