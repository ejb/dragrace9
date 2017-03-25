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
    
    var drag = dragula([$('.my-girls')[0]]);
    drag.on('dragend', function() {
        girls = bringBackMyGirls(girls);
        updateApp(girls);
        // updateScores(girls);
    });

    updateApp(girls);    
}

function updateApp(girls) {
    var code = girls.map(function(girl) {
        return girl.code;
    }).join('');
    window.location.hash = code;
    updatePermalink();
    
    console.log(girls)
    
}

function buildMarkup(girls) {
    var list = girls.map(function(girl) {
        var outcome = '';
        if (girl.outcome > 0) {
            outcome = '(' + girl.outcome + 'th place)';
        }
        console.log(girl, girl.outcome, outcome)
        return '<li class="girl" data-id="' + girl.id +'">' + girl.contestant + ' ' + outcome + '</li>';
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