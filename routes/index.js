var express = require('express');
var router = express.Router();
var Quandl = require("quandl");
var quandl = new Quandl();

/* GET home page. */
router.get('/', function (req, res, next) {

    var stockCode = req.query.StockCode;

    if (stockCode !== undefined && stockCode !== "") {

        GetStockData(stockCode, function (data) {

            console.log(" alert(\"ss\"); alert(\"ss\");");
            var dataAsObject = JSON.parse(data);

            if(dataAsObject.quandl_error === undefined) {

                var dataFeilds =
                    {
                        renderStockCode: dataAsObject.dataset.dataset_code,
                        renderStockName: dataAsObject.dataset.name,
                        renderStockDescription: dataAsObject.dataset.description,
                        renderStockPrice: dataAsObject.dataset.data[0][1],
                        ShowStock: "true"

                    };

                res.render('index', dataFeilds);
            }
            else {
                var dataFeilds =
                    {
                        renderError: dataAsObject.quandl_error.message
                    };

                res.render('index-error', dataFeilds);

            }
        });

    }
    else {

        var dataFeilds =
            {
                renderError: "Form Can not be empty try entering stock code e.g GOOG or FB "
            };

        res.render('index-error',dataFeilds );

    }

});


function GetStockData(stockCode, callback) {
    var options = {
        auth_token: "HmXN8Kwmfz3osbikyFA-"
    };
    quandl.configure(options);

    quandl.dataset({
        source: "WIKI",
        table: stockCode
    }, {
        order: "asc",
        exclude_column_names: true,
        start_date: "2018-03-27",
        end_date: "2018-03-27",
        column_index: 4
    }, function (err, response) {
        if (err)
            throw err;
        console.log(response);
        callback(response);
        // return response
    });
}


module.exports = router;
