var Service = (function(){
     // mimic server calls
    function init(){
        can.fixture('GET /articles', function(){
            return [Data.getArticles()];
        });

        can.fixture('GET /article/{id}', function(data){
            return [Data.getArticleById(data.data)];
        });

        can.fixture("POST /article", function(data){
            return Data.createArticle(data.data);
        });

        can.fixture("PUT /article/{id}", function(data){
            return Data.setArticle(data.data);
        });

        can.fixture("DELETE /article/{id}", function(data){
            return Data.deleteArticle(data.data);
        });

        can.fixture("GET /tags", function(){
            return [Data.tags];
        });
        
        can.fixture('GET /images', function(){
            return [Data.images];
        });
    };
    
    return {
        init: init
    };
})();