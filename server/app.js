import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

let users = [];
let todos = [];


const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.json());

const authList = (req, res, next) => {
    const user = users.find(user => user.token === req.headers.authorization)
    if (user) {
        next()
    }
}

app.post('/', (req, res) => {
    const {body} = req;
    const user = users.find(user => user.username === body.values.username && user.password === body.values.password)
    res.json({message: 'User is authorized', token: user.token, check: true})
    if (user) {
        res.json(
            {message: 'User is authorized', token: user.token, check: true, users});
    } else {
        res.json({message: 'Such user is not registered', token: user.token, check: false, users});
        res.status(401).send('Unauthorized')
    }

});

app.post('/registration', (req, res) => {
    const {body} = req;
    let user;
    const token = req.headers.authorization;
    try {
        user = users.find(user => user.username === body.values.username && user.email === body.values.email)
        if (!user) {
            const addUser = {
                ...body.value,
                token: token,
            }
            users.push(addUser)
            res.json({message: 'The new user is registered', check: true, new: users});
        }
    } catch (error) {
        console.error(error)
        res.json({message: 'Such user is already registered', check: false, users});
    }

});

app.post('/secure/user/list/save', authList, (req, res) => {
    const {body} = req;
    todos.push({id: body.id, name: body.name})
    res.json({message: 'Saved'})


});


app.post('/secure/user/list/delete', authList, (req, res) => {
    const {body} = req;
    todos.splice(todos.findIndex(line => line.id === body.id), 1)
    res.json({message: 'Deleted'})

});

app.get('/secure/user/list', authList, (req, res) => {
    res.json({message: 'GET request authorized', todos: todos, check: true, token: req.headers.authorization});

});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

