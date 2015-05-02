(function () {
    "use strict";
    
    $(document).ready(function(){
        Data.init();
        Service.init();
        
        Model.Tag.findAll().then(function(tagsResponse){
            
            new Controls.Routes(document);
            
			new Controls.Articles('#mainContainer', {});
            
            new Controls.Filter('#filter', {
                tags: tagsResponse
            });
            
            can.route('', { 'tag': 'all' });
            can.route.ready(true);
		});
    });
}());