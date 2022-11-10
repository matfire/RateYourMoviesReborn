"use client";
import DescriptionIcon from "./Description";
import ImageIcon from "./Image";
import ReviewIcon from "./Review";
import VideoIcon from "./Video";
import FilmIcon from "./Film";

export default function Layout({ children }) {
  return (
    <div className="w-full flex flex-col lg:flex-row">
      <div className="film_details_nav">
        <a href="#description" className="film_details_nav_link">
          <DescriptionIcon className="film_details_nav_link_icon" />
          <p>Overview</p>
        </a>
        <a href="#images" className="film_details_nav_link">
          <ImageIcon className="film_details_nav_link_icon" />
          <p>Images</p>
        </a>
        <a href="#videos" className="film_details_nav_link">
          <VideoIcon className="film_details_nav_link_icon" />
          <p>Videos</p>
        </a>
        <a href="#reviews" className="film_details_nav_link">
          <ReviewIcon className="film_details_nav_link_icon" />
          <p>Reviews</p>
        </a>
        <a href="#recommendations" className="film_details_nav_link">
          <FilmIcon className="film_details_nav_link_icon" />
          <p>Recommendations</p>
        </a>
      </div>
      <div className="w-full lg:w-11/12">{children}</div>
    </div>
  );
}
