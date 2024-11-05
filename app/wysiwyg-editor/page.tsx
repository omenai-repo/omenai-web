"use client"

import DesktopNavbar from "@/components/navbar/desktop/DesktopNavbar";
import { useState } from 'react';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(
    () => {
      return import('react-quill');
    },
    { ssr: false }
  );

export default function page(){
    const [value, setValue] = useState<any>(<p></p>);

    const handleValueChange = (value: any) => {
        setValue(value);
        // console.log(value)
    };

    return(
        <main>
            <DesktopNavbar />
            <div className="px-4 lg:px-8 py-10">
                <ReactQuill 
                    theme="snow" 
                    value={value} 
                    onChange={handleValueChange} 
                />
            </div>
        </main>
    )
}