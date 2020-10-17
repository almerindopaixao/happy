<p align="center">
  <img alt="happy" title="happy" src="https://github.com/almerindopaixao/happy/blob/main/web/src/assets/images/map-market.svg" />      
</p>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#gear-minhas">Modificações</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

<p align="center">
 <img src="https://img.shields.io/static/v1?label=PRs&message=welcome&color=FFD666&labelColor=000000" alt="PRs welcome!" />
 <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=FFD666&labelColor=000000" />
</p>

[![Netlify Status](https://api.netlify.com/api/v1/badges/ff79c10a-ac78-41e8-8c31-1fab9e5f2618/deploy-status)](https://app.netlify.com/sites/happy-adocao/deploys)

## :link: Links
- [API](https://happy-apirest.herokuapp.com/orphanages)
- [Site](https://happy-adocao.netlify.app/)

## 💻 Projeto

O Happy é uma plataforma desenvolvida durante a Next Level Week #3 da [Rocketseat](https://github.com/rocketseat-education) que tem o intuito de conectar pessoas com orfanatos próximos :)


## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/)
- [React](https://reactjs.org)
- [React Native](https://facebook.github.io/react-native/)
- [Expo](https://expo.io/)

## :gear: Minhas Modificações
- Implementação da validação de imagens (formato, tipo, tamanho) pela API utilizando o multer :ballot_box_with_check:
```
fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(
        new multer.MulterError(
          'LIMIT_UNEXPECTED_FILE',
          'Os arquivos enviados precisam ser do formato png ou jpg',
        ),
      );
    }

    return cb(null, true);
  },

  limits: {
    fileSize: 1024 * 1024,
  },
  ```
- Utilização do banco de dados postgresql :elephant:
```
{
  "type": "postgres",
  "host": "localhost",
  "port": 0000,
  "username": "username",
  "password": "password",
  "database": "database",
  "migrations": [
    "./src/database/migrations/*.ts"
  ],
  "entities": [
    "./src/models/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}
```

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](https://github.com/almerindopaixao/happy/blob/main/LICENSE) para mais detalhes.

---
