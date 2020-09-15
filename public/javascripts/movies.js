const listMovies = (objMovies)=>{     
    $.each(objMovies , function(index, item) {
      idMovie = "'"+item.id+"'" ;
      TitleMovie = "'"+item.title+"'" ;

      //adding a new div
      $("#conMovies").append("<div id="+idMovie+"></div>");
      $("#"+item.id).click(GetMovieDetail)	

      //adding the movie on the div
      $('<a />')
        .attr('href', '/movie/detailMovie/'+item.id)
        .attr('id', 'a'+item.id)
        .appendTo($("#"+item.id))
      
      //adding the movie on the div
      $('<img />')
        .attr('src', "" + item.medium_cover_image + "")         
        .appendTo($("#"+'a'+item.id))

      $('<legend />')
        .html(item.title)
        .appendTo($("#"+item.id))

      $('<legend />')
        .html('Rating '+item.rating)
        .appendTo($("#"+item.id))        
  });
}

function GetMovieDetail() {
  idMovie = $(this).attr( "id" )  
}
  
function GetMovies() {
  aListMovies = ['movie/listMovies', 
                  (document.getElementById('ftitle').value == '' ? 'all' : document.getElementById('ftitle').value),
                  (document.getElementById('fgenre').value == '' ? 'all' : document.getElementById('fgenre').value)]
  urlListMovies = aListMovies.join('/')
  
  $("#conMovies").empty();

  $.ajax({
    url: urlListMovies,
    type: 'POST',
    dataType: 'json',
    success: (data) => {  
      listMovies(data.data.movies) ;
    }      
  })   
}

//inicializes events
document.addEventListener('DOMContentLoaded', ()=>{
    GetMovies()
    document.getElementById('btnfilterMovies').addEventListener('click', GetMovies);
});
