document.addEventListener('DOMContentLoaded', function() {
    getData(ladiesStartYourEngines);
});


function ladiesStartYourEngines(girls) {
    
    var scores = [
        { name : 'Beau',     hash: 'pmnlkrzawyqext' },
        { name : 'Elliot',   hash: 'lnrapezwqmtxky' },
        { name : 'Kate',     hash: 'nlmzkqwyearxpt' },
        { name : 'Katie',    hash: 'ewazmlpnyrxktq' }
    ];
    
    scores.forEach(function(s) {
        var order = orderByCode(girls, s.hash);
        s.score = calcScore(order);
    });
    
    scores.sort(function(a, b) {
        return b.score - a.score;
    });
    
    $('main').html(buildMarkup(scores)).show();
    
    
    $('.loading-screen').remove();
}

function buildMarkup(players) {
    var template = $('#template').html();
    players.forEach(function(p, i) {
        p.place = (i + 1) + getOrdinalSuffix(i + 1);
    });
    return Mustache.render(template, players);
}

