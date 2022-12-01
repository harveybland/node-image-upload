const core = require('./core');
require('./controllers/imageController');

const port = process.env.PORT || 8080;

core.app.listen(port, () => {
  console.log('server started on port 8080');
});
