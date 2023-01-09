import { toast } from "react-toastify";
import * as api from "../../api/fixtureRegions";
import { actionTypes } from "./actionTypes";

export const registerRegion = (region) => async (dispatch) => {
  try {
    const response = await api.addRegion(region);

    dispatch({
      type: actionTypes.ADD_REGION,
      payload: response.data,
    });
    getRegions();
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
};

export const getRegions = () => async (dispatch) => {
  try {
    const response = await api.getRegions();

    dispatch({
      type: actionTypes.GET_ALL_REGIONS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOneRegion = (id) => async (dispatch) => {
  try {
    const response = await api.oneRegion(id);

    dispatch({
      type: actionTypes.GET_ONE_REGION,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
};

export const generateRegionalFixtures = (regionId) => async (dispatch) => {
  try {
    const response = await api.generateRegionsFixtures(regionId);

    dispatch({
      type: actionTypes.GENERATE_REGIONAL_FIXTURES,
      payload: response.data.result,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
};

export const RegionsBestTeams = () => async (dispatch) => {
  try {
    const response = await api.getTopTeamsRegions();

    dispatch({
      type: actionTypes.REGIONAL_TOP_TEAMS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const allRegionsFixtures =
  (region = null) =>
  async (dispatch) => {
    try {
      const response = await api.getRegionFixtures(region);

      dispatch({
        type: actionTypes.GET_REGIONAL_FIXTURES,
        payload: response.data.fixtures,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const updateRegion = (id, updatedRegion) => async (dispatch) => {
  try {
    const response = await api.editRegion(id, updatedRegion);

    dispatch({
      type: actionTypes.UPDATE_REGION,
      payload: response.data,
    });
    dispatch(getRegions());
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
};

// export const deleteFixtures = (id) => async (dispatch) => {
//   try {
//     await api.deleteFixture(id);

//     dispatch({
//       type: actionTypes.DELETE_FIXTURE,
//       payload: id,
//     });

//   } catch (error) {
//     console.log(error);
//     toast.error(error.response?.data, {
//       position: toast.POSITION.BOTTOM_RIGHT,
//     });
//   }
// };
