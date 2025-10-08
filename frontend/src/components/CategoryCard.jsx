import React from "react";

function CategoryCard({ name, image, onClick }) {
  return (
    <div
      className="w-[120px] h-[120px] md:w-[180px] md:h-[180px] rounded-2xl shrink-0 overflow-hidden bg-white hover:shadow-lg transition-all duration-300 relative cursor-pointer"
      style={{
        border: "2px solid #5A8F76",
        boxShadow: "0 4px 6px -1px #081B1B",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 12px -2px #081B1B";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
        e.currentTarget.style.boxShadow = "0 4px 6px -1px #081B1B";
      }}
      onClick={onClick}
    >
      <img
        src={image}
        alt=""
        className=" w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
      />
      <div
        className="absolute bottom-0 w-full left-0 px-3 py-1 rounded-t-xl text-center text-sm font-medium backdrop-blur"
        style={{
          backgroundColor: "#EEE8B2E6",
          color: "#203B37",
          boxShadow: "0 -2px 4px -1px #081B1B",
        }}
      >
        {name}
      </div>
    </div>
  );
}

export default CategoryCard;
