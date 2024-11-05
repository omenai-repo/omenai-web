"use client"
import DesktopNavbar from "@/components/navbar/desktop/DesktopNavbar";
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function page(){
    const editorRef = useRef<any>(null);

    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current);
        }
    };

    return(
        <main>
            <DesktopNavbar />
            <div className="px-4 lg:px-8 py-10">
                <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                    onInit={(evt, editor) => editorRef.current = editor}
                    // initialValue="<p>Start writing...</p>"
                    init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
                <div className="flex items-center gap-5 mt-5">
                    {/* <button 
                        onClick={handleReset}
                        className="w-full h-[50px] bg-white border border-black text-black cursor-pointer flex-1"
                    >
                        Reset form
                    </button> */}
                    <button 
                        onClick={log}
                        className="w-full h-[50px] bg-black text-white cursor-pointer flex-1"
                    >
                        Submit form
                    </button>
                </div>
            </div>
        </main>
    )
}