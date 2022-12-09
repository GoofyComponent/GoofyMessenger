import React, { useState, useEffect } from "react";

let saveToken = async (JWT: string) => {
  await localStorage.setItem("token", JWT);
};

let logout = () => {
  localStorage.removeItem("token");
};

let islogedIn = () => {
  let token = localStorage.getItem("token");
  return !!token;
};

export const accountService = {
  saveToken,
  logout,
  islogedIn,
};
