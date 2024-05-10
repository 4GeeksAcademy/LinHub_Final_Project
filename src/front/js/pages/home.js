import React from "react";
import "../../styles/home.css";
import Hero from "../component/home_components/Hero";
import SectionShowOne from "../component/home_components/SectionShowOne";
import SectionShowTwo from "../component/home_components/SectionShowTwo";
import BottomSection from "../component/home_components/BottomSection";
import Footer from "../component/home_components/Footer";
import Navbar from "../component/home_components/Navbar";

export const Home = () => {

	return (
		<>
			<Navbar />
			<Hero />
			<SectionShowOne />
			<SectionShowTwo />
			<BottomSection />
			<Footer />
		</>
	);
};
