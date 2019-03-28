
const cuid=require('cuid');
const Job=require('../models/job.model');

module.exports = {
  /**
   * Get all jobs
   * @param req
   * @param res
   * @returns void
   */
  getJobs(req, res) {   
    Job.find().sort('-Date').exec((err, jobs) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ jobs });
    });
  },


  /**
   * Get a single job
   * @param req
   * @param res
   * @returns void
   */
  getJob (req, res) {
      Job.findOne({ cuid: req.params.cuid }).exec((err, job ) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ job });
    });
  },


  /**
   * Save a job
   * @param req
   * @param res
   * @returns void
   */
  addJob(req, res) {    
    if (!req.body.title || 
        !req.body.description ) {
      res.status(403).end();  //forbidden request
    }

    Job.findOne({ title: req.body.title, description: req.body.description }).then(job => {
      if (job) {
        return res.status(400).json({ error: "already posted" }); //bad request
      } else {
        const newJob = new Job({
          title: req.body.title,
          description: req.body.description,
          communication: req.body.communication,
          location: req.body.location,
          type: req.body.type,
          benefits: req.body.benefits
        });
        newJob.cuid = cuid();

        newJob.save((err, saved) => {
          if (err) {
            res.status(500).send(err); //server error
          }
          res.json({ job: saved });
        });
      };
    });  
  },


  /**
   * Update a job
   * @param req
   * @param res
   * @returns void
   */
  updateJob(req, res) {
    if (!req.body.title || 
        !req.body.description ) {
      res.status(403).end();  //forbidden request
    }

    Job.updateOne({ cuid: req.params.cuid }, req.body, function(err, updated) {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ job: updated });
    });
  },

  /**
   * Delete a job
   * @param req
   * @param res
   * @returns void
   */
  deleteJob(req, res) {
    Job.findOne({ cuid: req.params.cuid }).exec((err, job) => {
      if (err) {
        res.status(500).send(err); //server error
      }

      job.remove(() => {
        res.status(200).end();
      });
    });
  }
}
