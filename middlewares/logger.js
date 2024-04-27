const logRequests = (req, _res, next) => {
    console.log(`Request endpoint: ${req.url}`);
    console.log(`Request Time: ${new Date()}`);
    return next();
};

export default logRequests;
