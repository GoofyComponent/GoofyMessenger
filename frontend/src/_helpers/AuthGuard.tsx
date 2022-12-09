import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { accountService } from "../_services/account.service";

interface Props {
  children?: React.ReactNode;
}

const AuthGuard: FC<Props> = ({ children }: any) => {
  if (!accountService.islogedIn()) {
    return <Navigate to="/login" />;
  }
  return children;
};
export default AuthGuard;
