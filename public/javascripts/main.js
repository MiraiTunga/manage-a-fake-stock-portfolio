const host = window.location.host;
var userShares = [];

$(document).ready(function () {

    InitialiseApp();

    $('#GetStockData .button').click(function () {

    });

    $('.buy').click(function () {

        var code = $(this).data("code");
        var price = $(this).data("price");
        var ammount =$(this).data("ammount");
        var name =$(this).data("name");
        var description =$(this).data("description");

        var share ={
            Code:code,
            Ammount:ammount,
            Price:price,
            Name:name,
            Description:description
        };

        BuyShares(share);

    });


});

function InitialiseApp() {

    setFunds();
    setUserShares();

    var funds = GetAvailableFunds();
    RenderAvailableFunds(funds);

}

function setFunds() {

    var funds = localStorage.getItem("Funds");

    if (funds === null || funds == "NaN") {

        funds = 100000;
        localStorage.setItem('Funds', funds);
    }
}

function setUserShares() {

   userShares= JSON.parse(localStorage.getItem("UserShares") || "[]");

}

function GetAvailableFunds() {

    var funds = localStorage.getItem("Funds");

    return  parseFloat(funds);

}

function RenderAvailableFunds(funds) {

    $("#Funds span").text(" $ "+funds);

}

function BuyShares(share) {

     var currentFunds = GetAvailableFunds();
     var updatedFunds = currentFunds -  (share.Price *  share.Ammount);
     localStorage.setItem('Funds', updatedFunds);
     RenderAvailableFunds(updatedFunds);

    if (!shareExistsInUserShares(share.Code)) {

        addShare(share);
    }
    else {

        updateShareAmount(share.Code, share.Ammount)
    }

    localStorage.setItem("UserShares", JSON.stringify(userShares));
}

function addShare(share) {

    userShares.push(createShareObject(share.Code, share.Ammount, share.Price,share.Name,share.Description));
}


function updateShareAmount(stockCode, shareAmount) {

    var share = userShares.filter(function (obj) {
        return obj.StockCode === stockCode;
    });

    share[0].ShareAmount+= shareAmount;
}

function createShareObject(stockCode, shareAmount, stockPrice,stockName,stockDescription) {

    var shareObject = {StockCode: stockCode,
        ShareAmount: shareAmount,
        StockPrice: stockPrice,
        ShareName:stockName,
        ShareDescription:stockDescription
    };

    return shareObject;
}

function shareExistsInUserShares(stockCode) {
    return userShares.some(function (element) {
        return element.StockCode === stockCode;
    });
}
