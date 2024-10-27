import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import {FaCopy} from "react-icons/fa"

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const allPastes = useSelector((state) => state.pastes.pastes);
  const dispatch = useDispatch();




  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

        // Function to format date to DD/MM/YYYY


  function createPaste() {



    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString,
    };

  

    if (pasteId) {
      // Update
      dispatch(updateToPastes(paste));
    } else {
      // Create
      dispatch(addToPastes(paste));
    }

    //after creation or updation
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          type="text"
          className="p-2 rounded-2xl mt-6 w-[200%] pl-4"
          placeholder="Enter Your Title Here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button className="p-1 rounded-2xl mt-6" onClick={createPaste}>
          {pasteId ? "Update Paste" : "Create Paste"}
        </button>
      </div>

      <div className="mt-5 relative"> {/* Added relative position for positioning the button */}
  <textarea
    className="rounded-2xl mt-4 min-w-[500px] p-4"
    value={value}
    placeholder="Enter content here"
    onChange={(e) => setValue(e.target.value)}
    rows={20}
  />
  
  {/* Copy Button */}
  <button
    className="flex absolute top-2 right-2 h-[40px] w-[40px] justify-center items-center p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition mt-4"
    onClick={() => {
      navigator.clipboard.writeText(value);
      toast.success("Copied to clipboard"); // Toast message
    }}
    title="Copy"
  >
    <FaCopy /> {/* Copy Icon */}
  </button>
</div>

    </div>
  );
};

export default Home;
