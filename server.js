var express = require('express');

var app = express();

var childProcess = require('child_process');

var PORT = process.env.PORT || 3000;

app.get("/",(req,res)=>{
    var command = "ifconfig | grep \"inet addr\" | sed 's/ *inet addr://'"
    childProcess.exec(command,(err,stdout,stderr)=>{
        if(err) {
            res.status(500).send({
                Error: true,
                Message: `Failed to execute command: ${command}`
            })
        }else  if(stderr) {
            res.status(500).send({
                Error: true,
                Message: `Failed to execute command: ${command} :Stderr occured`
            })
        }else {
            res.status(200).send({
                Error: false,
                Message: `Hello World I am using Port ${PORT} with process id ${process.pid}`
            }) 
        }
    })
})

app.listen(PORT,()=>{
    console.log(`Node app stared at port@ ${PORT} with process id=${process.pid}`)
})
