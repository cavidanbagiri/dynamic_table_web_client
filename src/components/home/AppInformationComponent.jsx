import React from "react";

import easy_data_import_logo from "../../assets/easy_data_import_logo.png";
import secure_file_sharing_logo from "../../assets/secure_file_sharing_logo.png";
import realtime_collabiration_logo from "../../assets/realtime_collabiration_logo.png";
import file_storage_logo from "../../assets/file_storage_logo.png";
import api_integration_logo from "../../assets/api_integration_logo.png";
import realtime_sql_logo from "../../assets/realtime_sql_logo.webp";

import SlideTextComponent from "./AnimatedTextComponent";

import home_main_icon from "../../assets/home_main_icon.webp";


function AppInformationComponent() {
  return (
    <div className="flex flex-col  ml-3 p-2 py-4 ">
      <div>
        <h1 style={{ fontFamily: "Roboto" }} className="text-5xl font-medium mx-10 my-5">Dynamic Tables</h1>
      </div>

      <div className="flex flex-row justify-between ">
        
        <div className="flex flex-row flex-wrap  items-center justify-around px-5 mr-10 w-2/5">
          <div className="flex flex-col  w-80 p-2 h-48 border  shadow-md rounded-lg my-5">
            <div className="flex justify-center items-center w-full mb-2">
              <img className="h-20 w-20" src={easy_data_import_logo} alt="" />
            </div>
            <h1 className="text-center text-lg font-bold">Secure Sharing</h1>
            <span className="text-md p-2 text-gray-500">
              Upload Excel/CSV files and instantly create PostgreSQL tables
            </span>
          </div>
          <div className="flex flex-col  w-80 p-2 h-48 border  shadow-md rounded-lg my-5">
            <div className="flex justify-center items-center w-full mb-2">
              <img
                className="h-20 w-20"
                src={secure_file_sharing_logo}
                alt=""
              />
            </div>
            <h1 className="text-center text-lg font-bold">Secure Sharing</h1>
            <span className="text-md p-2 text-gray-500">
              Control who can access your data with public, private, or
              protected tables.
            </span>
          </div>
          <div className="flex flex-col  w-80 p-2 h-48 border  shadow-md rounded-lg my-5">
            <div className="flex justify-center items-center w-full mb-2">
              <img
                className="h-20 w-20"
                src={realtime_collabiration_logo}
                alt=""
              />
            </div>
            <h1 className=" text-center text-lg font-bold">
              Real-Time Collaboration
            </h1>
            <span className="text-md p-2 text-gray-500">
              Work together with your team as changes are updated in real-time.
            </span>
          </div>
          <div className="flex flex-col  w-80 p-2 h-48 border  shadow-md rounded-lg my-5">
            <div className="flex justify-center items-center w-full mb-2">
              <img className="h-20 w-20" src={file_storage_logo} alt="" />
            </div>
            <h1 className=" text-center text-lg font-bold">File Storage</h1>
            <span className="text-md p-2 text-gray-500">
              Store and manage your files with secure file storage
            </span>
          </div>

          <div className="flex flex-col  w-80 p-2 h-48 border  shadow-md rounded-lg my-5">
            <div className="flex justify-center items-center w-full mb-2">
              <img className="h-20 w-20" src={api_integration_logo} alt="" />
            </div>
            <h1 className=" text-center text-lg font-bold">Api Integration</h1>
            <span className="text-md p-2 text-gray-500">
              Integrate your data with external APIs
            </span>
          </div>

          <div className="flex flex-col  w-80 p-2 h-48 border  shadow-md rounded-lg my-5">
            <div className="flex justify-center items-center w-full mb-2">
              <img className="h-20 w-20" src={realtime_sql_logo} alt="" />
            </div>
            <h1 className=" text-center text-lg font-bold">Online SQL Editor</h1>
            <span className="text-md p-2 text-gray-500">
              Create and execute SQL queries in real-time
            </span>
          </div>
        </div>

        <div className=" flex flex-col justify-start w-3/5">
          <SlideTextComponent />

          <img className="mt-20" src={home_main_icon} alt="" />
        </div>

      </div>
    </div>
  );
}

export default AppInformationComponent;
