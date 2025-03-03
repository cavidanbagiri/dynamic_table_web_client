import React from "react";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { setShowMessageInitial } from "../store/table_store";

import TableService from "../service/TableService";

import UserProfileComponent from "../components/home/UserProfileComponent";
import PublicTablesComponent from "../components/home/PublicTablesComponent";
import MyFolderComponent from "../components/common/MyFolderComponent";
import MessageBox from "../components/common/MessageBox";
import AppInformationComponent from "../components/home/AppInformationComponent";

function Home() {
  const dispatch = useDispatch();

  const is_auth = useSelector((state) => state.loginRegisterSlice.is_auth);

  const show_message = useSelector((state) => state.tableSlice.show_message);
  const front_message = useSelector((state) => state.tableSlice.front_message);

  useEffect(() => {
    if (show_message === 1 || show_message === 0) {
      setTimeout(() => {
        dispatch(setShowMessageInitial());
        dispatch(TableService.fetchMyTables());
      }, 1500);
    }
  }, [show_message, dispatch]);

  return (
    <div className="flex flex-col">
      {show_message === 1 ? (
        <MessageBox message={front_message} color={"bg-green-500"} />
      ) : show_message === 0 ? (
        <MessageBox message={front_message} color={"bg-red-500"} />
      ) : null}

      <AppInformationComponent />

      <div className=" flex flex-row items-start p-2 relative">
        <MyFolderComponent />

        <div className="flex flex-col">
          {is_auth && <UserProfileComponent />}

          <PublicTablesComponent />
        </div>
      </div>
    </div>
  );
}

export default Home;
