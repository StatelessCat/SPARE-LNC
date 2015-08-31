console.log("----------------------------------------------------------------");

 /* Variable de sauvegarde et chargement.*/
 var sauvegarde = "";
 
 /* Variable temporaire contenant ce qu'on envoie au parser */
 var to_send_parser = "";
 
 /* Variable pour l'affichage des éléments dans le parser */
 var json_reponse = " "; 
 
 /* Variable  */
 var autre_variable = " ";
  
 /* requetes en attente : */
 var request_pending = 0;
 /* nom de l'element à changer d'état */
 var elem_update = ".pending_r";
 
 /* Pour l'autocompletion du add */
 var autocompletion_add_array = new Array();
 
 
 /*
 =================================
 == 	 Pour la Sauvegarde     ==
 =================================
 
 */
// Fonction de sauvegarde
// Query CLN non vide et valable
// Si query_SPARQL vide, on doit avoir le parser.
function save( title, desc, query_CLN, query_SPARQL )
{
	restitle = "";
	resdesc = "";
	var my_date = new Date();
	restitle = title;
	if(title == ""){ restitle = my_date.toDateString();	}
	resdesc = desc;
	if(desc == "") { resdesc = "Indicateur créé le  : " + my_date.toDateString(); }

	var results = " [ " + " [ " + restitle + " ], " + "[" + resdesc + "], "   
						+ " [ " + query_CLN + "], " + "[" + query_SPARQL + "]" + "]";
						
	window.open('data:text/json;charset=utf-8,' + escape(results));
}


/*

 =================================
 == 	 Pour le Chargement     ==
 =================================

*/
function my_load($el, query )
{
	var results = [];
	results = parserLoader.parse(query);
	var i = 0;
	// On crée une liste par element, et on la remplie avec les élément
	for( i=0; i<results.length; i++ )
	{
	    newlist($el, results[i][0], je_cherche_a_next);
		for( j=1; j<results[i].length; j++)
		{
		  focus_add($el, results[i][j], "control_world");
		  active_next_button($el,  possessAttributValueWord_next );
		}
	}
 
} 


 /* 
 Pour les éléments de la liste. 
 Tableau : premier element : nom de l'attribut
 second element : liste des valeurs pour l'attribut
 */
 var list_attributes = new Array();

 
 
 /* Liste de fonctions actuelles */
 function update_pending()
 {
// alert('Test');
 if( request_pending != 0)
	$(elem_update).text("Il y a "+ request_pending +" requêtes SPARQL en attente de réponse... ");
 else
 	$(elem_update).text("Plus de requête en attente");
 
 
 }
 
/* Fenêtre de dialogue javascript */
/* Fonction de sauvegarde, chargement . */
/*function save( request_list, id_given, descritpion )
{
	var id;
	var description;
	var langage;
	var sparql;

}*/

function load( filename )
{

}

/* Fonction de grape d'éléments pour les mettre ensemble et en permettre le déplacement. */

 
 /* 
	Faire des affichages pour les résulats sur un onglet.  
 */
 
 /* Déclaration d'une variable globale pour chaque nouvel element créé */
 var id = 0;
 
 /* Déclaration d'une variable pour les éléments d'une requête */
 var querid = 2;
 
 /* Requete actuelle considérée pour l'ajout d'éléments */
 var focus = "#query";
 
 /* Liste dans laquelle on ajoute */
 var selection = 0;
 
 /* Variable à utiliser pour le conteneur lors de la logique de l'ajout et suprpession de requêtes dans l'interface. */
var conteneur = ".testliste";   
  
/*  */

  
/* 
	Il s'agit d'une liste de liste qui s'occupe de stocker l'ensemble des activations de boutons.
	Le premier élément de la liste est le nom du conteneur, et permet de retrouver le conteneur associé.
	Dans la logique de l'algorithme, le liste html possède autant d'éléments que sa lsi
 */
