// Note this is rubbish and just a copy of CascadingLists
let db = require('../db');
let router = require('express').Router();
let {
	Editor,
	Field,
	Validate,
	Format,
	Options
} = require("datatables.net-editor-server");

router.all('/api/countries', async function(req, res) {
  let values = req.body.values['team.continent'];
  if (!values) {
    res.json({});
    return;
  }

  let results = await db
    .select('id as value', 'name as label')
    .from('country')
    .where({continent: req.body.values['team.continent']});

  res.json({
    options: {
      'team.country': results
    }
  });
});

module.exports = router;
