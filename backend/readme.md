# congig sequelize with database
```
npx sequelize-cli model:generate --name User --attributes username:string,email:string
```

```
npx sequelize-cli db:migrate
```

```
npx sequelize-cli db:seed:all
```

# Create File .env in the root of backend and then paste these in it
```
PORT = 3900
JWT_SECRET = 234fdf89y73uhiei9f08y7ui9iu08y32euifo90u82yhuio2u930dsfsdfsfsfdfs8yhui3ue89yhuiu0893h2i9u0io
```