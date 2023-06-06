const { application } = require('express');
const express = require('express');
const jwt = require('jsonwebtoken');;
const UserModel = require('../src/models/user.model');
const PostModel = require('../src/models/post.model');
const cookieParser = require('cookie-parser');
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
 app.use(cookieParser());

const verifyToken = (req, res, next) => {
    const token = req.cookies. token;

    if(!token) {
        return res.status(401).json({ error: 'Acesso não autorizado!' });
    }

    try{
        const decoded = jwt.verify(token, 'chave-token');
        req.user = decoded;
        next();
    }catch{
        return res.status(401).json({error: 'Token inválido'});
    }
}

app.get('/verificar-autenticacao', verifyToken, async (req, res) => {
    try {
      const userId = req.user.id;
  
      const user = await UserModel.findById(userId);
  
      if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
      }
  
      res.json({ loggedIn: true, name: user.name, isAdmin: user.isAdmin });
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      res.status(500).json({ error: error.message });
    }
  });

app.get('/view/users', async (req, res)=>{
    const users = await UserModel.find({});

    res.render("users", {users: users});

});

app.get('/login', async (req, res)=>{
    const users = await UserModel.find({});

    res.render("Login", {users: users});

});

app.get('/', async (req, res)=>{

    res.render("Home");
});

app.get('/delete', async (req,res)=>{
    const users = await UserModel.find({});

    res.render("Delete", {users: users});

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

app.get("/posts", async (req,res)=>{
    try {
        const posts = await PostModel.find({})

        res.status(200).json(posts)
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

app.get("/posts/:id", async (req,res)=>{
    try {
        const id = req.params.id;
        const post = await PostModel.findById(id);

        return res.status(200).json(post); 
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

app.get('/view/posts', async (req, res)=>{
    try {
        const posts = await PostModel.find({})

        res.render("posts",{posts:posts})
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

app.get("/perfil", verifyToken ,async(req, res)=>{
    try {
        const id = req.user.id;
        const user = await UserModel.findById(id);
    
        res.render("perfil", {user: user});
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await UserModel.findOne({ email: email, password: password });
  
      if (!user) {
        res.status(401).json({ error: 'Credenciais Inválidas!' });
      } else {
        const token = jwt.sign({ id:user._id, email: user.email, admin: user.isAdmin }, 'chave-token');
        res.cookie('token', token, { httpOnly: true })
        res.json({ token, loggedIn: true });
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

app.post('/posts', async (req,res)=>{
    try {
        const post = await PostModel.create(req.body);

        res.status(201).json(post);
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

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

app.patch('/posts/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const post = await PostModel.findByIdAndUpdate(id, req.body, { new: true });

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.status(200).json(post);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

app.listen(process.env.PORT ||  port , ()=>console.log(`Rodando pelo express na porta: ${port}!`));