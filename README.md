<p align="center">
  <img alt="happy" title="happy" src="https://github.com/almerindopaixao/happy/blob/main/.github/logo.svg" />      
</p>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#gear-modificações">Modificações</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
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

## :gear: Modificações

#### Implementação da parte de cadastro do número do orfanato (criação da coluna whatsapp no banco de dados) e integração com o whatsapp tanto da versão web quanto da versão mobile
- web:

```typescript
<div className="input-block">
    <label htmlFor="whatsapp">
        Número do Whatsapp
        <span>Não é necessário adicionar zero à frente do número</span>
    </label>
    <input
      id="whatsapp"
      placeholder="557599988XXXX"
      value={whatsapp}
      onChange={(e) => {
         if (e.target.value.length > 13) return;
         setWhatsapp(whatsappNumberMask(e.target.value));
       }}
     />
</div>

export default function whatsappNumberMask(number: string): string {
  return number.replace(/\D/g, '');
}
```
- mobile

```typescript
<Text style={styles.label}>Whatsapp</Text>
<TextInput
   style={styles.input}
   placeholder="557599988XXXX"
   keyboardType="numeric"
   maxLength={13}
   value={data.whatsapp}
   onChangeText={(text) => {
      setData({ ...data, whatsapp: text})
   }}
/>
```
#### Implementação da validação de imagens (formato, tipo, tamanho) pela API utilizando o multer :ballot_box_with_check:
```typescript
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
#### Utilização do banco de dados postgresql :elephant:
```json
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
