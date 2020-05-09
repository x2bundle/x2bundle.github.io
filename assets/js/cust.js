var today = new Date( serverTime );

function startTime()
{
    today.setSeconds( today.getSeconds() + 1 );

    var d = today.getDate();
    var mn = today.getMonth() + 1;
    var y = today.getFullYear();

    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    d = checkTime(d);
    mn = checkTime(mn);

    var timeStr = h + ':' + m + ':' + s + ' | ' + d + '.' + mn + '.' + y;

    $('#jtime').text(timeStr);  //15:25 | 01.16.2016
}


function checkTime(i)
{
    if (i < 10) {i = "0" + i};
    return i;
}

$(document).ready(function()
{
    setInterval(startTime, 1000);
});
