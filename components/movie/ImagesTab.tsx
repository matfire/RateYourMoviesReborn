"use client";
import { Tab } from '@headlessui/react'
import Image from "next/image"
import { Movie } from "@matfire/the_movie_wrapper/dist/types/movie"
import client from "../../utils/tmdb";
import { useEffect, useState } from 'react';

export default function ImagesTab({ movie }: { movie: Movie }) {
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
							Posters
						</button>
					)}
				</Tab>
				<Tab as="div">
					{({ selected }) => (
						<button className={selected ? "tab tab-bordered tab-active" : "tab tab-bordered"}>
							Backdrops
						</button>
					)}
				</Tab>
				<Tab as="div">
					{({ selected }) => (
						<button className={selected ? "tab tab-bordered tab-active" : "tab tab-bordered"}>
							Logos
						</button>
					)}
				</Tab>
			</Tab.List>
			<Tab.Panels>
				<Tab.Panel>
					<div className="flex overflow-x-auto snap-x gap-4 lg:snap-none scroll_bar">
						{movie.images.posters.map((poster) => (
							<Image key={poster.file_path} className="snap-center w-80 h-auto object-cover" alt={`poster ${poster.file_path}`} src={client.getImageUrl(poster.file_path, "w500")} width={500} height={720} />
						))}
					</div>
				</Tab.Panel>
				<Tab.Panel>
					<div className="flex overflow-x-auto snap-x gap-4 lg:snap-none scroll_bar">
						{movie.images.backdrops.map((poster) => (
							<Image key={poster.file_path} className="snap-center" alt={`poster ${poster.file_path}`} src={client.getImageUrl(poster.file_path, "w780")} width={500} height={282} />
						))}
					</div>
				</Tab.Panel>
				<Tab.Panel>
					<div className="flex overflow-x-auto snap-x gap-4 lg:snap-none scroll_bar">
						{movie.images.logos.map((poster) => (
							<Image key={poster.file_path} className="snap-center" alt={`poster ${poster.file_path}`} src={client.getImageUrl(poster.file_path, "w500")} width={500} height={282} />
						))}
					</div>
				</Tab.Panel>
			</Tab.Panels>
		</Tab.Group>
	)
}