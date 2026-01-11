"use client";

import { SortOption } from "@/types/product";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string; icon: React.ReactNode }[] = [
  {
    value: "default",
    label: "Default",
    icon: <ArrowUpDown className="w-4 h-4" strokeWidth={2} aria-hidden="true" />,
  },
  {
    value: "price-asc",
    label: "Price: Low to High",
    icon: <ArrowUp className="w-4 h-4" strokeWidth={2} aria-hidden="true" />,
  },
  {
    value: "price-desc",
    label: "Price: High to Low",
    icon: <ArrowDown className="w-4 h-4" strokeWidth={2} aria-hidden="true" />,
  },
];


export function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const currentOption = sortOptions.find((opt) => opt.value === value) || sortOptions[0];
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex(sortOptions.findIndex((opt) => opt.value === value));
      }
      return;
    }

    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setFocusedIndex(-1);
        buttonRef.current?.focus();
        break;
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % sortOptions.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) => (prev - 1 + sortOptions.length) % sortOptions.length);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (focusedIndex >= 0) {
          onChange(sortOptions[focusedIndex].value);
          setIsOpen(false);
          setFocusedIndex(-1);
          buttonRef.current?.focus();
        }
        break;
      case "Tab":
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
    }
  };

  const handleOptionClick = (optionValue: SortOption) => {
    onChange(optionValue);
    setIsOpen(false);
    setFocusedIndex(-1);
    buttonRef.current?.focus();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Sort by: ${currentOption.label}`}
      >
        {currentOption.icon}
        <span className="hidden sm:inline">{currentOption.label}</span>
        <span className="sm:hidden">Sort</span>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden z-20"
          role="listbox"
          aria-label="Sort options"
          tabIndex={-1}
        >
          {sortOptions.map((option, index) => (
            <button
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              onMouseEnter={() => setFocusedIndex(index)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 text-sm text-left
                transition-colors duration-150
                ${
                  value === option.value
                    ? "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400"
                    : "text-zinc-700 dark:text-zinc-300"
                }
                ${
                  focusedIndex === index
                    ? "bg-zinc-100 dark:bg-zinc-800"
                    : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                }
                focus:outline-none
              `}
              role="option"
              aria-selected={value === option.value}
              tabIndex={-1}
            >
              {option.icon}
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

