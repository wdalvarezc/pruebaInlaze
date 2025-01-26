function errorHandler(err,req,res,next){
    const status = err.status || 500;
    const message = err.message || err;
    return res.status(status).send(message);
}
module.exports = errorHandler