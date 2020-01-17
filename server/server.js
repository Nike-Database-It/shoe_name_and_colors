const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const compression = require('compression');

process.env.UV_THREADPOOL_SIZE = 10;

// const Shoe = require('../db/shoeTitle');
const { Client, Pool } = require('pg');

const client = new Client({
  user: 'neilvodoor',
  database: 'nike',
  password: 'charizard',
  host: 'localhost',
  port: "5432",
})

client.connect();

const cache = {};

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.use(morgan('dev'));
app.use(parser.json());
app.use(compression());

// SERVER REQUEST METHODS
// app.get('/*', (req, res) => {
//   const application = ReactDOMServer.renderToString(<App />);

//   const indexFile = path.resolve('./public/index.html');
//   fs.readFile(indexFile, 'utf8', (err, data) => {
//     if (err) {
//       console.log('Error here: ', err);
//       res.status(500).send('Bad Request.');
//     } else {
//       res.send(data.replace(`<div id='colors-container'></div>`, `<div id='colors-container'>${application}</div>`));
//     }
//   })
// })

app.get('/:shoeID/colors', ({ params }, res) => {
  const id = params.shoeID.slice(1);
  const query = {
    text: 'SELECT * FROM shoes WHERE id = $1',
    values: [id],
  };
  if (cache[id]) {
    res.send(cache[id]);
  } else {
    client.query(query)
      .then((resp) => {
        cache[id] = resp.rows[0];
        res.send(resp.rows[0]);
      })
      .catch((e) => {
        res.send(e);
      });
  }

});

app.get('/:shoeID/colors/:style', ({ params }, res) => {
  const style = params.style.slice(1);

  const query = {
    text: 'SELECT * FROM shoes where type = $1',
    values: [style],
  };
  client.query(query)
    .then((resp) => {
      res.send(resp.rows);
    })
    .catch((e) => {
      res.send(e);
    });
});

app.post('/new/shoe', (req, res) => {
  const values = req.body; 

  const shoe = new Shoe({
    shoeName: values.name,
    shoeColors: values.color,
    price: values.price,
    shoeLine: values.shoeline,
    image: values.image,
    shoeType: values.shoetype,
  })

  shoe.save((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

app.delete('/:shoeID', ({ params }, res) => {

  Shoe.findByIdAndDelete(params.shoeID.slice(1), (err, resp) => {
    if (err) {
      res.send(err);
    } else {
      res.send(resp);
    }
  })
});

app.put('/:shoeID', (res, req) => {
  const shoeID = req.params.shoeID.slice(1);
  const values = req.body;

  Shoe.findByIdAndUpdate(shoeID, {
    shoeName: values.name,
    shoeColors: values.color,
    price: values.price,
    shoeLine: values.shoeLine,
    image: values.image,
    shoeType: values.shoetype
  }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
})
// APP LISTENING PROTOCOL
const PORT = 3006;
app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`>>>>> Express server listening on port ${PORT}...`);
});
