
let { getJobs,
      getJob,
      addJob,
      updateJob,
      deleteJob} = require('../controllers/job.controller');

module.exports = (router) => {

    // Get all job
    router.get('/', getJobs);

    // Get one job by cuid
    router.get('/:cuid', getJob);

    // Add a new job
    router.post('/', addJob);

    // Update a job by cuid
    router.patch('/:cuid', updateJob);

    // Delete a job by cuid
    router.delete('/:cuid', deleteJob);

    return router;
}