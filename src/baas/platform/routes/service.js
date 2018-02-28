var express = require('express');
var router = express.Router();
var serviceModel = require('../models/service');
var processManager = require('../models/process');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.json({
        services: serviceModel.getAll(),
    });
});

router.get('/:name', function (req, res, next) {
    const name = req.params.name;
    const service = serviceModel.find(name);
    if (!service) {
        res.status(404).json({
            ok: 0,
            error: `service [${name}] doesn't exist`,
        });
    } else {
        res.json({
            detail: service,
        });
    }
});

// create a new service and kick off a new process
router.post('/', function (req, res) {
    const { name } = req.body;
    if (!name) {
        res.status(500).json({
            ok: 0,
            error: `serviceName should not be empty`,
        });
        return;
    }
    if (serviceModel.isExist(name)) {
        res.status(500).json({
            ok: 0,
            error: `service [${name}] already exist`,
        });
        return;
    }
    const createTime = Date.now();
    serviceModel.create({
        name,
        ctime: createTime,
    });

    processManager.start(name);

    res.json({
        ok: 1,
    });
});

module.exports = router;
