
const cuid=require('cuid');
const Application=require('../models/application.model');

module.exports = {
  /**
   * Get all applications
   * @param req
   * @param res
   * @returns void
   */
  getApplications(req, res) {
    Application.find().sort('-Date').exec((err, applications) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ applications });
    });
  },


  /**
   * Get a single application
   * @param req
   * @param res
   * @returns void
   */
  getApplication (req, res) {
    Application.findOne({ cuid: req.params.cuid }).exec((err, application ) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ application });
    });
  },


  /**
   * Save a application
   * @param req
   * @param res
   * @returns void
   */
  addApplication(req, res) {
    if (!req.body.firstname || 
        !req.body.lastname || 
        !req.body.email ||
        !req.body.mobilephone ) {
      res.status(403).end();  //forbidden request
    }

    Application.findOne({ email: req.body.email, jobid: req.body.jobid }).then(application => {
      if (application) {
        return res.status(400).json({ error: "already applied" }); //bad request
      } else {
        const newApplication = new Application(req.body);
        newApplication.cuid = cuid();

        newApplication.save((err, saved) => {
          if (err) {
            res.status(500).send(err); //server error
          }
          res.json({ application: saved });
        });
      };
    });  
  },


  /**
   * Update a application
   * @param req
   * @param res
   * @returns void
   */
  updateApplication(req, res) {

    if (!req.body.firstname || 
        !req.body.lastname || 
        !req.body.email ||
        !req.body.mobilephone ) {
      res.status(403).end();  //forbidden request
    }

    Application.update({ cuid: req.params.cuid }, req.body, function(err, updated) {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ application: updated });
    });
  },

  /**
   * Delete a application
   * @param req
   * @param res
   * @returns void
   */
  deleteApplication(req, res) {
    Application.findOne({ cuid: req.params.cuid }).exec((err, application) => {
      if (err) {
        res.status(500).send(err); //server error
      }

      application.remove(() => {
        res.status(200).end();
      });
    });
  }
}