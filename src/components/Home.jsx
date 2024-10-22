import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { updatePastes, addToPastes } from "../redux/PasteSlice"
import toast from "react-hot-toast";
import { Copy } from "lucide-react";

const Home = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const pastes = useSelector((state) => state.paste.pastes);
    const dispatch = useDispatch();

    const createPaste = () => {
        if(title === "" || content === "") {
            toast.error("Enter all details")
        }else {

            const paste = {
                title: title,
                content: content, 
                _id: pasteId || Date.now().toString(36) + Math.random().toString(36).substring(2),
                createdAt: new Date().toISOString()
            };
    
            if(pasteId) {
                dispatch(updatePastes(paste));
            }else {
                dispatch(addToPastes(paste));
            }

            setTitle("");
            setContent("");
    
            setSearchParams("");
        }

    }

    const resetPaste = (paste) => {
        setTitle("");
        setContent("");
        setSearchParams("");
    };

    useEffect(() => {
        if (pasteId) {
            const paste = pastes.find(p => p._id === pasteId);
            console.log(paste);
            if (paste) {
                setTitle(paste.title);
                setContent(paste.content);
            }
        }
    }, [pasteId, pastes]);

  return (
    <div className="h-full w-full p-10 max-w-[1200px] mx-auto">
      <div className="flex items-center gap-8 mb-6">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 font-medium border border-zinc-300 rounded placeholder:font-medium"
          required
        />
        <button className="py-2 px-5 bg-blue-500 text-white font-medium rounded text-nowrap" onClick={createPaste}>
          {
            !pasteId ? "Create Paste" : "Update Paste"
          }
        </button>

        {
            pasteId && 
            <button className="py-2 px-5 bg-blue-500 text-white font-medium rounded text-nowrap" onClick={resetPaste}>
                reset
            </button>
        }
      </div>

      <div className="flex flex-col border border-zinc-300 rounded w-full relative">
        <div className="border-b border-zinc-300 py-3 px-4 flex justify-between items-center">
          <div className="flex items-center gap-[5px]">
            <div className="h-[12px] w-[12px] bg-[#FF5F57] rounded-[50%]"></div>
            <div className="h-[12px] w-[12px] bg-[#FEBC2E] rounded-[50%]"></div>
            <div className="h-[12px] w-[12px] bg-[#2DC842] rounded-[50%]"></div>
          </div>
          <div>
          <button
                className={`flex justify-center items-center  transition-all duration-300 ease-in-out group`}
                onClick={() => {
                  navigator.clipboard.writeText(content);
                  toast.success("Copied to Clipboard");
                }}
              >
                <Copy className="group-hover:text-sucess-500" size={20} />
              </button>
          </div>
        </div>
        
        <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-fit px-5 py-3"
        rows={20}
        placeholder="Write Your Content Here..."
        required
        />
      </div>
    </div>
  );
};

export default Home;
