import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import NoteCard from "../../components/Cards/NoteCard.jsx";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes.jsx";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axiosInstance from "../../utils/axiosInstance.js";
import Toast from "../../components/ToastMessage/Toast.jsx";
import EmptyCard from "../../components/EmptyCard/EmptyCard.jsx";
import emptyImg from "../../assets/empty.png";
const Home = () => {
  const [openAddEditModel, setOpenAddEditModel] = React.useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMessage, setShowToastMessage] = React.useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [userInfo, setUserInfo] = React.useState(null);
  const [notes, setNotes] = React.useState([]);

  const [isSearch, setIsSearch] = React.useState(false);

  const navigate = useNavigate();

  const showToastMsg = (message, type) => {
    setShowToastMessage({
      isShown: true,
      message: message,
      type: type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMessage({
      isShown: false,
      message: "",
    });
  };

  const handleEdit = (noteDetails) => {
    setOpenAddEditModel({
      isShown: true,
      type: "edit",
      data: noteDetails,
    });
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      console.log(response.data);
      if (response.data && response.data.user) setUserInfo(response.data.user);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      console.log(response.data);
      if (response.data && response.data.notes) setNotes(response.data.notes);
    } catch (error) {
      console.log("Error while fetching notes", error);
    }
  };

  const deleteNode = async (data) => {
    const nodeId = data._id;
    try {
      const response = await axiosInstance.delete("/delete-note/" + nodeId);
      if (response.data && response.data.error === false) {
        showToastMsg("Note Deleted Successfully", "delete");
        getAllNotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
      } else {
        console.log("Unexpected error occured " + error);
      }
    }
  };

  const searchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes/", {
        params: {
          query: query,
        },
      });
      if (response.data && response.data.notes) {
        setIsSearch(true);
        setNotes(response.data.notes);
      }
    } catch (error) {
      console.log("Error while searching notes", error);
    }
  };

  const updateIsPinned = async (noteData) => {
    const nodeId = noteData?._id;
    console.log(noteData.isPinned);
    try {
      const response = await axiosInstance.put(
        "/update-note-pinned/" + nodeId,
        {
          isPinned: !noteData.isPinned,
        }
      );
      if (response.data && response.data.note) {
        showToastMsg("Note Updated Successfully", "pinned");
        getAllNotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
      } else {
        console.log("Unexpected error occured " + error);
      }
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);


  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchNote={searchNote}
        handleClearSearch={handleClearSearch}
      />
      <div className="container mx-auto">
        {notes.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 mt-8 mr-8 ml-8">
            {notes.map((item, index) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={moment(item.createdOn).format("Do MMMM YYYY")}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => {
                  handleEdit(item);
                }}
                onDelete={() => {
                  deleteNode(item);
                }}
                onPinNote={() => {
                  updateIsPinned(item);
                }}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={emptyImg}
            message={`Start creating your first note! Click the 'Add' button to bring your thoughts, ideas, knowledge, and reminders. 
            Let's get started!`}
          />
        )}
      </div>
      {userInfo ? (
        <button
          className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
          onClick={() => {
            setOpenAddEditModel({
              isShown: true,
              type: "add",
              data: null,
            });
          }}
        >
          <MdAdd className="text-[32px] text-white" />
        </button>
      ) : null}
      <Modal
        isOpen={openAddEditModel.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5"
      >
        <AddEditNotes
          type={openAddEditModel.type}
          noteData={openAddEditModel.data}
          onClose={() => {
            setOpenAddEditModel({
              isShown: false,
              type: "add",
              data: null,
            });
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMsg}
        />
      </Modal>
      <Toast
        isShown={showToastMessage.isShown}
        message={showToastMessage.message}
        type={showToastMessage.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
