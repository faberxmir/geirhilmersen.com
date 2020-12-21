const express = require ('express');

//Express app
const app = express();

//register view engine
app.set('view engine', 'ejs');

//set public folder
app.use(express.static('css'));
app.use(express.static('fonts'));

//listen for requests
app.listen(3000);

app.get('/', (req, res)=>{
  const blogs = [{title:"Hello Blog!", snippet: "for the horde"}, {title: "no worries", snippet: "problem sorted"}];
  res.render('index', {blogs});
});

app.get('/about', (req, res)=>{
  res.render('about', {title: "about"});
});

app.get('/about-me', (req, res)=>{
  res.redirect('about');
});

app.get('/createblog', (req, res)=>{
  res.render('createblog', {title: "Create Blog"});
})

app.get('/login', (req, res)=>{
  res.render('login', {title: "logg inn!"})
});

app.use((req, res)=>{
  res.status(404).render('404', {title: "404 - page not found"});
});
