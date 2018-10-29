const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const socket = require('socket.io');
const app = express();
const PORT = process.env.PORT || process.env.EXPRESS_CONTAINER_PORT || 8080;
const rooms = require('./routes/rooms');


app.use(express.static('public'));
app.engine('.hbs', hbs({
  // 'main.hbs' exists in views/layouts/
  defaultLayout : 'main',
  extname : '.hbs'
}));

app.set('view engine', '.hbs');
app.use(bodyParser.urlencoded({ extended: true }));
// applies methodOverride to the method assigned to _method in the URL of a form submission page
app.use(methodOverride('_method'));
app.get('/', (req, res) => {
  // 'home.hbs' exists in views!!!!!/
  // will use the default layout 'main' to build HTML and then render the contents of 'home' in the {{body}} section of 'main'
  res.render('home');
});

app.use('/rooms', rooms);

//Run the server
const server = app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`)
})

// setup sockets
const io = socket(server);

io.on('connection',(socket)=>{
    // console.log('My Socket Server Is Connected', socket);
    socket.on('update', (data) => {
        console.log(data);
        socket.broadcast.emit('update', data);
    });
    socket.on('play',()=>{
        socket.broadcast.emit('play')
    })
    socket.on('pause',()=>{
        socket.broadcast.emit('pause')
    })
    socket.on('slider',(data)=>{
        socket.broadcast.emit('slider',data)
    })
});