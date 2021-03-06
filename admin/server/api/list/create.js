module.exports = function (req, res) {
	var keystone = req.keystone;
	if (!keystone.security.csrf.validate(req)) {
		return res.apiError(403, 'invalid csrf');
	}

	var item = new req.list.model();
	req.list.updateItem(item, req.body, { files: req.files, user: req.user }, function (err) {
		if (err) {
			res.status(err.error === 'validation errors' ? 400 : 500);
			return res.json(err);
		}
		res.json(req.list.getData(item));
	});
};
