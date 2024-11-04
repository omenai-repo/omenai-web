"use client"

import DesktopNavbar from "@/components/navbar/desktop/DesktopNavbar";
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Page(){
    const [editorState, setEditorState] = useState();

    return(
        <main>
            <DesktopNavbar />
            <div className="px-4 lg:px-8 py-10">
                <ReactQuill 
                    theme="snow" 
                    value={editorState} 
                    onChange={setEditorState} 
                />
            </div>
        </main>
    )
}