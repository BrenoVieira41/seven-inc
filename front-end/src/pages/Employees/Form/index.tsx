import React, { useState, useEffect, ChangeEvent } from 'react';
import { useHistory, useParams,  } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap'; 
import moment from 'moment'; 

import './index.css';
import api from '../../../services/api';

interface IEmployee {
  name: string;
  bornDate: string;
  position: string;
  salary: string;
}

interface IParamsProps {
  id: string;
}

const Employees: React.FC = () => {

  const history = useHistory()
  const { id } = useParams<IParamsProps>();

  const [model, setModel] = useState<IEmployee>({
    name: '',
    bornDate: '',
    position: '',
    salary: ''
  });

  useEffect(() => {
    if (id !== undefined) {
      findEmployees(id)
    }
  }, [id]);

  function updatedModel(e: ChangeEvent<HTMLInputElement>) {

    setModel({
      ...model,
      [e.target.name]: e.target.value
    });

  }

  function formateDate(date: Date) {
    return moment(date).format("YYYY-MM-DD")
  }

  async function onSubmit (e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    if (id !== undefined) {
      
      const response = await api.put(`/employees/${id}`, model)
    } else {

    const response = await api.post('/employees', model)
  }

  }

  async function findEmployees (id: string) {
    const response = await api.get(`employees/${id}`)
    setModel({
      name: response.data.name,
      bornDate: formateDate(response.data.bornDate),
      position: response.data.position,
      salary: response.data.salary
    })
  }

  function back () {
    history.goBack()
  }

  return (
    <div className="container">
      <br/>
        <div className="employees-header">
          <h3>Dados do Funcionários</h3>
          <Button variant="dark" size="sm" onClick={back} >Voltar</Button>
        </div>
        <br/>
        <div className="container">
          <Form onSubmit={onSubmit}>
            <Form.Group >
            <Form.Label>Nome</Form.Label>
            <Form.Control 
            type="text"
            name="name"
            value={model.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
            />
          </Form.Group>

          <Form.Group >
            <Form.Label>Data de Nascimento</Form.Label>
            <Form.Control 
            type="Date"
            name="bornDate"
            value={model.bornDate}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
            />
          </Form.Group>

          <Form.Group >
            <Form.Label>Cargo Exercido</Form.Label>
            <Form.Control 
            type="text"
            name="position"
            value={model.position}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
            />
          </Form.Group>

          <Form.Group >
            <Form.Label>Salário</Form.Label>
            <Form.Control 
            type="value" 
            placeholder="Digite o valor sem utilizar ponto/virgula "
            name="salary"
            value={model.salary}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" >
            Salvar
          </Button>
          </Form> 
        </div>
    </div>

  );
}

export default Employees;