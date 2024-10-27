import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import { NavLink } from "react-router-dom";
import { FaEdit, FaEye, FaCopy, FaTrash } from "react-icons/fa"; // Import icons
import toast from "react-hot-toast";

const Pastes = () => {
  const pastes = useSelector((state) => state.pastes.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes({ _id: pasteId }));
  }

  return (
    <div>
      <input
        className="p-2 rounded-2xl mt-5 min-w-[600px]"
        type="search"
        placeholder="search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-5 mt-7">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div key={paste._id} className="border p-4 relative">
                {" "}
                {/* Added relative position */}
                <div className="flex justify-between">
                  {" "}
                  {/* Flex for title/content and icons */}
                  <div className="flex flex-col">
                    {" "}
                    {/* Flex column for title and content */}
                    <div className="font-bold">{paste.title}</div>
                    <div>{paste.content}</div>
                  </div>
                  <div className="absolute top-2 right-2 flex gap-2">
                    {" "}
                    {/* Position buttons */}
                    <button>
                      <NavLink to={`/?pasteId=${paste._id}`} title="Edit">
                        <FaEdit /> {/* Edit Icon */}
                      </NavLink>
                    </button>
                    <button>
                      <NavLink to={`/pastes/${paste._id}`} title="View">
                        <FaEye /> {/* View Icon */}
                      </NavLink>
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.content);
                        toast.success("Copied to clipboard");
                      }}
                      title="Copy"
                    >
                      <FaCopy /> {/* Copy Icon */}
                    </button>
                    <button
                      onClick={() => handleDelete(paste?._id)}
                      title="Delete"
                    >
                      <FaTrash /> {/* Delete Icon */}
                    </button>
                  </div>
                </div>
                <div className="mt-4">{paste.createdAt}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Pastes;
