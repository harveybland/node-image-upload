const core = require('./core');
require('./controllers/imageController');

const port = process.env.PORT || 3000;

core.app.listen(port, () => {
  console.log('server started on port 3000');
});
