'use client'
import React from "react"
import Navbar from "@/components/Navbar"
import CategoryBlocks from "@/components/CategoryBlocks"
import Carousel from "@/components/Swiper"
import HomeProducts from "@/components/HomeProducts"
const Home = () => {
   return (
      <>
    <Navbar/>
    <CategoryBlocks/>
    <div className="px-6 md:px-16 lg:px-32">
    <Carousel/>
    <HomeProducts/>
    </div>
    </>
   )
}

export default Home