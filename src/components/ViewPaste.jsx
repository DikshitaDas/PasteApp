import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewPaste = () => {
  const { id } = useParams(); // Retrieve id from the URL parameters
  const allPastes = useSelector((state) => state.pastes.pastes);

  // Find the paste by id
  const paste = allPastes.find((p) => p._id === id);

  // Handle if the paste does not exist
  if (!paste) {
    return <div>Paste not found</div>;
  }

  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          type="text"
          className="p-2 rounded-2xl mt-6 w-[100%] pl-4"
          placeholder="Enter Your Title Here"
          value={paste.title}
          disabled
        />
      </div>

      <div className="mt-5">
        <textarea
          disabled
          className="rounded-2xl mt-4 min-w-[500px] p-4"
          value={paste.content}
          placeholder="enter content here"
          rows={20}
        />
      </div>
    </div>
  );
};

export default ViewPaste;
