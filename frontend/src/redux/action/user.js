import axios from "axios";
import { server } from "../../server";

// load user 
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadUserRequest" });
    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });
    dispatch({ type: "LoadUserSuccess", payload: data.user });
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    dispatch({ type: "LoadUserFail", payload: errorMessage });
  }
};

// load seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadSellerRequest" });
    const { data } = await axios.get(`${server}/seller/getSeller`, {
      withCredentials: true,
    });
    dispatch({ type: "LoadSellerSuccess", payload: data.seller });
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    dispatch({ type: "LoadSellerFail", payload: errorMessage });
  }
};
