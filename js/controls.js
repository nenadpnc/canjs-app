var Controls = (function(){
    var $mainContainer = $('#mainContainer');
    
    // controls
    var Articles = can.Control({
            '.post click': function(el, ev){
                window.location.hash = '#!content/' + el.data('id');
            },
            '{document} #back click': function(el, ev){
                history.go(-1);
            },
            '{document} "#edit click': function(el, ev){
                window.location.hash = '#!edit/' + $('article').data('id');
            },
            '{document} #add click': function(el, ev){
                var id = Data.getArticles().length + 1;
                window.location.hash = '#!add/' + id;
            },
            '#image change': function(el, ev){
                $('#imgPreview').attr('src', el.val());
            },
            '#saveArticle click': function(el, ev){
                var form = $('#frmArticle'),
                    article = form.data('article'),
                    data = can.deparam(form.serialize()),
                    tagsOptions = $('#tags input');
                
                data['tags'] = [];
                
                for(var i =0; i < tagsOptions.length; i++){
                    var $tagOption = $(tagsOptions[i]);
                    if($tagOption.is(':checked')){
                        data.tags.push($tagOption.data('text'));
                    }
                }
                
                if(data.htmlTxt !== '' && data.title !== '' && data.txtPreview !== ''){
                    article.attr('title', data.title);
                    article.attr('imgSrc', data.imgSrc);
                    article.attr('txtPreview', data.txtPreview);
                    article.attr('tags', data.tags);
                    article.attr('date', data.date);
                    article.attr('htmlTxt', data.htmlTxt);
                    article.save();
                }
            },
            '#cancel click': function(){
                window.location.hash = '#!tag/all';
            },
            '{document} #delete click': function(el, ev){
                var article = $('.article').data('article');
                article.destroy();
            },
            '{Model.Article} created': function(list, ev, article){
                window.location.hash = '#!tag/all';
            },
            '{Model.Article} updated': function(list, ev, article){
                window.location.hash = '#!content/' + article.id;
            },
            '{Model.Article} destroyed': function(){
                 window.location.hash = '#!tag/all';
            },
            '.social__icon click': function(el){
                var service = el.attr('id');
                switch(service){
                    case 'twitter':
                        window.open(el[0].attributes['href'].value, 'twitter-share', 'width=550,height=235');return false;
                        break;
                    case 'facebook':
                        window.open(el[0].attributes['href'].value, 'facebook-share','width=580,height=296');return false;
                        break;
                    case 'google':
                        window.open(el[0].attributes['href'].value, 'google-plus-share', 'width=490,height=530');return false;
                        break;
                }
            }
        });

    var Filter = can.Control({
        init: function(){
            var tag = can.route.attr('tag') || "all";
            this.element.html(can.view('views/tagList.ejs', {
              tags: this.options.tags
            }));
            this.element.find('[data-tag="' + tag + '"]').addClass('menu__item--active');
        },
        '.tag click': function(el, ev){
            window.location.hash = '#!tag/' + el.data('tag');
        }
    });
    
    var Routes = can.Control({
        'tag/:tag route': function(data){
            Model.Article.findAll().then(function(articles){
                $mainContainer.html(can.view('views/articleList.ejs', {
                    articles: articles
                }));
                Config.initAnimation();
                Config.setArticleNav();
                Config.setActiveBtn(data);
            });
        },
        'content/:id route': function(data){
            $mainContainer.fadeOut(400, function(){
                Model.Article.findOne(parseInt(data.id)).then(function(article){
                    $mainContainer.html(can.view('views/article.ejs', {
                        article: article
                    }));
                    Config.setContentNav();
                    $mainContainer.fadeIn(400);
                });
            });
        },
        'edit/:articleId route': function(data){
            $mainContainer.fadeOut(400, function(){
                $.when(Model.Article.findOne(parseInt(data.articleId)), Model.Image.findAll(), Model.Tag.findAll())
                        .then(function(articleRes, imageRes, tagRes){
                            $mainContainer.html(can.view('views/editArticle.ejs', {
                                article: articleRes[0],
                                images: imageRes[0],
                                tags: tagRes[0]
                            }));
                            Config.setEditNav();
                            $mainContainer.fadeIn(400);
                        });
            });
        },
        'add/:newArticleId route': function(data){
            $mainContainer.fadeOut(400, function(){
                var article = new Model.Article();
                $.when(Model.Image.findAll(), Model.Tag.findAll())
                        .then(function(imageRes, tagRes){
                            $mainContainer.html(can.view('views/editArticle.ejs', {
                                article: article,
                                images: imageRes[0],
                                tags: tagRes[0]
                            }));
                            Config.setAddNav();
                            $mainContainer.fadeIn(400);
                        });
            });
        }
    });
    
    return {
        Articles: Articles,
        Filter: Filter,
        Routes: Routes
    };
})();