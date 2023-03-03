const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const SortMiddleware = require('./app/middlewares/SortMiddleware');

const port = 3001;
const app = express();
const routes = require('./routes');
const db = require('./config/db');



//connect to db
db.connect(); 


//http logger morgan
app.use(morgan('combined'));

//urlencoded + json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//template engine
app.engine(
    '.hbs', 
    engine({
        extname: '.hbs',
        helpers: {
          sum: (a,b) => a + b,
          sortable: (field, sort) => {
            const sortType = field === sort.column ? sort.type : 'default';
            const icons = {
              default: 'oi oi-elevator',
              asc: 'oi oi-sort-ascending',
              desc: 'oi oi-sort-descending'
            }

            const types = {
              default: 'desc',
              asc: 'desc',
              desc: 'asc',
            }

            const icon = icons[sortType];
            const type = types[sortType];

            return `<a href="?_sort&column=${field}&type=${type}">
            <span class="${icon}"></span>
            </a>`
          }
        }
    }),
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));


app.use(express.static(path.join(__dirname, "public")));

//Method Overrides
app.use(methodOverride('_method'));

//Custom middleware
app.use(SortMiddleware);


//Route init
routes(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
