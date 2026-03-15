const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

function generateReference (prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

router.get('/', function (req, res) {
  res.redirect('/start')
})

router.get('/immediate-danger', function (req, res) {
  res.render('immediate-danger')
})

router.post('/immediate-danger', function (req, res) {
  const answer = req.session.data['immediate-danger']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'immediate-danger': 'Select yes if you are in immediate danger, or no if you are not.' }
    return res.render('immediate-danger')
  }
  if (answer === 'yes') {
    return res.redirect('/ineligible-immediate-danger')
  } else if (answer === 'no') {
    return res.redirect('/have-children')
  }
  res.redirect('/have-children')
})

router.get('/ineligible-immediate-danger', function (req, res) {
  res.render('ineligible-immediate-danger')
})

router.get('/have-children', function (req, res) {
  res.render('have-children')
})

router.post('/have-children', function (req, res) {
  const answer = req.session.data['have-children']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'have-children': 'Select yes if you have children with you, or no if you do not.' }
    return res.render('have-children')
  }
  if (answer === 'yes') {
    return res.redirect('/safe-contact')
  } else if (answer === 'no') {
    return res.redirect('/current-accommodation')
  }
  res.redirect('/current-accommodation')
})

router.get('/current-accommodation', function (req, res) {
  res.render('current-accommodation')
})

router.post('/current-accommodation', function (req, res) {
  const answer = req.session.data['current-accommodation']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'current-accommodation': 'Select your current accommodation situation.' }
    return res.render('current-accommodation')
  }
  if (answer === 'safe-tonight') {
    return res.redirect('/safe-contact')
  } else if (answer === 'nowhere-safe') {
    return res.redirect('/safe-contact')
  } else if (answer === 'with-abuser') {
    return res.redirect('/ineligible-current-accommodation')
  }
  res.redirect('/safe-contact')
})

router.get('/ineligible-current-accommodation', function (req, res) {
  res.render('ineligible-current-accommodation')
})

router.get('/safe-contact', function (req, res) {
  res.render('safe-contact')
})

router.post('/safe-contact', function (req, res) {
  const answer = req.session.data['safe-contact']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'safe-contact': 'Select yes if you have a safe contact method, or no if you do not.' }
    return res.render('safe-contact')
  }
  if (answer === 'yes') {
    return res.redirect('/contact-details')
  } else if (answer === 'no') {
    return res.redirect('/ineligible-safe-contact')
  }
  res.redirect('/contact-details')
})

router.get('/ineligible-safe-contact', function (req, res) {
  res.render('ineligible-safe-contact')
})

router.get('/contact-details', function (req, res) {
  res.render('contact-details')
})

router.post('/contact-details', function (req, res) {
  const answer = req.session.data['contact-details']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'contact-details': 'Enter your safe contact details.' }
    return res.render('contact-details')
  }
  res.redirect('/check-answers')
})

router.get('/check-answers', function (req, res) {
  res.render('check-answers')
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('EHS')
  }
  res.redirect('/confirmation')
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation')
})

module.exports = router
