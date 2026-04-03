import app from "./src/app.js";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";


dotenv.config();

//Connect database firsdt
connectDB()
.then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })  

}).catch((error) => {
    console.log("Server not started! DB connection failed!: ", error.message);
    process.exit(1);
})



