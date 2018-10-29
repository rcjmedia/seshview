const express = require('express');
const router = express.Router();
const Rooms = require('../db/rooms');
const rooms = new Rooms();

router.route('/')
  .get((req, res) => {
    res.render('index', { 
      rooms : {
        list : rooms.listAll() 
      }
    });
  });

router.route('/new')
  .get((req, res) => {
    res.render('index', { 
      rooms : {
        new : true 
      }
    });
  })

  .post((req, res) => {
    if (rooms.create(req.body)) return res.redirect('/rooms');
    else return res.redirect('/rooms/new');
  });

router.route('/:title')
  .get((req, res) => {
    let title = req.params.title;

    if (rooms.verify(title)) { 
      let data = rooms.retrieve(title);

      return res.render('index', { 
        rooms : {
          room : true,
          title : data.title,
          body : data.body,
          author : data.author
        }
    });

  } else {

      return res.redirect(`/rooms`);
    }
  })

  .put((req, res) => {
    let title = req.params.title;

    if (rooms.edit(req.body)) return res.redirect(`/rooms/${title}`);
    else return res.redirect(`/rooms/${title}/edit`);
  })

  .delete((req, res) => {
    let title = req.params.title;
    console.log(title);

    if (rooms.remove(title)) return res.redirect('/rooms');
    else return res.redirect(`/rooms/${title}`); 
  });

router.route('/:title/edit')
  .get((req, res) => {
    let title = req.params.title
    let targetItem = rooms.verify(title);

    if (targetItem) { 
      let data = rooms.retrieve(title);

      return res.render('index', { 
        rooms : {
          room : true, 
          edit: true,
          title : data.title,
          body : data.body,
          author : data.author 
        }
      });

    } else {

      return res.redirect(`/rooms/${title}`);
    }
  });


module.exports = router;