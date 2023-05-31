const { application } = require('express');
const express = require('express');
const jwt = require('jsonwebtoken');;
const UserModel = require('../src/models/user.model');
const port = 8090;

const app = express();
app.use(express.json())


app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use("/static", express.static('./static/'));

 app.use((req, res, next)=>{
     console.log(`Request Type: ${req.method}`);
     console.log(`Content Type: ${req.headers["content-type"]}`);
     console.log(`Date: ${new Date()}`)
     next();
 })


app.get('/views/users', async (req, res)=>{
    const users = await UserModel.find({});

    res.render("users", {users: users});

});

app.get('/login', async (req, res)=>{
    const users = await UserModel.find({});

    res.render("Login", {users: users});

});

app.get('/', async (req, res)=>{
    const users = await UserModel.find({});

    res.render("Home", {users: users});

});

app.get('/users', async (req,res)=>{
    try {
        const users = await UserModel.find({});

        res.status(200).json(users); 
    } catch (error) {
        return res.status(500).send(error.message);
    }

});
 
app.get("/users/:id", async (req, res) =>{
    try {
        const id = req.params.id;
        const user = await UserModel.findById(id);

        return res.status(200).json(user); 
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await UserModel.findOne({ email: email, password: password });
  
      if (!user) {
        res.status(401).json({ error: 'Credenciais Inválidas!' });
      } else {
        const token = jwt.sign({ email: user.email }, 'chave-token');
        res.json({ token });
      }
    } catch (error) {
      console.error('Erro ao verificar credenciais!', error);
      res.status(500).json({ error: error.message });
    }
  });
  

app.post('/users', async (req,res) =>{
    try{
        const user = await UserModel.create(req.body);

        res.status(201).json(user);
    }
    catch(error){
        res.status(500).send(error.message);
    }
});

app.patch('/users/:id', async (req, res) =>{
    try {
        const id = req.params.id;
        const users = await UserModel.findByIdAndUpdate(id, req.body, {new: true});

        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

app.delete('/users/:id', async (req, res)=>{
try {
    const id = req.params.id;
    const user = await UserModel.findByIdAndRemove(id);

    res.status(200).json(user);
} catch (error) {
    res.status(500).send(error.message);
}

})


app.listen(process.env.PORT ||  port , ()=>console.log(`Rodando pelo express na porta: ${port}!`));