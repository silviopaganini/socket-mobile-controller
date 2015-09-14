// generate session number

module.exports = function(howMany)
{
    var maxNum = "";
    var i = 0;
    while(i < howMany)
    {
        maxNum += "9";
        i++;
    }

    var a = (Math.round(Math.random() * Number(maxNum))).toString();
    var result = "";

    i = a.length;
    while(i < howMany)
    {
        result += "0";
        i++;
    }

    result += a.toString();
    return result;
}
