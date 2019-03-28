
let { getApplications,
      getApplication,
      addApplication,
      updateApplication,
      deleteApplication } = require('../controllers/application.controller');

module.exports = (router) => {

  // Get all applications
  router.get('/', getApplications);

  // Get one application by cuid
  router.get('/:cuid', getApplication);

  // Add a new application
  router.post('/', addApplication);

  // Update a application by cuid
  router.patch('/:cuid', updateApplication);

  // Delete a application by cuid
  router.delete('/:cuid', deleteApplication);

  return router;
}
