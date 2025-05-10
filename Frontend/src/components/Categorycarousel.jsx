import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { setSearchQuery } from "../redux/jobSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

export const Categorycarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };

  return (
    <div className="relative bg-[#F5F7FA] py-20">
      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#A9CCE3]/10 to-transparent pointer-events-none"></div>

      {/* Carousel */}
      <div className="container mx-auto px-4 relative z-10">
        <Carousel className="w-full max-w-4xl mx-auto my-16">
          <CarouselContent>
            {category.map((cat, index) => (
              <CarouselItem key={cat} className="md:basis-1/3 lg:basis-1/4">
                <Button
                  onClick={() => searchJobHandler(cat)}
                  variant="outline"
                  className="w-full py-6 px-4 bg-[#A9CCE3]/20 border border-[#A9CCE3]/50 text-[#2C3E50] font-semibold text-sm uppercase tracking-wide rounded-full shadow-md transition-all duration-300 hover:bg-gradient-to-r hover:from-[#2980B9] hover:to-[#A9CCE3] hover:text-white hover:shadow-[0_0_15px_rgba(41,128,185,0.4)]"
                >
                  {cat}
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-white border border-[#A9CCE3]/50 text-[#2C3E50] hover:bg-[#A9CCE3]/20 hover:text-[#2980B9] transition-all duration-300" />
          <CarouselNext className="bg-white border border-[#A9CCE3]/50 text-[#2C3E50] hover:bg-[#A9CCE3]/20 hover:text-[#2980B9] transition-all duration-300" />
        </Carousel>
      </div>
    </div>
  );
};
