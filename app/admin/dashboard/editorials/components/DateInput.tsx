"use client"

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

type DateInputProps = {
    label: string,
    value: Date | null,
    setDate: (date: Date | null) => void
}

export default function DateInput({
    label,
    value,
    setDate
}: DateInputProps){


    return(
        <div className="w-full flex-1">
            <div className="flex flex-col">
                <label htmlFor={label} className="text-xs text-[#858585]">
                    {label}
                </label>
                <DatePicker 
                    selected={value} 
                    onChange={date => setDate(date)}
                    className="focus:ring-0 border px-4 border-dark/20 outline-none focus:outline-none h-[50px] focus:border-dark transition-all duration-200 ease-in-out ring-0 placeholder:text-dark/40 py-1 w-full"
                />
            </div>
        </div>
    )
}