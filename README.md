![Alt text](src/assets/marvel-logo.png?raw=true "Title")

# Marvel Comics frontend

https://marvel-comics-frontend.herokuapp.com/

## Available Scripts

In the project directory, you can run:

### `yarn start`

# What was missing?

Por questoes de tempo, não consegui terminar os seguintes pontos:
- Favorite pagina: Dentro dela eu coloquei um componente Maintence apenas para mostrar que existe
- As rotas de Favoritar inserir e deletar estão funcionando corretamente
- Layout da paginação: o layout pode/deve ser melhorado porem pela API da marvel conter muitos
itens, o numero de paginas é bem grande, logo, eu limitei o componente <Pagination /> para retornar uma lista de páginas que contem cada 20 comics ou characters.
- Uso do REDUX: por questoes de tempo não pude usar o Redux que me ajudaria em diversas questoes de state, como exemplo a pagina de characters ou comic que acabaram tendo repeticao de código, quebrando a logica do DRY(Dont repeat yourself).



# Improvements

Optei por usar Material UI para ter uma interface rápida e responsiva.
A interface está estranha em algumas coisas mas tudo está relacionado a CSS e estilizacao faltando. por exemplo a <Pagination />




Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
