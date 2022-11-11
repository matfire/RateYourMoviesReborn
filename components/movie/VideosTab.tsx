"use client";

import { Tab } from '@headlessui/react'
import { useEffect, useState } from "react";
import { Video } from "@matfire/the_movie_wrapper/dist/types/generic";
import MovieVideo from './MovieVideo';



export default function VideosTab({ videos }: { videos: Video[] }) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true)
	}, [])
	if (!mounted) return null
	return (

		<Tab.Group>
			<Tab.List className="flex justify-center tabs mb-5">
				<Tab as="div">
					{({ selected }) => (
						<button className={selected ? "tab tab-bordered tab-active" : "tab tab-bordered"}>
							Trailers
						</button>
					)}
				</Tab>
				<Tab as="div">
					{({ selected }) => (
						<button className={selected ? "tab tab-bordered tab-active" : "tab tab-bordered"}>
							Teasers
						</button>
					)}
				</Tab>
				<Tab as="div">
					{({ selected }) => (
						<button className={selected ? "tab tab-bordered tab-active" : "tab tab-bordered"}>
							Behind The Scenes
						</button>
					)}
				</Tab>
				<Tab as="div">
					{({ selected }) => (
						<button className={selected ? "tab tab-bordered tab-active" : "tab tab-bordered"}>
							Featurettes
						</button>
					)}
				</Tab>
			</Tab.List>
			<Tab.Panels>
				<Tab.Panel>

					<div className="flex p-2 snap-x gap-4 overflow-x-auto lg:snap-none scroll_bar">
						{videos.filter((v) => v.type === "Trailer").map((v) => <MovieVideo video={v} key={v.key} />)}
					</div>
				</Tab.Panel>
				<Tab.Panel>

					<div className="flex p-2 snap-x gap-4 overflow-x-auto lg:snap-none scroll_bar">
						{videos.filter((v) => v.type === "Teaser").map((v) => <MovieVideo video={v} key={v.key} />)}
					</div>
				</Tab.Panel>
				<Tab.Panel>

					<div className="flex p-2 snap-x gap-4 overflow-x-auto lg:snap-none scroll_bar">
						{videos.filter((v) => v.type === "Behind the Scenes").map((v) => <MovieVideo video={v} key={v.key} />)}
					</div>
				</Tab.Panel>
				<Tab.Panel>

					<div className="flex p-2 snap-x gap-4 overflow-x-auto lg:snap-none scroll_bar">
						{videos.filter((v) => v.type === "Featurettes").map((v) => <MovieVideo video={v} key={v.key} />)}
					</div>
				</Tab.Panel>
			</Tab.Panels>
		</Tab.Group>

	)
}