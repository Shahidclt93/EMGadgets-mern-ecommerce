const mongoose = require("mongoose");

// const URI =
//   "mongodb+srv://shahidemgadge:AFYbVeLy4k7iJjMd@cluster0.fmxani8.mongodb.net/your-database-name";

const connectDatabase = () => {
 mongoose.connect(process.env.DB_URI)
 .then((data)=>{
     console.log(`Mongodb connected with server: ${data.connection.host}`)
   })
};

module.exports = connectDatabase;