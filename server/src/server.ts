import app from './app';

const port = process.env.APP_PORT || process.env.PORT;

app.on('ok', () => {
  app.listen(port, () => {
    console.log('ok');
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
});
