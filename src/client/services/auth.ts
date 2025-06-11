import { getPhoneNumber, getAccessToken, getUserInfo } from "zmp-sdk/apis";
import { AuthService, OpenAPI, StaffsService } from "../api";
import { RoleEnum } from "@/utils/enum";

export const loginWithZalo = async () => {
  const tokenPhone = await getPhoneNumber({});
  const accessToken = await getAccessToken();
  const {userInfo}= await getUserInfo({autoRequestPermission:true})
  const authenticateUser = await AuthService.authControllerLoginV1({
    requestBody: {
      zaloAccessToken: accessToken || "0000000002",
      phoneNumber: tokenPhone?.number || "0000000002",
      avatar:userInfo.avatar,
      name:userInfo.name
    },
  });
  OpenAPI.TOKEN = authenticateUser.token;
  OpenAPI.REFRESH_TOKEN = authenticateUser.refreshToken;
  if (
    authenticateUser.user.role.id === RoleEnum.staff ||
    authenticateUser.user.role.id === RoleEnum.admin
  ) {
    const staff = await StaffsService.staffsControllerFindByUserV1({
      id: authenticateUser.user.id,
    });
    return {
      auth: authenticateUser,
      staff: staff,
    };
  }
  return {
    auth: authenticateUser,
    staff: undefined,
  };
};

export const refreshToken = async () => {
  const tokenRes = await AuthService.authControllerRefreshV1();
  return tokenRes;
};

export const logout = async () => {
  await AuthService.authControllerLogoutV1();
  OpenAPI.TOKEN = undefined;
  OpenAPI.REFRESH_TOKEN = undefined;
};
