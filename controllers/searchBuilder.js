let db = require('../db');
let router = require('express').Router();
let {
	Editor,
	Field,
	Validate,
	Format,
    Options,
    SearchBuilderOptions
} = require("datatables.net-editor-server");

router.all('/api/searchBuilder', async function(req, res) {
	let editor = new Editor(db, 'users').fields(
		new Field('users.first_name')
			.searchBuilderOptions(new SearchBuilderOptions()),
		new Field('users.last_name')
			.searchBuilderOptions(new SearchBuilderOptions()),
		new Field('users.phone')
			.searchBuilderOptions(
				new SearchBuilderOptions()
					.table('users')
					.value('phone')
			),
		new Field('sites.name')
			.searchBuilderOptions(
				new SearchBuilderOptions()
					.value('sites.name')
					.label('sites.name')
					.leftJoin('sites', 'sites.id', '=', 'users.site')
			),
		new Field('users.site').options(
			new Options().table('sites').value('id').label('name')
		),
	).leftJoin('sites', 'sites.id', '=', 'users.site');

	await editor.process(req.body);
	res.json(editor.data());
});

module.exports = router;