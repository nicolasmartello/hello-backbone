define(['jquery', 
	    'underscore', 
	    'backbone',
	    'views/mainView',
	    'collections/movies',
	    'models/movie'
], function($, _, Backbone, MainView, CollectionMovies, ModelMovie){

	var listMovies = new CollectionMovies;

	var AppRouter = Backbone.Router.extend({
		
		routes: {

			"delete/:id" : "deleteMovie",//elimina desde la coleccion
			"edit/:id"   : "editMovie",//edita desde mains
			"addMovie":"addMovie",
			"*actions"   : "defaultAction"

		},

	}); 

	

	var initialize = function(){
		
		var app_router = new AppRouter,
		mainView = new MainView;

		app_router.on('route:addMovie', function () {
			console.log('entreo en addMovie');
			
				mainView.collection = listMovies;
             
            //falta el save para persistir los datos.  
            //listMovies.save();
            mainView.ShowListView(true);       
            $('.cancel').click();
		});
		
		
		app_router.on( 'route:deleteMovie', function (id) {

			listMovies.remove(listMovies.get(id));
			mainView.ShowListView(true);
            
		});

		app_router.on( 'route:editMovie', function (id) { 
			mainView.model = listMovies.get(id);
			mainView.EditMovie();
		});

		app_router.on( 'route:defaultAction', function( actions ){
			
			mainView.ShowFormView();//muestra el template del formulario

        	listMovies.fetch();		       		
        	mainView.collection = listMovies;
        	mainView.ShowListView();//carga el template con todas las pelilculas existentes        	
        	

		});	
        
        Backbone.history.start();
       
	};
	

	return {
	
		initialize: initialize
			
	};

});