import { Injectable } from '@nestjs/common';
import { Client, mapping, auth } from 'cassandra-driver';

@Injectable()
export class CassandraService {
  client: Client;
  mapper: mapping.Mapper;
  private createClient() {
    this.client = new Client({
      keyspace: 'employeedb',
      cloud: {
        secureConnectBundle: 'secure-connect-cassis.zip',
      },
      credentials: {
        username: 'cbrCJGFLvXOFWyJACWahyYfg',
        password:
          '9E_tGYt2wGQd_SYRp6T0ztMQojwvR6eWx5Q6yRJLa4698d_EOgZBX-Ptzwo1jNQh6F2B9WCJBO6qMzyK-,mUlNr2ZpC2,K5-lCcs2.1iEAmPjdNlZq8eRBnn,nTqJJi+',
      },
    });
  }

  createMapper(mappingOptions: mapping.MappingOptions) {
    if (this.client == undefined) {
      this.createClient();
    }
    return new mapping.Mapper(this.client, mappingOptions);
  }
}
