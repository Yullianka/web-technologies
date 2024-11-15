import React from "react";
import InputSection from "../InputSection/InputSection";
import Selection from '../Selection/Selection';
import "./CatalogFilter.css";

const CatalogFilter = ({ setSearchQuery, setSelectedModel, setSortOrder }) => {
  const modelOptions = [
    { value: "all", label: "All Models" },
    { value: "16", label: "iPhone 16" },
    { value: "15", label: "iPhone 15" },
    { value: "14", label: "iPhone 14" }
  ];

  const sortOptions = [
    { value: "low-to-high", label: "Price: Low to High" },
    { value: "high-to-low", label: "Price: High to Low" }
  ];

  return (
    <div className="inner">
      <InputSection setSearchQuery={setSearchQuery} />
      <Selection
        setSelectedModel={setSelectedModel}
        setSortOrder={setSortOrder}
        modelOptions={modelOptions} 
        sortOptions={sortOptions}   
      />
    </div>
  );
};

export default CatalogFilter;
