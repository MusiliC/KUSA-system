import { toast } from "react-toastify";
import { actionTypes } from "../actions/actionTypes";

const initialState = {
  fixtures: [],
  oneFixture: {},
  regions: [],
  regionTopTeams: [],
  oneRegion: {},
};

const fixtureReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_REGION:
      toast("Region registered successful...", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return {
        ...state,
        oneRegion: action.payload,
      };

    case actionTypes.GET_ALL_REGIONS:
      return {
        ...state,
        regions: action.payload,
      };

    case actionTypes.GET_ONE_REGION:
      return {
        oneRegion: action.payload,
      };

    case actionTypes.GENERATE_REGIONAL_FIXTURES:
      toast("Fixtures generated successfully...", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return {
        ...state,
        fixtures: [action.payload],
      };

    case actionTypes.REGIONAL_TOP_TEAMS:
      return {
        ...state,
        regionTopTeams: action.payload,
      };

    case actionTypes.UPDATE_REGION:
      toast.success("Region updated successful...", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return {
        regions: state.map((region) =>
          region._id === action.payload.id ? action.payload : region
        ),
      };

    case actionTypes.GET_REGIONAL_FIXTURES:
      return { fixtures: action.payload };

    default:
      return state;
  }
};

export default fixtureReducer;
