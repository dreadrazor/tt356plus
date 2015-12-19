module.exports = function(app){
  app.use(function (req, res, next) {
    req.pagination = {};
    //page number
    if(req.body.page){
      req.pagination.page = req.body.page;
      delete req.body.page;
    }else{
      req.pagination.page = 1;
    }
    //per page
    if(req.body.perPage){
      req.pagination.perPage = req.body.perPage;
      delete req.body.perPage;
    }else{
      req.pagination.perPage = 20;
    }

    next();
  });
}
