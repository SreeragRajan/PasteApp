import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/PasteSlice";
import { Calendar, Copy, Eye, PencilLine, Trash2 } from "lucide-react";
import { FormatDate } from "../utils/FormatDate";
import toast from "react-hot-toast";

const Pastes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(removeFromPastes(id));
  };

  const filteredProducts = pastes.filter((paste) =>
      paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full w-full px-20 py-16">
      <input
        type="text"
        placeholder="Search paste here..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 font-medium border border-zinc-300 rounded placeholder:font-medium outline-none mb-3"
      />

      <div className="flex flex-col border border-zinc-300 rounded w-full relative">
        <div className="border-b border-zinc-300 py-3 px-4 flex justify-between items-center">
          <h1 className="text-4xl font-bold">All Pastes</h1>
        </div>
        <div className="p-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((paste) => {
              return (
                <div key={paste?._id} className="flex items-center justify-between border border-zinc-300 rounded p-4 mb-3">
                  <div className="flex flex-col gap-3">
                    <h1 className="text-4xl font-semibold">{paste.title}</h1>
                    <p className="text-regular">{paste.content}</p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-2">
                      <button className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-blue-500">
                        <a href={`/?pasteId=${paste?._id}`}>
                          <PencilLine
                            className="text-black group-hover:text-blue-500"
                            size={20}
                          />
                        </a>
                      </button>
                      <button
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-pink-500"
                        onClick={() => handleDelete(paste?._id)}
                      >
                        <Trash2
                          className="text-black group-hover:text-pink-500"
                          size={20}
                        />
                      </button>

                      <button className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-orange-500">
                        <a href={`/pastes/${paste?._id}`} target="_blank">
                          <Eye
                            className="text-black group-hover:text-orange-500"
                            size={20}
                          />
                        </a>
                      </button>
                      <button
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-green-500"
                        onClick={() => {
                          navigator.clipboard.writeText(paste?.content);
                          toast.success("Copied to Clipboard");
                        }}
                      >
                        <Copy
                          className="text-black group-hover:text-green-500"
                          size={20}
                        />
                      </button>
                    </div>
                    <div className="gap-x-2 flex justify-end">
                      <Calendar className="text-black" size={20} />
                      <p className="text-sm font-medium">{FormatDate(paste?.createdAt)}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-2xl text-center w-full text-chileanFire-500 font-regular p-2">
              No Data Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pastes;
