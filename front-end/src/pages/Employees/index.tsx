import React, { useState, useEffect } from 'react';
import { Table, Button, Card } from 'react-bootstrap'; 
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment'; 

import './index.css';
import api from '../../services/api';

interface IEmployee {
  id: string;
  name: string;
  bornDate: Date;
  position: string;
  salary: number;
  created_at: Date;
  updated_at: Date;

}

const Employees: React.FC = () => {

  const [employees, setEmployees] = useState<IEmployee[]>([])
  

  const history = useHistory()

  useEffect(() => {
    loadEmployees()
  }, [])


if (!employees) {
  return <p>Carregando...</p>;
}

  async function loadEmployees() {

    const response = await api.get('/employees')
    setEmployees(response.data)
  }


  function formateDate(date: Date) {
    return moment(date).format("DD/MM/YYYY")
  }

  async function deleteEmployees (id: string) {
    await api.delete(`/employees/${id}`)
    loadEmployees()
  }

  function newEmployees () {
    history.push('/funcionarios_cadastro')
  }

  function editEmployees (id: string) {
    history.push(`/funcionarios_cadastro/${id}`)
  }

  function viewEmployees (id: string) {
    history.push(`/funcionarios/${id}`)
  }

  return (
    <div className="container">
      <br/>
      <div className="employees-header">
      <h1>Lista de Funcionários</h1>
      <Button variant="dark" size="sm" onClick={newEmployees}>Adicionar Funcionário</Button>
      </div>
      <br/>
      {employees && employees.length > 0 ? 
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data de Nascimento</th>
            <th>Cargo Exercido</th>
            <th>Salário</th>
            <th>Data de Atualização</th>
            <th>Ações</th>
            </tr>
          </thead>
          <tbody>

            {
              employees.map(employee => (
                <tr key={employee.id}>
                  <td> {employee.name} </td>
                  <td> {formateDate(employee.bornDate)} </td>
                  <td> {employee.position} </td>
                  <td> {employee.salary} </td>
                  <td> {formateDate(employee.updated_at)} </td>
                  <td>
                    <Button size="sm" onClick={() => editEmployees(employee.id)} >Editar</Button>{' '}
                    <Button size="sm" variant="info" onClick={() => viewEmployees(employee.id)}>Visualizar</Button>{' '}
                    <Button size="sm" variant="danger" onClick={() => deleteEmployees(employee.id)}>Remover</Button>{' '}
                  </td>
                </tr>
              ))
            }

            
        </tbody>
      </Table>
      :
      <Card body>Poxa, ainda não temos nenhum funcionário cadastrado</Card>
      }
    </div>
  );
}

export default Employees;