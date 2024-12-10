const express = require('express');
const app = express();

const PORT = 5000;

app.get('/',(req, res)=>{
    res.json("dhirajbhawsar")
})
app.listen(PORT,()=> {
    console.log("helelworld running on" + PORT);
    
});