import React from "react";
import noDataIllustration from "../assets/noData.svg";

const NoData = ({ msg }) => {
  return (
    <div className="w-full text-center py-6 text-[#666] font-[500] text-[18px] flex items-center justify-center flex-col space-y-5">
      <img
        src={noDataIllustration}
        alt="noDataIllustration"
        className="w-[200px]"
      />
      <h1 className="text-[#666666] text-[14px] font-[300] tracking-wide flex gap-[10px] items-center">
        No Data Found ! {msg}
      </h1>
    </div>
  );
};

export default NoData;
