document.addEventListener('DOMContentLoaded', function() {
    var URL = "1nWEoOzLyhNr60SZYLvSZRNqBIvuenFDYHjmrNjRnqrg"
    Tabletop.init( { key: URL, callback: ladiesStartYourEngines, simpleSheet: true } )
});

function ladiesStartYourEngines(girls) {
    
    girls.forEach(function(girl, i) {
        girl.id = girl.rowNumber;
        girl.code = 'rkezqtxlnpmwayd'[i];
    });
    
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
        updateScores(girls);
    });

    updateApp(girls);   
    updateScores(girls); 
    
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

function buildMarkup(girls) {
    var template = $('#template').html();
    Mustache.parse(template);    
    var list = girls.map(function(girl) {
        var outcome = '';
        if (girl.outcome > 0) {
            outcome = '(' + girl.outcome + 'th place)';
        }
        girl.outcomeFmt = outcome;
        return Mustache.render(template, girl);
    });
    return list.join('');
}

function bringBackMyGirls(girls) {
    return Array.from(document.querySelectorAll('.girl')).map(function(el) {
        var id = +el.getAttribute('data-id');
        return girls.filter(function(girl) {
            return girl.id === id;
        })[0];
    });
}

function updatePermalink() {
    $('.permalink').val(window.location.href);
}

function orderByCode(girls, code) {
    return code.split('').map(function(char) {
        return girls.filter(function(girl) {
            return girl.code === char;
        })[0];
    });
}

function updateScores(girls) {
    console.log(girls);
    var totalPoints = 0;
    girls.forEach(function(girl, i) {
        if (girl.outcome > 0) {
            var points = 13 - Math.abs(girl.outcome - i - 1);
            $('.girl[data-id="' + girl.id + '"] .points-gained').text(points + ' points');
            totalPoints += points;
        }
    });
    $('.points').text(totalPoints);
}