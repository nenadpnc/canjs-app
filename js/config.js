var Config = (function(){
    var $articleMenu = $('#articleMenu'),
        $filter = $('#filter'),
        $edit = $('#edit'),
        $add = $('#add'),
        $delete = $('#delete');
    
    function initAnimation(){
        var blocks = [];
          
          $('.post__wrapper_helper--notloaded').each(function(i, block) {
          	blocks.push(block);
          });
          
          var add_class = function(block, class_name, delay) {
          	setTimeout(function() {
          		$(block).addClass(class_name);
          	}, delay);
          };
          
          for(var i = 0; i < blocks.length; i++) {
          	add_class(blocks[i], 'post__wrapper_helper--animated', i * 200);
          }
          
          $('.post__wrapper_helper--notloaded').each(function(i, wrapper) {
            wrapper = $(wrapper);
            var img = wrapper.find('p > img')[0];
            if(img) {
              // wait for the images
              var timer = setInterval(function() {
                // when the image is laoded
                if(img.complete) {
                  // stop periodical calls
                  clearInterval(timer);
                  // generate the image wrapper
                  var src = $(img).attr('src');
                  img.remove();
                  var img_container = $('<div class="post__image el__transition_long" style="background-image: url(\''+src+'\')"></div>');
                  img_container.appendTo(wrapper);
                  wrapper.removeClass('post__wrapper_helper--notloaded');
                  // add class with delay
                  setTimeout(function() {
                    img_container.addClass('post__image--loaded');
                  }, 250);
                }          
              }, 500);
              // add necessary mouse events
              wrapper.mouseenter(function() {
                wrapper.addClass('post__wrapper_helper--hover');
              });

              wrapper.mouseleave(function() {
                wrapper.removeClass('post__wrapper_helper--hover');
              });
            } else {
              // where there is no image - display the text directly
              wrapper.addClass('post__wrapper_helper--hover');
            }
          });
    };
    
    function setContentNav(){
        $articleMenu.removeClass('hide');
        $filter.addClass('hide');
        $edit.removeClass('hide');
        $add.removeClass('hide');
        $delete.removeClass('hide');
    };
    
    function setArticleNav(){
        $articleMenu.addClass('hide');
        $filter.removeClass('hide');
    };
    
    function setActiveBtn(data){
        $filter.find('a').removeClass('menu__item--active');
        $('[data-tag='+ data.tag +']').addClass('menu__item--active');
    };
    
    function setEditNav(){
        $articleMenu.removeClass('hide');
        $filter.addClass('hide');
        $edit.addClass('hide');
        $add.removeClass('hide');
        $delete.removeClass('hide');
    }
    
    function setAddNav(){
        $articleMenu.removeClass('hide');
        $filter.addClass('hide');
        $add.addClass('hide');
        $edit.addClass('hide');
        $delete.addClass('hide');
    }
    
    return {
        initAnimation: initAnimation,
        setContentNav: setContentNav,
        setArticleNav: setArticleNav,
        setActiveBtn: setActiveBtn,
        setEditNav: setEditNav,
        setAddNav: setAddNav
    };
})();