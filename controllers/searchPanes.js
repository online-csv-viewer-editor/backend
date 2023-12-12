let db = require('../db');
let router = require('express').Router();
let {
	Editor,
	Field,
	Validate,
	Format,
    Options,
    SearchPaneOptions
} = require("datatables.net-editor-server");

router.all('/api/searchPanes', async function(req, res) {
	let editor = new Editor(db, 'users').fields(
		new Field('users.first_name')
			.searchPaneOptions(new SearchPaneOptions()),
		new Field('users.last_name')
			.searchPaneOptions(new SearchPaneOptions()),
		new Field('users.phone')
			.searchPaneOptions(new SearchPaneOptions()
				.table('users')
				.value('phone')
			),
		new Field('users.site')
			.options(new Options()
				.table('sites')
				.value('id')
				.label('name')
			),
		new Field('sites.name')
			.searchPaneOptions(new SearchPaneOptions()
				.value('name')
				.label('name')
				.leftJoin('sites', 'sites.id', '=', 'users.site')
			),
	).leftJoin('sites', 'sites.id', '=', 'users.site');

	await editor.process(req.body);
	res.json(editor.data());
});

module.exports = router;