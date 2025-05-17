import { getAccessToken, getPhoneNumber, getUserInfo } from "zmp-sdk/apis";
import { DefaultService } from "../api";

const loginWithZalo = async () => {
  try {
    const accessToken = await getAccessToken({});
    const tokenPhone = await getPhoneNumber({});
    const userZaloInfo = await getUserInfo({});
    const userRes = await DefaultService.postByDomainBookieZaloInfo({
      domain: "demo",
      requestBody: userZaloInfo.userInfo,
      token: accessToken,
      zaloCode: tokenPhone.token as string,
    });
    return userRes.result;
  } catch (error) {
    console.log(error);
  }
};

export default loginWithZalo;
