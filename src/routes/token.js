/**
 * REST endpoint for /token
 */

const sanitizeHtml = require('sanitize-html');
const app = require('express');
const router = app.Router();
const bodyParser = require('body-parser');
var admin = require('firebase-admin');
var serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);

router.use(bodyParser.urlencoded({ extended: false }));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const approvedApps = JSON.parse(process.env.APPROVED_APPS);

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch(next);
};

router.post("/", asyncMiddleware(async (req, res) => {
  const { title: titleIn, done } = req.body;
  const title = sanitizeHtml(titleIn, {
    allowedTags: [ 'a' ],
    allowedAttributes: {
      'a': [ 'href' ]
    },
  });

  const packageName = req.body.packageName;
  const apiKey = req.body.apiKey;
  const client = approvedApps.find((c) => c.packageName == packageName && c.apiKey === apiKey);

  if (!client) {
    return res.status(401).json({error: 'InvalidCredentials', error_description: 'Invalid credentials.'});
  }

  admin.appCheck().createToken(client.appId)
  .then((customToken) => {
    res.json(customToken);
  })
  .catch((error) => {
    console.log('Error creating custom token: ', error)
    res.status(500).json({error: 'InternalServerError', error_description: 'There was an internal server error.'});
  });
}));

module.exports = router;
