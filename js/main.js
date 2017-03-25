document.addEventListener('DOMContentLoaded', function() {
    var URL = "1nWEoOzLyhNr60SZYLvSZRNqBIvuenFDYHjmrNjRnqrg"
    Tabletop.init( { key: URL, callback: ladiesStartYourEngines, simpleSheet: true } )
});

function ladiesStartYourEngines(girls) {
    console.log(girls);
    var markup = buildMarkup(girls);
    $('main').html(markup);
    
    dragula([$('.my-girls')[0]]);
}

function buildMarkup(girls) {
    var list = girls.map(function(girl) {
        return '<li class="">' + girl.contestant + '</li>';
    });
    return '<ol class="my-girls">' + list.join('') + '</ol>';
}

