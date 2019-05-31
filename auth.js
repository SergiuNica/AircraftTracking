module.exports = (req, res, next) => {

    if (req.headers && req.headers.authorization) {
        let usrPwd = req.headers.authorization.split(" ")[1];
        usrPwd = Buffer.from(usrPwd, "base64")
            .toString()
            .split(":");
        console.log(usrPwd);

        const user = usrPwd[0];
        const pass = usrPwd[1];

        if (user === "root" && pass === "pass") {
            //return res.json({ auth: true });
            req.auth = {
                user: user,
                isAuth: true
            };
        } else {
            req.auth = {
                isAuth: false
            };
        }
    }
    next();

}