import {
  CREATE_COURSES_REQUEST,
  CREATE_COURSES_SUCCESS,
  CREATE_COURSES_FAIL,
  CLEAR_ERRORS,
} from "../constants/CoursesConstants";
import axios from "axios";
import { uploadVideosToAzure } from "../middlewares/VideoUpload";
import { uploadImageToAzure } from "../middlewares/ImageUplaod";

const BASE_URL = "http://localhost:3900";

// CREATE COURSES ACTIONS
export const adminCreateCourse = (formData, onProgress) => async (dispatch) => {
  const { thumbnailFile, videoDivsArray, ...restFormData } = formData;

  const uploadedImageUrl = await uploadImageToAzure(thumbnailFile);
  const uploadedVideoUrls = await uploadVideosToAzure(
    videoDivsArray,
    onProgress
  );

  const jsonData = {
    ...restFormData,
    thumbnailUrl: uploadedImageUrl,
    videoUrls: uploadedVideoUrls,
  };

  const jsonString = JSON.stringify(jsonData);

  try {
    dispatch({ type: CREATE_COURSES_REQUEST });

    console.log("Create course");

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${BASE_URL}/api/v1/createCourse`,
      jsonString,
      config
    );

    dispatch({ type: CREATE_COURSES_SUCCESS, payload: data.Admincourses });
  } catch (error) {
    dispatch({
      type: CREATE_COURSES_FAIL,
      payload: error.response.data.message,
    });
    console.log("error", error);
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
