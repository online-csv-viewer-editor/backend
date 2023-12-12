let db = require('../db');
let router = require('express').Router();
let {
	Editor,
	Field,
	Validate,
	Format,
	Options
} = require("datatables.net-editor-server");

router.all('/api/sitesNested', async function(req, res) {
	let editor = new Editor(db, 'sites')
		.fields(
			new Field('id').set(false),
			new Field('name').validator(Validate.notEmpty()),
			new Field('continent')
				.validator(Validate.notEmpty())
				.options(new Options()
					.table('sites')
					.value('continent')
					.label('continent')
				)
		);

	await editor.process(req.body);
	res.json(editor.data());
});

module.exports = router;
