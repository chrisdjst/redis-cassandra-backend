import { Controller, Get } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller()
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get('employees')
  async getEmployees() {
    return this.employeeService.getEmployees();
  }
}
