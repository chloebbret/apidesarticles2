# Utilisation

### Comment se créer un compte initialement ?
Il faut aller sur `public/index.html` et modifier cette partie pour afficher la page de création de compte :

```javascript
  data() {
    return {
      layout: 'login', // modifier 'login' en 'register'
      email: '',
      password: '',
      users: [],
      newUser: {},
      userToken: ''
    }
  }
```

Ensuite, il faut supprimer temporairement le middleware qui bloque la
création de compte sans jeton JWT. Cette partie est située dans `server.js`.

```javascript
// app.use("/api/users", authMiddleware, userRouter);
app.use("/api/users", userRouter);
app.use("/api/articles", articleRouter); // Articles sans auth globale
```