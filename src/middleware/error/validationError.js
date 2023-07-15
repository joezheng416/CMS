module.exports = (err,req,res,next) => {
    console.log(err);
    if(err.name === "validationError"){
        res.status(500).json({error:err.message});
        return;
    }
    next(err);
}