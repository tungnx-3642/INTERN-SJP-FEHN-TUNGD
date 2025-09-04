import apiClient from "./apiClient";

export interface Address {
  id?: number;
  userid?: number;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  nationality: string;
  zipCode: string;
  phone: string;
}

const resource = "addresses";

export const addressApi = {
  getAddressesByUser: async (userId: number): Promise<Address[]> => {
    return apiClient.get(`${resource}?userid=${userId}`);
  },

  createAddress: async (address: Address): Promise<Address> => {
    return apiClient.post(resource, address);
  },

  updateAddress: async (id: number, address: Partial<Address>): Promise<Address> => {
    return apiClient.put(`${resource}/${id}`, address);
  },

  deleteAddress: async (id: number): Promise<void> => {
    return apiClient.delete(`${resource}/${id}`);
  },
};
