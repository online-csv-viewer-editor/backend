let db = require('../db');
let router = require('express').Router();
let {
	Editor,
	Field,
	Validate,
	Format,
	Options
} = require("datatables.net-editor-server");

router.all('/api/joinOptionsTable', async function(req, res) {
	let editor = new Editor(db, 'users')
		.fields(
			new Field('users.first_name'),
			new Field('users.last_name'),
			new Field('users.phone'),
			new Field('users.site').options(async (db) => {
				let options = await db('sites').select('id', 'name', 'continent');
				return options;
			}),
			new Field('sites.name')
		)
		.leftJoin('sites', 'sites.id', '=', 'users.site');

	await editor.process(req.body);
	res.json(editor.data());
});

module.exports = router;
