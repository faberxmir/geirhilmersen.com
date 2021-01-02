const { render } = require('ejs');
const express =   require('express');
const mongoose =  require('mongoose');
const Blog =      require('./models/blog');

//Express app
const app = express();

//connect to mongodb
const db_URI = 'mongodb+srv://geirhilmersen_com:aBSp2zkUpjQhvkYY6417@cluster0.5oiui.mongodb.net/geirhilmersen_blogs?retryWrites=true&w=majority'
console.log('attempting to connect to db...');
mongoose.connect(db_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(result => {
    //console.log(result);
    console.log('db connection: success');
    console.log('starting server...');
    app.listen(80);
    console.log('server has started!');
  })
  .catch(err => {
    console.log("Error in startup: ")
    console.log(err)
  });

//register view engine
app.set('view engine', 'ejs');

//set public folders
app.use(express.static('css'));
app.use(express.static('fonts'));

app.use(express.urlencoded({extended: true}));

// routes
app.get('/', (req, res)=>{
  //const blogs = [{title:"Hello Blog!", snippet: "for the horde"}, {title: "no worries", snippet: "problem sorted"}];
  //res.render('index', {title: "all blogs", blogs});
  res.redirect('/blogs');
});

app.get('/about', (req, res)=>{
  res.render('about', {title: "about"});
});

app.get('/about-me', (req, res)=>{
  res.redirect('about');
});

app.get('/login', (req, res)=>{
  res.render('login', {title: "logg inn!"})
});

//blog routes
app.get('/createblog', (req, res)=>{
  res.render('createblog', {title: "Create Blog"});
});

app.get('/blogs', (req, res) => {
  console.log("opening /blogs");
  Blog.find()
    .then(result => {
      res.render('index', {title: 'all blogs', blogs: result});
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/blogs/:title', (req, res) => {
  console.log("in blogs title");
  const title = req.params.title;
  Blog.findOne({title})
    .then(result => {
      res.render('details', {blog: result, title: 'blog details'});
    })
    .catch(err => {
      console.log(err);
    });
});

//POST methods
app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body);

  blog.save()
  .then(result => {
    res.redirect('/blogs');
  })
  .catch(err =>  {
    console.log(err);
  });
});

//DELETE methods
app.delete('/blogs/:title', (req, res) => {
  const title = req.params.title;
  Blog.findOneAndDelete({title})
    .then(result => {
      res.json({redirect: '/blogs' })
    })
    .catch(err => {console.log(err)});
});

//404 - if nothing else works...
app.use((req, res)=>{
  res.status(404).render('404', {title: "404 - page not found"});
});
