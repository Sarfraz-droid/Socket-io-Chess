function CheckCheckMate(data)
{
    var check = false;
    data.forEach(function(element) {
        var elem = ""
        element.forEach(function(element2) {
            // elem += element2 + " ";
            if(element2 === 3)
            {
                console.log("CHECK!")
                check = true;
            }
        });

        // console.log(elem);
    })

    console.log(check);

    return check;

}


export default CheckCheckMate;