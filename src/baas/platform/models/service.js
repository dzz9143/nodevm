let services = {};

function getAll() {
    return Object.keys(services).map(name => services[name]);
}

function update(name, updater) {
    services[name] = Object.assign({}, services[name], updater);
}

function create(service) {
    services[service.name] = service;
}

function isExist(name) {
    return !!services[name];
}

function find(name) {
    return services[name];
}

function updateFunction(serviceName, funcName, funcBody) {
    if (services[serviceName]) {
        const functions = services[serviceName].functions || {};
        functions[funcName] = funcBody;
        services[serviceName] = Object.assign({}, services[serviceName], {
            functions,
        });
    }
}

function getFunctions(name) {
    return services[name] ? services[name].functions : {};
}

module.exports = {
    getAll,
    create,
    isExist,
    update,
    find,
    updateFunction,
    getFunctions,
}
