const cp = require('child_process');
const path = require('path');
const serviceModel = require('./service');
let processManager = {};

const defaultOptions = {
    cwd: path.resolve(__dirname, '../../service/bin'),
    env: {},
}

function getProcess(name) {
    return processManager[name] || {};
}

function reload(serviceName) {
    if (!processManager[serviceName]) {
        return start(serviceName);
    }

    const childProcess = processManager[serviceName];
    childProcess.kill();
    delete processManager[serviceName];
    start(serviceName);
}

function start(serviceName) {
    if (!processManager[serviceName] && serviceModel.isExist(serviceName)) {
        const childProcess = cp.fork('start', Object.assign({}, defaultOptions, {
            env: {
                serviceName,
            }
        }));
        processManager[serviceName] = childProcess;
        serviceModel.update(serviceName, {
            status: 'pending',
            error: null,
        });

        childProcess.on('error', (error) => {
            delete processManager[serviceName];
            serviceModel.update(serviceName, {
                status: 'error',
                error,
            });
        });

        childProcess.on('exit', (error) => {
            delete processManager[serviceName];
            serviceModel.update(serviceName, {
                status: 'exit',
                error,
            });
        });

        childProcess.on('message', (msg) => {
            if (msg && msg.type === 'SUCCESS') {
                serviceModel.update(serviceName, {
                    status: 'running',
                    address: msg.address,
                    error: null,
                })
            }
        });
    }
}

module.exports = {
    start,
    reload,
    getProcess,
};