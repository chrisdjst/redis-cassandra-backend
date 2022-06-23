const client = require("../src/database/connection");
const connectToDatabase = require("./src/database/connect");

connectToDatabase();

//***TESTE DE CONEXÃO***//
export default {
  fields: {
    nome: "text",
    login: "text",
    senha: "text",
    created: "timestamp",
  },
  key: ["nome"],
};
