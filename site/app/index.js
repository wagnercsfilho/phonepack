module.exports = function(app){
    
    app.get('/', function (req, res) {
      res.render('views/home/index');
    });
    
    app.get('/getting-started.html', function (req, res) {
      res.render('views/getting-started/index');
    });
    
    app.get('/docs.html', function (req, res) {
      res.render('views/docs/index');
    });
    
    app.get('/blog.html', function (req, res) {
      res.render('views/blog/index');
    });
    
    app.get('/examples.html', function (req, res) {
      res.render('views/examples/index');
    });
    
    app.get('/docs/demos/:path/:page', function(req, res) {
      res.render('demos/' + req.params.path + '/' + req.params.page);
    });
    

}