import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Navbar from "../component/home_components/Navbar";
import Hero from "../component/home_components/Hero";
import SectionShowOne from "../component/home_components/SectionShowOne";
import SectionShowTwo from "../component/home_components/SectionShowTwo";
import BottomSection from "../component/home_components/BottomSection";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<Navbar />
			<Hero />
			<SectionShowOne />
			<SectionShowTwo />
			<BottomSection />
		</>
	);
};