var querylist =  new Array();


 
/* 
Gestion des éléments qui peuvent suivre d'autres.
Fonctionne avec une liste d'id utilisés pour activer ou désactiver les boutons en question.

Il faut noter qu'il n'y a pas de contrainte réelle à associer la liste de boutons activés suivants
avec le bouton au nom similaire. Il faut penser à faire un bind en appelant le active_next_button
dans la fonction de déclaration.

Chaque élément de classe grammar_concerned est désactivé, puis on active les éléments de la liste.

!!!!!!!!!! IMPORTANT !!!!!!!!!!
On est posé à un problème épineux ici de boutons qui sont valable si d'autres avant on étés appuyé et pas d'autres...
On est amené à modifier les listes en fonction des boutons appuyés.
Il me faut donc faire une version clair de la grammaire actuelle pour mettre à jour l'ensemble

 */
 
 // Pour ceux qui n'ont pas encore étés déterminés
 var placeholder_next = new Array();
 
 var lesattributsWord_next = new Array("#pointWorld", "#add_button", "#possessAttributValueWord",
"#possessAttributValueWordSup",
"#possessAttributValueWordSupEga",
"#possessAttributValueWordInf",
"#possessAttributValueWordInfEga"
 );
 
 var suivi_par_next = new Array( "#unobselWord" );
 var unobselWord_next = new Array("#pointWorld","#possessAttributeCondWord", "#NonpossessAttributeCondWord", "#typeCond", "#luimeme");
 
 var luimeme_next = new Array( "#suivipar", "#directementsuivipar", "#précédépar", "#directementprécédépar");
 
 var je_cherche_a_next = new Array("#countWord","#getWord") ; 
 
 var je_nomme_next = new Array("#add_button","#countWord_short","#lesobselWord") ; 
 
 var soit_next = new Array("#add_button", "#countWord_short", "#lesobselWord") ; 
 
 var compter_next = new Array("#obselWord","#attributeCountWord") ; 
 var recuperer_next = new Array("#lesobselWord","#attributesWord", "#lesattributsWord") ; 
 
 var parmi_next = new Array("#add_button", "#parmi_jecherche");
 
 var obselWord_next = new Array("#pointWorld","#possessAttributeCondWord", "#NonpossessAttributeCondWord", "#typeCond", "#suivipar", "#directementsuivipar", "#précédépar", "#directementprécédépar"); 
 var lesobselWord_next = new Array("#pointWorld","#possessAttributeCondWord", "#NonpossessAttributeCondWord", "#typeCond", "#suivipar", "#directementsuivipar", "#précédépar", "#directementprécédépar") ; 
 
 /* Défaut pour les derniers... Normalement, on doit fair eun add */
 var  ayant_un_attribut_next = new Array("#pointWorld", "#add_button", "#possessAttributValueWord",
"#possessAttributValueWordSup",
"#possessAttributValueWordSupEga",
"#possessAttributValueWordInf",
"#possessAttributValueWordInfEga",
 "#virguleWord"); 
 
 var de_type_next = new Array("#pointWorld","#possessAttributeCondWord", "#typeCond", "#add_button") ; 
 
 var possessAttributValueWord_next = new Array("#pointWorld","#possessAttributeCondWord", "#add_button",
 "#possessAttributValueWord",
"#possessAttributValueWordSup",
"#possessAttributValueWordSupEga",
"#possessAttributValueWordInf",
"#possessAttributValueWordInfEga");
 
 var add_button_next = new Array("#pointWorld","#possessAttributeCondWord", "#typeCond", "#add_button", "#virguleWord", "#etWord", "#");

 var etWord_next = new Array("#possessAttributeCondWord", "#typeCond");
 var virguleWord_next = new Array("#possessAttributeCondWord", "#typeCond", "#suivipar", "#directementsuivipar", "#précédépar", "#directementprécédépar" );
 
 
 /*
	Description : Fonction qui gère les enable et disable des boutons qui premettent d'ajouter des éléments pour les listes.
				  Cette fonction est appelée dans le cadre d'un bouton qui ajoute un élément à une liste.
	Precondition  : Il existe un "focus" valide qui est une li. la liste est au pire une liste vide.
	PostCondition : L'ensemble des boutons ayant la classe grammar_concerned sont désactivés, sauf ceux de la liste de paramètre. La liste "liste" est ajoutée à la liste correspondante dans la variable query_liste (ie celle dont le premier élément == focus)
 */
 function active_next_button($el, liste)
 {
	var i = 0;
    // On désactive tout
	$el.find(".grammar_concerned").button(  );
	//$el.find(".grammar_concerned").button( "option", "disabled", false );
	// !!!!!!!!!!!!! IMPORTANT !!!!!!!!!!!
	// DESACTIVIATION ENLEVEE POUR LE MOMENT, L'interface ne suit plus la grammaire
	// 2 juin : réactivation de la grammaire
	// $el.find(".grammar_concerned").button( "option", "disabled", false );
	$el.find(".grammar_concerned").button( "option", "disabled", true );
	//$el.find( ".jecherche" ).button( "option", "disabled", false );
	
	// On active tout les éléments de la liste.
	for (i=0; i<liste.length; i++) 
	{
		$el.find( liste[i] ).button( "option", "disabled", false );
    }
	
	for(k=0; k<querylist.length ; k++)
	{
	   if( querylist[k][0] == focus ) { querylist[k].push(liste); //alert(liste);
	   }
    }
 }
  
 
 /* 
     Description : Fonction qui gère les enable et disabel des boutons, comme la fonction active_next_button, mais ne modifie pas la liste de 
 
 */
  function active_next( liste )
 {
  console.log("function active_next( liste )--------------------------------");
	var i = 0;
    // On désactive tout
	$(".grammar_concerned").button(  );
	//$(".grammar_concerned").button( "option", "disabled", false );
	// !!!!!!!!!!!!! IMPORTANT !!!!!!!!!!!
	// RACTIVIATION ENLEVEE POUR LE MOMENT, L'interface ne suit plus la grammaire
	// 2 juin : réactivation de la grammaire
	//$(".grammar_concerned").button( "option", "disabled", false );
	$(".grammar_concerned").button( "option", "disabled", true );
	//$( ".jecherche" ).button( "option", "disabled", false );
	
	// On active tout les éléments de la liste.
	for (i=0; i<liste.length; i++) 
	{
		$( liste[i] ).button( "option", "disabled", false );
    }
	
}
 
 
 /* Mis à jour de l'element selectioné par clic. L'élément sélectionné a une bordure bold et
une classe différente. On doit aussi pseudo parser pour les disponibilité d'éléments suivants. */
 function changeFocusElement( name )
 {
    //alert(" change !");
	if( focus != name)
	{
		// On change le CSS de l'objet
		$(name).css("border-style", "solid");
		$(name).css("border-width", "3px");
		
		// On doit faire que le précédent focus soit enlevé
		if(focus != 0)
		{	
			$(focus).css("border-style", "solid");
			$(focus).css("border-width", "0px");
		}
	
	}
    // On met à jour la variable focus	
	focus = name;
	
	for(k=0; k<querylist.length ; k++)
	{
	   if( querylist[k][0] == focus ) 
	   { 
	    active_next_button($el, querylist[k].pop() );
	   }
    }
 }
 
 /*
	Supression d'un élément.
	Se fait automatiquement sur le focus... Pas de Ctrl-Z ^^"
 */
 function remove($el)
 {
  	for(k=0; k<querylist.length ; k++)
	{
	   if( querylist[k][0] == focus ) 
	   {
	      if( querylist[k].length <= 2 )
		  {
		    //alert(querylist[k].length);
			$(focus).remove($el);
			$("#content_"+focus.slice(1) ).remove($el);
			/* Recherche d'un nouvel élément. */
			var new_focus = $(conteneur).children();
			
			if( new_focus.length > 0)
			{ 
				// A voir si on peut pas faire "Le plus proche de celui qu'on a supprimé, plutôt que le premier ou le dernier"
				//alert( new_focus[new_focus.length -1].id );
				changeFocusElement( "#"+new_focus[new_focus.length -1].firstChild.id );
			}
			else
			{
				active_next([]);
			}
	  }
		  else
	      {
			 newbee_activation = querylist[k].pop();
			 new_activation = querylist[k].pop();
			 supprimer_last = focus + " li:last";
			 //alert(querylist[k].length + "  :  " + new_activation + "\n"+ newbee_activation);
			 $(supprimer_last).remove($el);
			 //alert( new_activation );
			 active_next_button($el,  new_activation );				 
		  }
	 }
	   
    }
 }
 
 
 
 /*
	Génération d'un nouvel élément avec un ID unique. ici un élément de liste.
	
	//$(".testliste").append('<ul id="query' + querid +'" class="otherinnerlist"> 
	$(".testliste").append('<ul id="query' + querid +'" class="otherinnerlist"> \
	 <li id="id_number'+ id +'" class="mots" > #'+ id + '</li>\
	 <li id="element' + id + '" class="mots" >Je cherche à </li> ');
*/
 function newlist($el, debut, next_list) 
 {
	id++;
	querid++;
	//$(".testliste").append('<ul id="query' + querid +'" class="otherinnerlist"> 
	$el.find(conteneur).append(' <div id="content_query'+ querid +'"><ul id="query' + querid +'" class="otherinnerlist"> \
	 <li id="element' + id + '" class="mots" >' + debut + '</li> </ul></div>');
	 
	 $el.find(conteneur).animate({ scrollTop: $el.find(".testliste")[0].scrollHeight }, "fast");

	 var chaine = "#query" + querid;
	// alert(chaine);
	$el.find(chaine).sortable();
	$el.find(chaine).click( function(){ changeFocusElement( chaine ); });
	
	/* Pour le moment, désactivé. Tant qu'on ne fait pas de groupage dessus. */
	$el.find(chaine).sortable( 'disable' )
	
	changeFocusElement( chaine );
	
	/* Ajout pour le bouton de suppression */
	querylist.push(new Array(focus) );
	active_next_button($el,  next_list );
	
	
 }

 /* Ajout d'un mot général à une liste */
 function addworld($el, liste, mot, type )
 {
 	id++;
	chaine = "" + type + id;
	$el.find(liste).append('<li id="'+ chaine +'" class="mots" >'+ mot +'</li>');

 }
  
  /* Ajout d'un mot au focus */
  function focus_add($el, mot, type)
  {
	addworld($el, focus, mot, type);
  }
  
  /* restriction et element : aucune pour le moment. */
  function buttonSequence( liste )
  {
  
  }
  
  /* 
   * Extraction de la séquence et envoi au parser 
   * Dans la version actuelle, elle ne fait que l'affichage dans une zone de texte mal placée.
  */
 function extract_query($el, liste )
  {
	  var result = "";
	  $el.find(liste).each( function( index ){
       result += $(this).text().trim();
     });
	  //alert( result + " : " +result.search('.'));
	  if(result.indexOf('.') <= 0 && result.indexOf(';') <= 0) { result += ' .'; }
	  console.log( result );
	  
    $el.find('#resultLangage').val(result);
	  to_send_parser = result;
	  
	  
	  synchroCLN($el, result);
	  
	  /* Call de ajax ! */
	  var json_response = call_base($el, $el.find("#resultSPARQL").val(), $el.find("#base_uri").val(), "resultJSON");
	  
     return result;
  }

  
  
 function extract_all_query($el)
  {
	  var result = "";
	  
	  var childs = $(conteneur).children();
	  
	  $(childs).each( function( index ){ result += $(this).first().text().trim(); } ); 
	  console.log( result );
	  $el.find("#resultLangage").val(result); 
	  to_send_parser = result;
	  synchroCLN($el, result);
	  
	  /* Call de ajax ! */
	  var json_response = call_base($el, $el.find("#resultSPARQL").val(), $el.find("#base_uri").val(), "resultJSON");
	  
	  
	  
     return result;
  }
  
  
  
  /*
 =============================================
				Partie appel SPARQL
 =============================================
  */
  
  /* default-graph-uri=http%3A%2F%2Flocalhost%3A8001%2FAlienBase%2Fcdemo%2F%40obsels */
    /* Fonction qui pose le JSON reusltant dans un element ayant une value */
  function call_base_by_fuseki($el, SPARQL_QUERY, url_base, element_ID)
  {
    
    /* Mise à jour du nombre de requête en attente */
    request_pending++;
    update_pending();
    
    /* Appel Ajax vers la base.	  */
    var retour = 
    $.ajax({
      //url: 'http://localhost:8001/AlienBase/AllenTrace/@obsels',
      url: url_base,
      dataType: 'json', 
      data: { 
        //	query: "SELECT * WHERE { ?s ?p ?o }", 
        query: SPARQL_QUERY, 
        'default-graph-uri' : "http://localhost:8001/AlienBase/cdemo/@obsels", 
        //default-graph-uri : url_base
        limit: 'none',
        infer: 'true',
        Accept: 'application/sparql-results+json'
      },
      success: function(html){  
        $el.find('#' + element_ID).val(retour.responseText);
        var obj = $.parseJSON(retour.responseText);
        json_reponse = obj;
        request_pending--;update_pending();
      }, 
      error:  function(html){ 
        alert("Echec de l'execution de la requête SPARQL sur la base.");
        request_pending--;
        update_pending();
      }
    });
    return retour;
  } /**/

  /* Fonction qui pose le JSON reusltant dans un element ayant une value */
 function call_base($el, SPARQL_QUERY, url_base, element_ID) // TODO CALLER
 {
 
   /* Mise à jour du nombre de requête en attente */
	request_pending++;
	update_pending();
 
  /* Appel Ajax vers la base.	  */
  var retour = 
  $.ajax({
	//url: 'http://localhost:8001/AlienBase/AllenTrace/@obsels',
	url: url_base,
	dataType: 'json', 
	data: { 
		//	query: "SELECT * WHERE { ?s ?p ?o }", 
		query: SPARQL_QUERY, 
		limit: 'none',
		infer: 'true',
		Accept: 'application/sparql-results+json'
	},
	success: function(html){  
	 $el.find('#' + element_ID).val(retour.responseText);
	 var obj = $.parseJSON(retour.responseText);
     json_reponse = obj;
	 request_pending--;update_pending();
	   }, 
	error:  function(html){ alert("Echec de l'execution de la requête SPARQL sur la base.");request_pending--;update_pending();
	}
	});
	
	return retour;
} /**/
  
  
/* Fonction qui récupère les valeurs récupérées pour en faire une liste séparée par des \n */
 function call_base_list($el, SPARQL_QUERY, url_base, element_ID)
 {
 
	/* Mise à jour du nombre de requête en attente */
	request_pending++;
	update_pending();
 
  /* Appel Ajax vers la base.	  */
  var retour = 
  $.ajax({
	//url: 'http://localhost:8001/AlienBase/AllenTrace/@obsels',
	url: url_base,
	dataType: 'json', 
	data: { 
		//	query: "SELECT * WHERE { ?s ?p ?o }", 
		query: SPARQL_QUERY, 
		limit: 'none',
		infer: 'true',
		Accept: 'application/sparql-results+json'
	},
	success: function(html){ 
	var obj = $.parseJSON(retour.responseText);
    json_reponse = obj;
	var chaine_result = "";
	for(i=0; i< obj.results.bindings.length; i++)
	{
		chaine_result += obj.results.bindings[i].o.val() + "\n\r";
	}
	request_pending--;update_pending();
	//document.getElementById(element_ID).val() = retour.responseText;}, 
	$el.find('#' + element_ID).val(chaine_result);
  }, 
	error:  function(html){ alert("Echec de l'execution de la requête SPARQL sur la base.");request_pending--;update_pending();}
	
	});
	
	return retour;
} /**/
  
 
  
 /* Fonction qui cree la liste des attributs avec les valeurs associées */
 function call_base_list_2($el, SPARQL_QUERY, url_base, element_ID1, element_ID2)
 {
 
	/* Mise à jour du nombre de requête en attente */
	request_pending++;
	update_pending();
 
  /* Appel Ajax vers la base.	  */
  var retour = 
  $.ajax({
	//url: 'http://localhost:8001/AlienBase/AllenTrace/@obsels',
	url: url_base,
	dataType: 'json', 
	data: { 
		//	query: "SELECT * WHERE { ?s ?p ?o }", 
		query: SPARQL_QUERY, 
		limit: 'none',
		infer: 'true',
		Accept: 'application/sparql-results+json'
	},
	success: function(html){ 
	var obj = $.parseJSON(retour.responseText);
    json_reponse = obj;
	var chaine_result = "";
	for(i=0; i< obj.results.bindings.length; i++)
	{
		chaine_result += obj.results.bindings[i].o.value + "\n\r"; // TODO CHECKME
	}
	request_pending--;update_pending();
	//document.getElementById(element_ID).value = retour.responseText;}, 
	attribut = $el.find('#' + element_ID1); 
	element = $el.find('#' + element_ID2);
	$(element).empty();
	$(attribut).empty();
	list_attributes = new Array();
	/* Génération de la structure de données contenant les éléments */
	for(i=0; i< obj.results.bindings.length; i++)
	{
		string_current = obj.results.bindings[i].p.value; // TODO CHECKME
		found_idk = -1;
		for( k=0; k< list_attributes.length; k++)
		{
			if( string_current == list_attributes[k][0])
			{
				found_idk = k;
			}
		}
		if( found_idk == -1) { found_idk = list_attributes.length; list_attributes.push([ string_current,  new Array() ]); }
		list_attributes[found_idk][1].push( obj.results.bindings[i].o.value ); // TODO CHECKME
	}
	
	
	/* Génération de la liste affichée */
	for(i=0; i< list_attributes.length; i++)
	{
		$(attribut).append( '<li class="mots">' + list_attributes[i][0].substring(list_attributes[i][0].indexOf('#')+1)+ '</li>');	
	}
	
	/* A la selection, on affiche les valeurs */
	 $(attribut).selectable({
		stop: function() {
		$(element).empty();
		autocompletion_add_array = new Array();
		var result = $( element ).empty();
		$( ".ui-selected", this ).each(function() {
			var index = $( attribut ).children().index( this );
			//result.append( " #" + ( index + 1 ) );
			for(k=0; k<list_attributes[index][1].length; k++)
			{
				$(element).append('<li class="mots">' + list_attributes[index][1][k] + '</li>');
				autocompletion_add_array.push(list_attributes[index][1][k]);
			}
		}
		);
		$("#add_value").autocomplete({ source: autocompletion_add_array } );
		
		}
		});
		
	/* On rajoute l'ensemble des éléments à l'autocomplétion de add */
	
	
	},  
	error:  function(html){ 
    alert("Echec de l'execution de la requête SPARQL sur la base.");request_pending--;update_pending();
  }
	
	});
	
	return retour;
} /**/
  
 
  /*
 =============================================
			Fin de Partie appel SPARQL
 =============================================
  */
  
