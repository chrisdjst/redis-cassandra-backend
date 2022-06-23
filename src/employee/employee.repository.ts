import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { Employee } from './employee.model';
import { CassandraService } from 'src/common/cassandra/cassandra.service';

@Injectable()
export class EmployeeRepository implements OnModuleInit {
  constructor(private cassandraService: CassandraService) {}

  employeeMapper: mapping.ModelMapper<Employee>;

  onModuleInit() {
    const mappingOptions: mapping.MappingOptions = {
      models: {
        Employee: {
          tables: ['employee'],
          mappings: new mapping.UnderscoreCqlToCamelCaseMappings(),
        },
      },
    };

    this.employeeMapper = this.cassandraService
      .createMapper(mappingOptions)
      .forModel('Employee');
  }

  async getEmployees() {
    return (await this.employeeMapper.findAll()).toArray();
  }
}
