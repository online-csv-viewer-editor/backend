let db = require('../db');
let router = require('express').Router();
let {
	Editor,
	Field,
	Validate,
	Format,
	Options
} = require("datatables.net-editor-server");

router.all('/api/joinNested', async function(req, res) {
	let editor = new Editor(db, 'users')
		.fields(
			new Field('users.first_name'),
			new Field('users.last_name'),
			new Field('users.phone'),
			new Field('users.site')
				.setFormatter(Format.ifEmpty(null))
				.validator(Validate.dbValues(null, 'id', 'sites', db)),
			new Field('sites.name')
		)
		.leftJoin('sites', 'sites.id', '=', 'users.site');

	await editor.process(req.body);
	res.json(editor.data());
});

module.exports = router;
