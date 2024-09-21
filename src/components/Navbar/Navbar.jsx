import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import ProfileInfo from "../Cards/ProfileInfo";

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };
  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };
  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>
      {userInfo ? (
        <SearchBar
          value={searchQuery}
          onChange={({ target }) => {
            setSearchQuery(target.value);
          }}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />
      ) : null}

      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
