//jshint esversion:6



exports.getDate = function () {

var today  = new Date();

var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

return today.toLocaleDateString("en-US",options);

}

exports.getDay = function () {

    let today = new Date();

    var options = {
        weekday : "long"
    };

    return today.toLocaleTimeString("en-US",options);
}