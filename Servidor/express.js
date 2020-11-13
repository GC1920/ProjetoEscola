// Criar aplicativo expresso
var express = require ("express")
var app = express ()
var db = require ("./database.js")

// Porta do servidor
var HTTP_PORT = 8000
// Iniciar servidor
app.listen ( HTTP_PORT , () => {
    console.log ("Servidor rodando na porta% PORT%". replace ("% PORT%", HTTP_PORT))
});
// Root endpoint
app.get ("/", (req, res, próximo) => {
    res.json ({"message": "Ok, Servideor Rodando!"})
});

// Insira aqui outros endpoints de API
app.get("/api/users", (req, res, next) => {
     var sql = "select * from user"
     var params = []
    db.all(sql, params, (err, rows) => {
         if (err) {
           res.status(400).json({"error":err.message});
           return;
         }
         res.json({
             "message":"success",
             "data":rows
         })
       });
 });
 app.get("/api/user/:id", (req, res, next) => {
    var sql = "select * from user where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});
// Resposta padrão para qualquer outra solicitação
app.use (function(req, res) {
    res.status(404);
});