/* Ces fonctions sont copiées collées de la version No Interface */
/* 	Fonction d'appel simple au parser*/
function synchro( text ) { $el.find("#resultSPARQL").val(parser.parse(text)); }
			
/* Autre fonction d'appel simple */
function synchroCLN($el, text ) {
  var resultSPARQLIntermediaire = parserCLN.parse(text);
  $el.find("#resultSPARQLIntermediaire").val(resultSPARQLIntermediaire);
  $el.find("#resultSPARQL").val(parser.parse(resultSPARQLIntermediaire));
}
 
/* Fonction de mise a jour de la variable trace_modelURI */
 function synchroTraceModel($el){
 //alert("Test");
 trace_modelURI = $el.find("#trace_modele").val().trim();
 synchroCLN($el, $el.find("#resultLangage").val()); 
 
 }
	
 
  /* Fonction générale d'initialisation */
  
	/* Fonction d'initialisation */
	// A mettre à part.
	// A besoin de la fonction de JQuery/Jcascript
	
  // Initialisation de l'ensemble
var sparelnc = {};
sparelnc.init = function (container) {
  var $el = $(container);
  console.log('---------------------------init----------------------------');
	  /*
		A chaque ajout de liste, on doit ajouter une nouvelle liste dans querylist.
		Le premier élément est le nom de l'élément pour le retrouver dans la liste avec une comparaison 
	   */
	  querylist.push( new Array("#query") );
	
	/* Bouton pour voir le contenu brutal de la trace... Affiché en JSON ? */
	// $( "#maj_elements_conseil").button();
  $el.find( "#maj_elements_conseil").button();
  
	$el.find( "#maj_elements_conseil" ).bind("click", 
	function()
	{
		/* Avec ces requêtes, on récupère aussi d'autres éléments.*/
		var query_Sparql_value = "prefix : <http://liris.cnrs.fr/silex/2009/ktbs#> \
		SELECT DISTINCT ?o \
		WHERE \
		 { \
		 ?sobs0 ?pobs0 ?o . \
		 ?sobs0 :hasEnd ?dateEndobs0 . \
		 ?sobs0 :hasBegin ?dateBeginobs0 . \
		\}"
		// Pour bien faire, il faudrait montrer les valeurs par attribut, et non en vrac
		var query_Sparql_attribute = "prefix : <http://liris.cnrs.fr/silex/2009/ktbs#> \
		SELECT DISTINCT ?p ?o \
		WHERE \
		 { \
		 ?sobs0 ?p ?o . \
		 ?sobs0 :hasEnd ?dateEndobs0 . \
		 ?sobs0 :hasBegin ?dateBeginobs0 . \
		\} group by ?p ?o"; 
		var json_response1 = call_base_list($el, query_Sparql_value, $el.find("#base_uri").val(), "value_attributes_trace");
		var json_response2 = call_base_list($el, query_Sparql_attribute, $el.find("#base_uri").val(), "name_attributes_trace");
		var json_response3 = call_base_list_2($el, query_Sparql_attribute, $el.find("#base_uri").val(), "attribut", "valeurs");
			
		
	});
	
	$el.find( "#maj_elements_conseil2").button();
	$el.find( "#maj_elements_conseil2" ).bind("click", 
	function()
	{
		/* Avec ces requêtes, on récupère aussi d'autres éléments.*/
		var query_Sparql_value = "prefix : <http://liris.cnrs.fr/silex/2009/ktbs#> \
		SELECT DISTINCT ?o \
		WHERE \
		 { \
		 ?sobs0 ?pobs0 ?o . \
		 ?sobs0 :hasEnd ?dateEndobs0 . \
		 ?sobs0 :hasBegin ?dateBeginobs0 . \
		\}"
		// Pour bien faire, il faudrait montrer les valeurs par attribut, et non en vrac
		var query_Sparql_attribute = "prefix : <http://liris.cnrs.fr/silex/2009/ktbs#> \
		SELECT DISTINCT ?p ?o \
		WHERE \
		 { \
		 ?sobs0 ?p ?o . \
		 ?sobs0 :hasEnd ?dateEndobs0 . \
		 ?sobs0 :hasBegin ?dateBeginobs0 . \
		\} group by ?p ?o"; 
		var json_response1 = call_base_list($el, query_Sparql_value, $el.find("#base_uri").val(), "value_attributes_trace");
		var json_response2 = call_base_list($el, query_Sparql_attribute, $el.find("#base_uri").val(), "name_attributes_trace");
		var json_response3 = call_base_list_2($el, query_Sparql_attribute, $el.find("#base_uri").val(), "attribut", "valeurs");
			
		
	});
	/* Bouton temporaire de création de la requête */
	$el.find( ".processquery" ).button( );
	$el.find( ".processquery" ).bind("click", function(){extract_query($el, focus ); });
	$el.find( ".processquery").button( "option", "disabled", false );
	
	$el.find( ".processquery_list" ).button( );
	$el.find( ".processquery_list" ).bind("click", function(){extract_all_query($el); });
	$el.find( ".processquery_list").button( "option", "disabled", false );
		
	/* Boutons qui rajoutent des éléments à la requête sélectionnée.  */
	$el.find("#getWord").button();
	$el.find( "#getWord" ).bind("click", function(){ focus_add($el, " récupérer ", "control_world");  active_next_button($el,  recuperer_next );    });
	
	$el.find("#countWord").button();
	$el.find( "#countWord" ).bind("click", function(){ focus_add($el, " compter le nombre d'", "control_world");   active_next_button($el,  compter_next );    });
	
	$el.find("#countWord_short").button();
	$el.find( "#countWord_short" ).bind("click", function(){ focus_add($el, " le nombre d'", "control_world");   active_next_button($el,  compter_next );    });
	
	
	$el.find("#lesobselWord").button();
	$el.find( "#lesobselWord" ).bind("click", function(){ focus_add($el, " les obsels ", "control_world");   active_next_button($el,  lesobselWord_next );    });
	
	$el.find("#unobselWord").button();
	$el.find( "#unobselWord" ).bind("click", function(){ focus_add($el, " un obsel ", "control_world");  active_next_button($el,  unobselWord_next );  });
	
	$el.find("#obselWord").button();
	$el.find( "#obselWord" ).bind("click", function(){ focus_add($el, "obsels ", "control_world");  active_next_button($el,  obselWord_next );   });
	
	$el.find("#attributesWord").button();
	$el.find( "#attributesWord" ).bind("click", function(){ focus_add($el, "les attributs ", "control_world");    });
	
	$el.find("#attributeWord").button();
	$el.find( "#attributeWord" ).bind("click", function(){ focus_add($el, "l'attribut ", "control_world");    });
	
	$el.find("#possessAttributeCondWord").button();
	$el.find( "#possessAttributeCondWord" ).bind("click", function(){ focus_add($el, "ayant un attribut ", "control_world");   active_next_button($el,  ayant_un_attribut_next );  });
	
	$el.find("#possessAttributValueWord").button();
	$el.find( "#possessAttributValueWord" ).bind("click", function(){ focus_add($el, " de valeur ", "control_world");  active_next_button($el,  possessAttributValueWord_next );  });
	
	$el.find("#possessAttributValueWordSup").button();
	$el.find( "#possessAttributValueWordSup" ).bind("click", function(){ focus_add($el, " de valeur supérieure à ", "control_world");  active_next_button($el,  possessAttributValueWord_next );  });
	
	$el.find("#possessAttributValueWordSupEga").button();
	$el.find( "#possessAttributValueWordSupEga" ).bind("click", function(){ focus_add($el, " de valeur supérieure ou égale à ", "control_world");  active_next_button($el,  possessAttributValueWord_next );  });

	$el.find("#possessAttributValueWordInf").button();
	$el.find( "#possessAttributValueWordInf" ).bind("click", function(){ focus_add($el, " de valeur inférieure à ", "control_world");  active_next_button($el,  possessAttributValueWord_next );  });
		
	$el.find("#possessAttributValueWordInfEga").button();
	$el.find( "#possessAttributValueWordInfEga" ).bind("click", function(){ focus_add($el, " de valeur inférieure ou égale à ", "control_world");  active_next_button($el,  possessAttributValueWord_next );  });

	
	$el.find("#NonpossessAttributeCondWord").button();
	$el.find( "#NonpossessAttributeCondWord" ).bind("click", function(){ focus_add($el, " n'ayant pas un attribut ", "control_world");  active_next_button($el,  ayant_un_attribut_next );  });
	
	
	/* 
		C'est ici qu'il faudra indiquer si la requête est finie ou pas. 
		Pour estimer au fur et à mesure, il faut estimer qu'à chaque condition on teste comme si on mettait un point à la fin...
		Cela veut dire d'esayer avec 
	*/
	$el.find("#pointWorld").button();
	$el.find( "#pointWorld" ).bind("click", function(){ focus_add($el, ". ", "End_control_world");   active_next_button($el,  [] ); });
	
	$el.find("#add_button").button();
	$el.find( "#add_button" ).bind("click", function(){ focus_add($el, ""+$el.find("#add_value").val()+"", "value_world");  for(k=0; k<querylist.length ; k++)
	{
	   if( querylist[k][0] == focus ) 
	   {
			 new_activation = querylist[k].pop();
			 active_next_button($el,  new_activation );
			 active_next_button($el,  new_activation );				 
	 }
	   
    }
	});
	
	$el.find("#suivipar").button();
	$el.find( "#suivipar" ).bind("click", function(){ focus_add($el, "suivi par", "value_world");  active_next_button($el,  suivi_par_next );  });
	
	$el.find("#précédépar").button();
	$el.find( "#précédépar" ).bind("click", function(){ focus_add($el, "précédé par", "value_world"); active_next_button($el,  suivi_par_next  );   });
	
	$el.find("#virguleWord").button();
	$el.find("#virguleWord").bind("click", function(){ focus_add($el, ", ", "value_world"); active_next_button($el,  virguleWord_next );   });
	
	$el.find("#etWord").button();
	$el.find("#etWord").bind("click", function(){ focus_add($el, "et ", "value_world"); active_next_button($el,  etWord_next );    });
	
	$el.find("#maj_model_trace").button();
	$el.find("#maj_model_trace").bind("click", function(){  
    $el.find("#model").val(create_model_samotrace( "http://dsi-liris-silex.univ-lyon1.fr/m2ia/ktbs/base-samotraces-transformations/Trace-samo-trans/@obsels")); 
		for(i=0; i< querylist.length; i++)
		{
		  if( querylist[i][0] == focus )
		  {alert( querylist[i].length ); }

		}
		
	});
	
	$el.find("#typeCond").button();
	$el.find("#typeCond").bind("click", function(){ focus_add($el, "de type ", "value_world", "add"); active_next_button($el,  de_type_next );     });
	
	$el.find("#attributeCountWord").button();
	$el.find("#attributeCountWord").bind("click", function(){ focus_add($el, " attibuts ", "control_world"); active_next_button($el,  de_type_next );    });
	
	$el.find("#lesattributsWord").button();
	$el.find("#lesattributsWord").bind("click", function(){ focus_add($el, " les attibuts ", "control_world"); active_next_button($el,  lesattributsWord_next );    });
	
	
	$el.find( "#supprimer" ).button( );
	$el.find( "#supprimer" ).bind("click", function() { remove($el);  } );
	
	$el.find("#parmi_jecherche").button();
	$el.find("#parmi_jecherche").bind("click", function(){ focus_add($el, ", je cherche à ", "value_world"); active_next_button($el, $el,  je_cherche_a_next );   });
	
	/* Nouveaux éléments */
	$el.find("#luimeme").button();
	$el.find("#luimeme").bind("click", function(){ focus_add($el, "lui même ", "control_world"); active_next_button($el, $el, luimeme_next );    });
	
	$el.find("#directementsuivipar").button();
	$el.find("#directementsuivipar").bind("click", function(){ focus_add($el, "directement suivi par ", "control_world"); active_next_button($el,  suivi_par_next  );    });
	
	$el.find("#directementprécédépar").button();
	$el.find("#directementprécédépar").bind("click", function(){ focus_add($el, "directement précédé par ", "control_world"); active_next_button($el,  suivi_par_next  );    });
	
	/* Boutons de début de phrase */
	$el.find( ".jecherche" ).button( );
	$el.find( ".jecherche" ).bind("click", function() { newlist($el, 'Je cherche à ', je_cherche_a_next);  } );
	
	$el.find( ".soit" ).button( );
	$el.find( ".soit" ).bind("click", function() { newlist($el, 'Soit ', soit_next); } );
	
	$el.find( ".jenomme" ).button( );
	$el.find( ".jenomme" ).bind("click", function() { newlist($el, 'Je nomme ', je_nomme_next);  } );
		
	$el.find( ".parmi" ).button( );
	$el.find( ".parmi" ).bind("click", function() { newlist($el, 'Parmi ', parmi_next);  } );
	
	$el.find( ".je_garde" ).button( );
	$el.find( ".je_garde" ).bind("click", function() { newlist($el, 'Je garde seulement ', [ "#add_button", "#pointWorld" ]);  } );
	$el.find(".je_garde").button( "option", "disabled", false );
	
	// test de sauvegarde
	$el.find( "#my_save" ).button( );
	$el.find( "#my_save" ).bind("click", function() { save( $el.find('#my_indic_title').val(),
													 $el.find('#my_indic_desc').val(),
													 $el.find('#resultLangage').val(),
													 parser.parse(parserCLN.parse($el.find('#resultLangage').val()))
													 ) } );

	// test de chargement
	$el.find( "#my_load" ).button( );
	$el.find( "#my_load" ).bind("click", function() { my_load($el, $el.find('#file_load').val()) } );
	

													 
	// Pour rafraichir la requête sans prendre depuis l'interface
	$el.find('#refresh').button();
	$el.find( "#refresh" ).bind("click", function() { 
	var other_response = call_base_by_fuseki($el, $el.find("#resultSPARQL").val(), "http://localhost:3030/sparql", "by_sparql"); 
	/* Call de ajax ! */
	var json_response = call_base($el, $el.find("#resultSPARQL").val(), $el.find("#base_uri").val(), "resultJSON"); 
	} );
	 
	/* Supprimer toujours fini */
	$el.find("#supprimer").button( "option", "disabled", false );
	
	$el.find("#json_to_obsel").button();
	$el.find("#json_to_obsel").bind("click", function(){  transform_to_trace( json_reponse); })
	
	/*
	changeFocusElement( "#query" );
	active_next_button( je_cherche_a_next );
	alert( querylist[0] ); 
	*/
	$el.find( ".etapes" ).tabs();
	
	
	/* Mise en place d'une première liste qui fait le tout. */
	newlist($el, 'Je cherche à', je_cherche_a_next);
	//init();
	
	/*
	<button id="suivipar">suivi par</button>
	<button id="précédépar">précédé par</button>
	*/
	
	$el.find( ".testliste" ).sortable( );
	$el.find( ".otherinnerlist").sortable({delay: 200});
	//$el.find( ".testliste").jScrollPane();
	
	
	$el.find( "#query" ).click( function(){  changeFocusElement( "#query"); } );
	
	$el.find( "#trace_modele").on("change keyup paste",  function(){synchroTraceModel($el); });
	//$el.find( "#trace_modele").change( function(){synchroTraceModel($el); });
	
	
	/* activation de la liste des attributs et des valeurs d'attibuts. */
	//$el.find("#attribut").selectable();
	
	//$el.find("#valeurs").sortable();
	$el.find("#valeurs").selectable();
	

	
	$el.find( "#attribut" ).tabs();
	
}; 
	
  
