//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('/', (req, res) => {
   let applications = req.session.data.applications;
   const filterStatus = req.query.filterStatus;
   console.log("filter status")
   console.log(filterStatus)
   if (filterStatus) {
   console.log('filtering')
   applications = applications.filter((application) =>
         filterStatus.includes(application.status)
      )
   }
   applications.sort((a, b) => {
    const submittedA = a.submittedAt; // ignore upper and lowercase
    const submittedB = b.submittedAt; // ignore upper and lowercase
    if (submittedA < submittedB) {
      return -1;
    }
    if (submittedA > submittedB) {
      return 1;
    }
  
    // names must be equal
    return 0;
  });
   res.render('index.html', {
      applications
   })
})

router.get('/applications/:id', (req, res) => {
     const id = req.params.id 
     const applications = req.session.data.applications;

     const application = applications.find((application) =>
     application.id == id)   
     
     res.render('application.html', {
        application
     })
})

router.post('/applications/:id/approve', (req, res) => {
   const id = req.params.id 
   const applications = req.session.data.applications;
   const application = applications.find((application) =>
   application.id == id)  
   application.status = 'approved'
   res.redirect(`/applications/${id}`)
})

router.post('/applications/:id/reject', (req, res) => {
   const id = req.params.id 
   const applications = req.session.data.applications;
   const application = applications.find((application) =>
   application.id == id)  
   application.status = 'not approved'
   res.redirect(`/applications/${id}`)
})
