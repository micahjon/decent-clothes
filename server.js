const express = require('express');
const next = require('next');

const isDev = process.env.NODE_ENV !== 'production';
const app = next({ dev: isDev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get('/post/:slug', (req, res) => {
      const pageTemplate = '/post';
      const queryParams = { title: req.params.slug };
      app.render(req, res, pageTemplate, queryParams);
    });

    server.get('/show/:id', (req, res) => {
      const showTemplate = '/show';
      const queryParams = { id: req.params.id };
      app.render(req, res, showTemplate, queryParams);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen('3000', err => {
      if (err) throw err;
      console.log('Ready on localhost:3000');
    });
  })
  .catch(error => {
    console.error(error.stack);
    process.exit(1);
  });
