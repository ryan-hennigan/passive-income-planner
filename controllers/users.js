

function getUsers(req,res){
    res.json({
        users:[{name:"Ryan"}]
    });
}


module.exports = {getUsers};