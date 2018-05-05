$(document).ready(function () {


    RenderMyShares();

    $('body').on('click',".sell",function () {

        console.log($(this));
        var code = $(this).data("code");
        var price = $(this).data("price");
        var ammount =$(this).data("ammount");

        var share ={
            Code:code,
            Ammount:ammount,
            Price:price
        };

        SellShares(share);

    });
});


function RenderMyShares() {

    $("#StockList").empty();
    if (userShares.length > 0) {

        var dom="";
        $.each(userShares, function (index, value) {

             dom += '<div class="card" style="width: 18rem;">' +
                '<div class="card-body">' +
                '<h5 class="card-title">'+value.StockCode+'</h5>' +
                '<h6 class="card-subtitle mb-2 text-muted">'+value.ShareName+'</h6>' +
                 '<strong class="card-subtitle mb-2 text-muted">Sell Price</strong>' +
                 '<p class="card-subtitle mb-2 text-muted">'+value.StockPrice+'</p>' +
                 '<strong class="card-subtitle mb-2 text-muted">Shares Held</strong>' +
                 '<p class="card-subtitle mb-2 text-muted">'+value.ShareAmount+'</p>' +
            '<a href="#" class="card-link btn btn-danger sell" data-ammount="1" data-price="'+value.StockPrice+'" data-code="'+value.StockCode+'">Sell</a>' +
            '</div>' +
            ' </div>';
        });

        $("#StockList").append(dom);
    }
    // $("#Funds span").text(" $ "+funds);

}

function SellShares(share) {

    var currentFunds = GetAvailableFunds();
    var updatedFunds = currentFunds +  (share.Price *  share.Ammount);


    localStorage.setItem('Funds', updatedFunds);

    RenderAvailableFunds(updatedFunds);


    if (shareExistsInUserShares(share.Code)) {

         removeShare(share);
    }
    localStorage.setItem("UserShares", JSON.stringify(userShares));
    RenderMyShares();
}
function removeShare(shareToRemove) {

    var share = userShares.filter(function (obj) {
        return obj.StockCode === shareToRemove.Code;
    });


    share[0].ShareAmount -= shareToRemove.Ammount;

    if(share[0].ShareAmount<=0){
        userShares = userShares.filter(function (obj) {
            return obj.StockCode !==shareToRemove.Code;
        });
    }

}