import axios from "axios";

// const baseUrl = "http://localhost:8080/api/v1";
const baseUrl = "http://52.62.203.162/api/v1";

// Start LoginForm
export const login = ({ uuid }) =>
  axios({
    method: "get",
    url: `${baseUrl}/getuserinfo`,
    params: {
      uuid,
    },
  });

export const lambdaGetData = ({ id }) =>
  axios({
    method: "get",
    url: `https://be2jfl9xll.execute-api.ap-southeast-2.amazonaws.com/cca3apigateway/image/${id}`,
  });

export const lambdaPutData = ({ id, link }) =>
  axios({
    method: "post",
    url: `https://be2jfl9xll.execute-api.ap-southeast-2.amazonaws.com/cca3apigateway/image`,
    data: {
      id,
      link,
    },
  });
export const getPopularMusicIns = () =>
  axios({
    method: "get",
    url: `${baseUrl}/getmusicalinstrument`,
    params: {},
  });

export const getMusicImgUrl = ({ musicId }) =>
  axios({
    method: "get",
    url: `${baseUrl}/s3imglink`,
    params: { musicId },
  });

export const getMusicInsByType = ({ type }) =>
  axios({
    method: "get",
    url: `${baseUrl}/getmusicinsbytype`,
    params: { type },
  });

export const signup = ({ uuid, name, email, phone, address }) =>
  axios({
    method: "post",
    url: `${baseUrl}/saveuserinfo`,
    data: {
      uuid,
      name,
      email,
      phone,
      address,
    },
  });

export const fetchStaffProfileByEmail = ({ id }) =>
  axios({
    method: "get",
    url: `${baseUrl}/fetchuserinfo`,
    params: { id },
  });

export const updateProfile = ({ id, name, phone, address }) =>
  axios({
    method: "put",
    url: `${baseUrl}/updateuerinfo`,
    data: {
      id,
      name,
      phone,
      address,
    },
  });

export const updateCartStatus = ({ musicId }) =>
  axios({
    method: "put",
    url: `${baseUrl}/updateaddstatus`,
    data: {
      musicId,
    },
  });

export const updateCartStatusToFalse = ({ musicId }) =>
  axios({
    method: "put",
    url: `${baseUrl}/updateaddstatusfalse`,
    data: {
      musicId,
    },
  });

export const addToCart = ({ musicId, userId, numRequire }) =>
  axios({
    method: "post",
    url: `${baseUrl}/postcartinfo`,
    data: {
      musicId,
      userId,
      numRequire,
    },
  });

export const addNewProduct = ({
  userId,
  count,
  type,
  name,
  num_left,
  price,
  description,
}) =>
  axios({
    method: "post",
    url: `${baseUrl}/postmusicalinstrument`,
    data: {
      userId,
      count,
      type,
      name,
      num_left,
      price,
      description,
    },
  });

export const getCartList = ({ id }) =>
  axios({
    method: "get",
    url: `${baseUrl}/getcartinfo`,
    params: { id },
  });

export const getTotalPrice = ({ id }) =>
  axios({
    method: "get",
    url: `${baseUrl}/totalprice`,
    params: { id },
  });

export const removeCart = ({ cartId }) =>
  axios({
    method: "delete",
    url: `${baseUrl}/removecartitem`,
    params: { cartId },
  });

export const updateNum = ({ cartId, numReq }) =>
  axios({
    method: "put",
    url: `${baseUrl}/updatereqnum`,
    data: {
      cartId,
      numRequire: numReq,
    },
  });
