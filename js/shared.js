function getData(callback) {
    var URL = "1nWEoOzLyhNr60SZYLvSZRNqBIvuenFDYHjmrNjRnqrg"
    Tabletop.init( { key: URL, callback: function(girls) {
        girls.forEach(function(girl, i) {
            girl.id = girl.rowNumber;
            girl.code = 'rkezqtxlnpmwayd'[i];
            girl.firstName = girl.contestant.split(' ')[0];
        });
        callback(girls);
    }, simpleSheet: true } )
}


function getOrdinalSuffix(n) {
    if (n == 1) {
        return 'st';
    }
    if (n == 2) {
        return 'nd';
    }
    if (n == 3) {
        return 'rd';
    }
    return 'th';
}



function orderByCode(girls, code) {
    return code.split('').map(function(char) {
        return girls.filter(function(girl) {
            return girl.code === char;
        })[0];
    });
}

function calcScore(girls) {
    var totalPoints = 0;
    girls.forEach(function(girl, i) {
        if (girl.outcome > 0) {
            var outcome = girl.outcome;
            if (i === 2) {
                i = 1;
            }
            if (outcome === 3) {
                outcome = 2;
            }
            var points = 13 - Math.abs(girl.outcome - i - 1);
            $('.girl[data-id="' + girl.id + '"] .points-gained').text(points + ' points');
            totalPoints += points;
        }
    });
    return totalPoints;
}