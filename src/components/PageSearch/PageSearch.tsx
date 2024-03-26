"use client";
import { useState } from "react";
import Search from "../Search/Search";

const PageSearch = () => {
  const [roomTypeFilter, setRoomTypeFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div>
      <Search
        searchQuery={searchQuery}
        roomTypeFilter={roomTypeFilter}
        setRoomTypeFilter={setRoomTypeFilter}
        setSearchQuery={setSearchQuery}
      />
    </div>
  );
};

export default PageSearch;
