var Model = (function () {
    
    // models
    var Article = can.Model({
            findAll: 'GET /articles',
            findOne: 'GET /article/{id}',
            create  : "POST /article",
            update  : "PUT /article/{id}",
            destroy : "DELETE /article/{id}"
        }, {});

    var Tag = can.Model({
            findAll: 'GET /tags'
        }, {});
    
    var Image = can.Model({
            findAll: 'GET /images'
        }, {});
    
    Article.List = can.Model.List({
            filter: function(tag){
                var articles = new Article.List([]);
                this.each(function(article, i){
                    for(var i = 0; i < article.tags.length; i++){
                        if(tag === 'all' || tag === article.tags[i]){
                            articles.push(article);
                            break;
                        }
                    }
                });
                return articles;
            }
        });
    
    return {
        Article: Article,
        Tag: Tag,
        Image: Image
    }
    
})();