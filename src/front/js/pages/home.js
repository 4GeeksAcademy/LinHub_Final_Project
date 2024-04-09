import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Hero from "../component/home_components/Hero";
import SectionShowOne from "../component/home_components/SectionShowOne";
import SectionShowTwo from "../component/home_components/SectionShowTwo";
import BottomSection from "../component/home_components/BottomSection";
import Footer from "../component/home_components/Footer";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<Hero />
			<SectionShowOne />
			<SectionShowTwo />
			<BottomSection />
			<Footer />
		</>
	);
};
