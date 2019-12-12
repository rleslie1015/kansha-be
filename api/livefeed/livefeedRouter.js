const router = require('express').Router()
const { feedEmmiter } = require('./liveFeedEmmiter')

router.get('/',  (req, res) => {
    req.profile
})

router.get('/live', (req, res) => {
	res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive',
    });
    
	feedEmmiter.on('recognition', data => {
		res.write(`event: recognition\n`);
		res.write(`data: ${JSON.stringify(data)}\n\n`);
	});
});

module.exports = router