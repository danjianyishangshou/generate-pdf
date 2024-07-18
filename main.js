const http = require('http');
const generate_pdf = require('./index');
const url = require('url');
const server = http.createServer(async (req, res) => {
    if (req.method === 'GET' && req.url.startsWith('/generatepdf')) {
        const query = url.parse(req.url, true).query;
        const { contractNumber, token } = query;
        if (!contractNumber || !token) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ code: '401', error: 'Missing contractNumber or token' }));
            return;
        }
        try {
            const result = await generate_pdf(contractNumber, token);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: result
            }));
        } catch (error) {
            console.error('Error during PDF generation:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: error.toString() }));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});


server.listen(3000, '0.0.0.0', () => {
    console.log('Server is running on port 3000');
});
