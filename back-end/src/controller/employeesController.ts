import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import employee from '../models/employees';

export const getEmployees = async (request: Request, response: Response) => {
  const employees = await getRepository(employee).find()
  return response.json(employees)
};

export const getEmployee = async (request: Request, response: Response) => {
  const { id } = request.params
  const semployee = await getRepository(employee).findOne(id)
  return response.json(semployee)
}

export const saveEmployee = async (request: Request, response: Response) => {
  const cemployee = await getRepository(employee).save(request.body)
  return response.json(cemployee)
};

export const updateEmployee = async (request: Request, response: Response) => {
  const { id } = request.params

  const cemployee = await getRepository(employee).update(id, request.body)

  if(cemployee.affected === 1) {
    const employeeupdated = await getRepository(employee).findOne(id)
    return response.json(employeeupdated)
  }

  return response.status(404).json({ message: 'employee not found!' })
};

export const removeEmployee = async (request: Request, response: Response) => {
  const { id } = request.params

  const cemployee = await getRepository(employee).delete(id)

  if (cemployee.affected === 1 ) {
    const employeeremoved = await getRepository(employee).findOne(id)
    return response.json({ message: 'employee removed' })
  }

  return response.status(404).json({ message: 'employee not found'})
}