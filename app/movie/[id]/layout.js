"use client";
import DescriptionIcon from "./Description";
import ImageIcon from "./Image";
import ReviewIcon from "./Review";
import VideoIcon from "./Video";

export default function Layout({ children }) {
  return (
    <div className="w-full flex">
      <div className="sticky top-0 h-full">
        <ul>
          <a
            href="#description"
            className="flex justify-between space-x-2 hover:bg-base-300 transition-colors"
          >
            <DescriptionIcon className="w-6 h-6" />
            <span>Overview</span>
          </a>
          <a
            href="#images"
            className="flex justify-between space-x-2 hover:bg-base-300 transition-colors"
          >
            <ImageIcon className="w-6 h-6" />
            <span>Images</span>
          </a>
          <a
            href="#videos"
            className="flex justify-between space-x-2 hover:bg-base-300 transition-colors"
          >
            <VideoIcon className="w-6 h-6" />
            <span>Videos</span>
          </a>
          <a
            href="#reviews"
            className="flex justify-between space-x-2 hover:bg-base-300 transition-colors"
          >
            <ReviewIcon className="w-6 h-6" />
            <span>Reviews</span>
          </a>
        </ul>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
