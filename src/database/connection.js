const { Client } = require("cassandra-driver");

async function runCassandra() {
  const client = new Client({
    cloud: {
      secureConnectBundle: "secure-connect-cassis.zip",
    },
    credentials: {
      username: "cbrCJGFLvXOFWyJACWahyYfg",
      password:
        "9E_tGYt2wGQd_SYRp6T0ztMQojwvR6eWx5Q6yRJLa4698d_EOgZBX-Ptzwo1jNQh6F2B9WCJBO6qMzyK-,mUlNr2ZpC2,K5-lCcs2.1iEAmPjdNlZq8eRBnn,nTqJJi+",
    },
  });

  //***TESTE DE CONEXÃO***//
  await client.connect();

  // Execute a query
  const rs = await client.execute("SELECT * FROM system.local");
  console.log(`Your cluster returned ${rs.rowLength} row(s)`);
  //console.log(`Cassandra rodando`);

  //await client.shutdown();
}

const connectToDatabase = runCassandra();
// Run the async function
module.exports = connectToDatabase;
