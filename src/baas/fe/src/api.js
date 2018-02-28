export default {
    fetch_services: () => `/services`,
    fetch_service_detail: (name) => `/services/${name}`,
    create_service: () => `/services`,
    update_function: (name) => `/services/${name}/function`,
}