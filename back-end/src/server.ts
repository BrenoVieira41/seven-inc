import express from 'express';
import  cors from 'cors';
import './database';

import { getEmployees, saveEmployee, getEmployee, updateEmployee, removeEmployee } from './controller/employeesController';

const app = express();

app.use(express.json());
app.use(cors())

app.get('/', (request, response) => response.json({ message: 'Hello World hi' }));


app.get('/employees', getEmployees)
app.get('/employees/:id', getEmployee)
app.post('/employees', saveEmployee)
app.put('/employees/:id', updateEmployee)
app.delete('/employees/:id', removeEmployee)

app.listen(3333);
