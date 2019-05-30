module.exports = class {
    static async allAddresses(req, res) {
        const data = await myApiRouter.getAddresses();

        return res.json(data);
    };



};