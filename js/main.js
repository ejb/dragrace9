document.addEventListener('DOMContentLoaded', function() {
    getData(ladiesStartYourEngines);
});

function ladiesStartYourEngines(girls) {
        
    if (window.location.hash) {
        var hash = window.location.hash.replace('#', '');
        girls = orderByCode(girls, hash);
    } else {
        shuffle(girls);
    }
    
    var markup = buildMarkup(girls);
    $('.my-girls').html(markup);
    $('.girl').click(function() {
        $(this).find('.bio').toggle();
    });
    
    var drag = dragula([$('.my-girls')[0]]);
    drag.on('dragend', function() {
        girls = bringBackMyGirls(girls);
        updateApp(girls);
        $('.points').text(calcScore(girls));
    });

    updateApp(girls);   
    $('.points').text(calcScore(girls));
    
    $('.loading-screen').remove();
    $('main').show();
}

function updateApp(girls) {
    var code = girls.map(function(girl) {
        return girl.code;
    }).join('');
    window.location.hash = code;
    updatePermalink();
    
}



function bringBackMyGirls(girls) {
    return Array.from(document.querySelectorAll('.girl')).map(function(el) {
        var id = +el.getAttribute('data-id');
        return girls.filter(function(girl) {
            return girl.id === id;
        })[0];
    });
}


function buildMarkup(girls) {
    var template = $('#template').html();
    Mustache.parse(template);    
    var list = girls.map(function(girl) {
        var outcome = '';
        if (girl.outcome > 0) {
            outcome = '(' + girl.outcome + '<sup>' + getOrdinalSuffix(girl.outcome) + '</sup> place)';
        }
        girl.outcomeFmt = outcome;
        return Mustache.render(template, girl);
    });
    return list.join('');
}


function updatePermalink() {
    $('.permalink').val(window.location.href);
}
