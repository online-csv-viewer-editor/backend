let db = require('../db');
let router = require('express').Router();
let {
	Editor,
	Field,
	Validate,
	Format,
	Options
} = require("datatables.net-editor-server");

router.all('/api/users', async function(req, res) {
	if (! req.body.site) {
		res.json({data:[]});
		return;
	}

	let editor = new Editor(db, 'users')
		.fields(
			new Field('users.first_name'),
			new Field('users.last_name'),
			new Field('users.phone'),
			new Field('users.site').options(
				new Options().table('sites').value('id').label('name')
			),
			new Field('sites.name')
		)
		.leftJoin('sites', 'sites.id', '=', 'users.site')
		.where('site', req.body.site);

	await editor.process(req.body);
	res.json(editor.data());
});

module.exports = router;
