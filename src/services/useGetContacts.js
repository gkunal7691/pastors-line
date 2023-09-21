import { useApi } from "../hooks/useApi";
export const useGetContacts = () => {
  const { api, errors } = useApi();
  const getContacts = async (country) => {
    try {
      const { data } = await api.get(
        `/contacts.json?companyId=${country}&page=1`,
        {}
      );
      return data;
    } catch (error) {
      throw error;
    }
  };
  return getContacts;
};
