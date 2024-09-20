import axios from 'axios'

const personalToken = "9d0096dc-8069-4e88-8d9f-ac0004474d57";
const baseURL = "https://api.real-estate-manager.redberryinternship.ge/api/"

export const getRealEstates = async () => {
    try {
        const response = await axios.get(`${baseURL}real-estates`, {
            headers: {
                Authorization: `Bearer ${personalToken}`
            }
        });
        // console.log(response);
        return response;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const getRegions = async () => {
    try {
        const response = await axios.get(`${baseURL}regions`, {
            headers: {
                Authorization: `Bearer ${personalToken}`
            }
        })
        // console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getAgents = async () => {
    try {
        const response = await axios.get(`${baseURL}agents`, {
            headers: {
                Authorization: `Bearer ${personalToken}`
            }
        })
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
getAgents();


export const addAgent = async (agentData) => {
    console.log(agentData)
    try {
      const response = await axios.post(`${baseURL}agents`, agentData, {
        headers: {
          Authorization: `Bearer ${personalToken}`,
        }
      });
      console.log("AXIOS REQUEST", response.data);
      return response.data;
    } catch (error) {
      console.error("Error adding agent:", error);
      throw error;
    }
  };
