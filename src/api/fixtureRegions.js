import axios from "axios";
export const url = "http://localhost:5000/regions";

const date = "2023-02-22T07:42:52.854Z";

export const addRegion = (region) => axios.post(`${url}`, region);
export const getTopTeamsRegions = () => axios.get(`${url}/two`);
export const getRegions = () => axios.get(`${url}`);
export const getRegionFixtures = () => axios.get(`${url}/fixtures`);

export const oneRegion = (id) => axios.get(`${url}/${id}`);

export const generateRegionsFixtures = (regionId) =>
  axios.post(`${url}/fixtures/${regionId}/${date}`);

export const editRegion = (id, updatedRegion) =>
  axios.patch(`${url}/${id}`, updatedRegion);
