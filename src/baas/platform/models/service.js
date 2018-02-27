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

module.exports = {
    getAll,
    create,
    isExist,
    update,
    find,
}
