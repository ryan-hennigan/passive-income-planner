
function getReports(req,res){
    res.json({
        users:[{name:"Ryan"}]
    });
}

function getExpense(req,res){
    res.json({
        rep: req.params.id,
        exp: req.params.eid,
        users:[{name:"Ryan"}]
    });
}

function createReport(req,res){
    res.json({
        rep: req.params.id,
        exp: req.params.eid,
        users:[{name:"Ryan"}]
    });
}


module.exports = {getReports, getExpense, createReport};