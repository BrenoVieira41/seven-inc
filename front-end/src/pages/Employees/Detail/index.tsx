import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Badge, Button, Card } from 'react-bootstrap';

import api from '../../../services/api';
import moment from 'moment';

interface IEmployee {
    id: string;
    name: string;
    bornDate: Date;
    position: string;
    salary: number;
    created_at: Date;
    updated_at: Date;
  }

  interface IParamsProps {
    id: string;
  }

const Detail: React.FC = () => {

    const history = useHistory();
    const { id } = useParams<IParamsProps>();

    useEffect(() => {
      findEmployees()
    }, [id])

    const [employees, setEmployees] = useState<IEmployee>();

    async function findEmployees() {

      const response = await api.get<IEmployee>(`/employees/${id}`)
      console.log(response)
      setEmployees(response.data)
    }

    function formateDate(date: Date| undefined) {
      return moment(date).format("DD/MM/YYYY")
    }

    function back() {
        history.goBack()
    }

    return (
      <div className="container">
        <br/>
        <div className="employees-header">
            <h1>Detalhes do Funcionário</h1>
            <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
        </div>
        <br/>

       
        <Card>
          <Card.Body>
            <strong>Nome</strong>
            <Card.Title>{ employees?.name }</Card.Title>
            <strong>Cargo Atual</strong>
            <Card.Text>{ employees?.position }</Card.Text>
            <strong>Salario</strong>
            <Card.Text>{ employees?.salary }</Card.Text>
            <strong>Data de Nascimento </strong>
            <Card.Subtitle className="mb-2 text-muted">{formateDate(employees?.bornDate)}</Card.Subtitle>
            <br/>
            <strong>Data de Cadastro: </strong>
            <Badge variant="info">
              {formateDate(employees?.created_at)}
            </Badge>
            <br/>
            <strong>Data de Atualização: </strong>
            <Badge variant="info">
              {formateDate(employees?.updated_at)}
            </Badge>
          </Card.Body>
        </Card>

      </div>
  );
}

export default Detail;