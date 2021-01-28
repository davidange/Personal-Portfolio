import Layout from "../components/Layout/mainLayout/layout";
import React from "react";
import { motion } from "framer-motion";
export default function About() {
	return (
		<Layout>
			<section className="p-8 items-center">
				<motion.img
					src="/images/Profile.jpg"
					className="w-32== h-32 md:w-48 md:h-auto lg:w-64  rounded-full mx-auto shadow-lg"
					alt="Profile"
					whileHover={{ zIndex: 1, scale: 1.05, transition: { duration: 0.2 } }}
				/>
			</section>
			<section className=" mx-auto max-w-4xl ">
				<h1 className="font-semibold my-2 ">About Me</h1>
				<p>
					I am a Software Developer 👩‍💻 and an Engineer 🛠. I studied at CETYS University (in Mexicali, Baja California,
					Mexico) my Undergraduate degree in Mechanical Engineering and had the opportunity of working in the industry
					before continuing with my studies.
				</p>
				<p>Currently I am pursuing my Master degre in Computational Mechanics at the Technical University of Munich.</p>
				<br></br>
				<p>I really enjoy programming and would love to pursue a career as a Software Developer 😁.</p>
			</section>
		</Layout>
	);
}