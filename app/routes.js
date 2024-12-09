//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('/applications/:id', (req, res) => {
     const id = req.params.id 
     const applications = req.session.data.applications;

     const application = applications.find((application) =>
     application.id == id)   
     
     res.render('application.html', {
        application
     })
})
