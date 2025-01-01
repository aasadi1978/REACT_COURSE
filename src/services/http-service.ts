import apiClient from "./api-client";

interface Entity {
  id: number;
}
class HttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll<T>() {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoint, { signal: controller.signal });
    return { request, cancel: () => controller.abort() };
  }

  delete(id: number) {
    return apiClient.delete(this.endpoint + "/" + id);
  }

  create<T>(entity: T) {
    return apiClient.post(this.endpoint, entity);
  }

  // The update method takes an entity object and sends a PATCH request to the server to update the entity with the specified ID.
  // The entity object must have an id property that specifies the ID of the entity to update.
  // To implement the update method, we require the type T to extend the Entity interface to ensure that the entity object has an id property.
  update<T extends Entity>(entity: T) {
    return apiClient.patch(this.endpoint + "/" + entity.id, entity);
  }
}

// We cannot export an instance of the HttpService class directly because we need to pass the endpoint to the constructor.
// Instead, we export a function that creates a new instance of the HttpService class with the specified endpoint.
const create = (endpoint: string) => new HttpService(endpoint);

export default create;
