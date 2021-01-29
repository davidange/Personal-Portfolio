import { GetStaticProps } from "next";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/Layout/mainLayout/layout";
import { fetchPostsFileNames } from "../lib/projects";
import ProjectCard from "../components/Projects/ProjectCard/ProjectCard";
import AnimatedIntro from "../components/MainPage/AnimatedIntro/AnimatedIntro";
import React, { useState } from "react";

export const getStaticProps: GetStaticProps = async (context) => {
	const postsFileNames = await fetchPostsFileNames();
	const projectsMetadataWithId = postsFileNames
		.map((post) => {
			return { ...require(`../content/projects/${post}`).meta, id: post.replace(".mdx", "") } as ProjectPostMetaWithId;
		})
		.sort((a, b) => (a.id > b.id ? 1 : -1))
		.filter((post) => post.stared === true);
	return {
		props: {
			projectsMetadataWithId,
		},
	};
};
export default function Home({ projectsMetadataWithId }: { projectsMetadataWithId: ProjectPostMetaWithId[] }) {
	const [isHeroVisible, setIsHeroVisible] = useState(true);
	console.log(isHeroVisible);
	const onClickHideHero = () => {
		setIsHeroVisible(false);
	};
	let header = isHeroVisible && <AnimatedIntro onClickHandler={onClickHideHero} key="1" />;
	return (
		<Layout navBar={!isHeroVisible} header={header}>
			{!isHeroVisible && (
				<>
					<section className={" p-2 mx-auto max-w-4xl md:my-12"}>
						<h1 className={"font-semibold my-2"}>Welcome!</h1>
						<p>
							Currently my Site is under 🚧⚠🚧Construction🚧⚠🚧. The current look and its contentsis not the final. Feel free on
							looking around the site.😄
						</p>
					</section>
					<section className={" p-2 mx-auto max-w-4xl"}>
						<h1 className={"font-semibold my-2"}>Selected Projects</h1>
						<ul className={"m-2"}>
							{projectsMetadataWithId.map(({ id, date, title, keywords, mainImage, images }) => {
								let imageRoute = !images ? undefined : !mainImage ? images[0] : images[mainImage];
								return (
									<motion.li key={id} whileHover={{ zIndex: 1, scale: 1.05, transition: { duration: 0.2 } }}>
										<ProjectCard id={id} date={date} title={title} keywords={keywords} image={imageRoute} />
									</motion.li>
								);
							})}
						</ul>
					</section>
				</>
			)}
		</Layout>
	);
}
