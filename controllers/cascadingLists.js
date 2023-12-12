let db = require('../db');
let router = require('express').Router();
let {
	Editor,
	Field,
	Validate,
	Format,
	Options
} = require("datatables.net-editor-server");

router.all('/api/cascadingLists', async function(req, res) {
	let editor = new Editor(db, 'team')
		.fields(
			new Field('team.name'),
			new Field('team.continent').options(
				new Options().table('continent').value('id').label('name')
			),
			new Field('continent.name'),
			new Field('team.country').options(
				new Options().table('country').value('id').label('name')
      ),
      new Field('country.name')
		)
		.leftJoin('continent', 'continent.id', '=', 'team.continent')
		.leftJoin('country',   'country.id',   '=', 'team.country')

	await editor.process(req.body);
	res.json(editor.data());
});

module.exports = router;
