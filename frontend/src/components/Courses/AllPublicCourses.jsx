import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import AllPublicCoursesFilters from "./AllPublicCoursesFilters";
import StarRatings from "react-star-ratings";

import { IoIosArrowForward } from "react-icons/io";
import { CiCircleList } from "react-icons/ci";
import { TbCategoryMinus } from "react-icons/tb";
import Select from "react-select";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Utils/Loader";
import { PublicGetCourses, clearErrors } from "../../actions/CoursesAction";

import "./AllPublicCourses.css";
import { toast } from "react-toastify";
import { LazyLoadImage } from "react-lazy-load-image-component";

const selectPriceFilter = [
  { value: "ASC", label: "Low To High" },
  { value: "DESC", label: "High To Low" },
  { value: "", label: "None" },
];

const AllPublicCourses = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search");

  const { Publiccourses, error, loading } = useSelector(
    (state) => state.PublicCourse
  );
  const { user } = useSelector((state) => state.user);

  const [courses, setCourses] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [showDiv, setShowDiv] = useState("tbCategoryMinus");
  const [filters, setFilters] = useState({ price: "" });

  const handleTbCategoryMinusClick = () => {
    setShowDiv("tbCategoryMinus");
  };

  const handleCiCircleListClick = () => {
    setShowDiv("ciCircleList");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (searchQuery) {
      dispatch(PublicGetCourses(1, filters, searchQuery));
    } else {
      dispatch(PublicGetCourses(1, filters));
    }
  }, [dispatch, error, filters, searchQuery]);

  useEffect(() => {
    setCourses(Publiccourses);
    setPagination(Publiccourses?.pagination);
  }, [Publiccourses]);

  const renderPaginationLinks = () => {
    if (!pagination || pagination?.totalPages === 0) return null;

    const links = [];
    const isFirstPage = pagination.currentPage === 1;
    const isLastPage = pagination.currentPage === pagination.totalPages;

    const goToPreviousPage = () => {
      if (!isFirstPage) {
        const previousPage = pagination.currentPage - 1;
        dispatch(PublicGetCourses(previousPage));
      }
    };

    const goToNextPage = () => {
      if (!isLastPage) {
        const nextPage = pagination.currentPage + 1;
        dispatch(PublicGetCourses(nextPage));
      }
    };

    const startPage = Math.max(1, pagination.currentPage - 2);
    const endPage = Math.min(pagination.totalPages, pagination.currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      const pageNumber = i;
      links.push(
        <Link
          key={i}
          to={`?page=${i}`}
          className={"pubic-all-courses-pagination-active"}
          onClick={() => dispatch(PublicGetCourses(pageNumber))}
        >
          {i}
        </Link>
      );
    }

    return (
      <>
        {isFirstPage ? (
          <span className="pubic-all-courses-pagination-inActive">
            <MdOutlineKeyboardArrowLeft />
          </span>
        ) : (
          <Link
            to={`?page=${pagination.currentPage - 1}`}
            className="pubic-all-courses-pagination-active"
            onClick={goToPreviousPage}
          >
            <MdOutlineKeyboardArrowLeft />
          </Link>
        )}
        {links}
        {isLastPage ? (
          <span className="pubic-all-courses-pagination-inActive">
            <MdOutlineKeyboardArrowRight />
          </span>
        ) : (
          <Link
            to={`?page=${pagination.currentPage + 1}`}
            className="pubic-all-courses-pagination-active"
            onClick={goToNextPage}
          >
            <MdOutlineKeyboardArrowRight />
          </Link>
        )}
      </>
    );
  };

  const applyFilters = (selectedFilters) => {
    setFilters(selectedFilters);
  };

  const handlePriceFilterChange = (selectedOption) => {
    setFilters({ ...filters, price: selectedOption.value });
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: 180,
      height: 50,
      backgroundColor: "#311c5c",
      border: state.isFocused
        ? "1px solid rgb(105, 105, 105)"
        : "1px solid rgb(105, 105, 105)",
      outline: "none",
      borderRadius: 4,
      cursour: "pointer",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "rgb(163, 163, 163)",
    }),
  };

  return (
    <div className="pubic-all-courses">
      <NavBar />

      {/* banner */}
      <div className="pubic-all-courses-banner">
        <div>
          <p>All Courses</p>
          <span>
            <Link to="/">Home</Link> <IoIosArrowForward /> <p>Courses</p>
          </span>
        </div>
      </div>

      <div className="pubic-all-courses-container">
        {/* filters */}
        <AllPublicCoursesFilters
          applyFilters={applyFilters}
          courses={courses}
        />

        {/* Content */}
        {loading ? (
          <div className="pubic-all-courses-loader">
            <Loader />
          </div>
        ) : (
          <div className="pubic-all-courses-list">
            <div className="pubic-all-courses-list-style">
              <p>Showing {pagination?.totalCourses} Total Results</p>

              <div>
                <Select
                  defaultValue={selectPriceFilter.find(
                    (option) => option.value === filters.price
                  )}
                  onChange={handlePriceFilterChange}
                  options={selectPriceFilter}
                  placeholder="Price"
                  styles={customStyles}
                />
                <div onClick={handleTbCategoryMinusClick}>
                  <TbCategoryMinus size={27} />
                </div>
                <div onClick={handleCiCircleListClick}>
                  <CiCircleList size={27} />
                </div>
              </div>
            </div>

            {showDiv === "tbCategoryMinus" && (
              <div className="pubic-all-courses-boxes-view">
                {courses?.Publiccourses?.map((course) => (
                  <div className="pubic-single-course-box-view" key={course.id}>
                    <LazyLoadImage src={course.course_thumbnail} alt="Course" />
                    <div className="pubic-single-course-box-view-header">
                      <p>{course.category}</p>
                      <span>
                        {course.reviews === "" ? (
                          <StarRatings
                            rating={0}
                            starDimension="20px"
                            starSpacing="2px"
                            numberOfStars={1}
                            starRatedColor="#FFFF00"
                          />
                        ) : (
                          <p>rating</p>
                          // <StarRatings
                          //   rating={course.reviews}
                          //   starDimension="20px"
                          //   starSpacing="2px"
                          //   numberOfStars={1}
                          //   starRatedColor="#FFFF00"
                          // />
                        )}

                        {course.reviews === ""
                          ? "0 Reviews"
                          : `(${course.reviews} Reviews)`}
                      </span>
                    </div>
                    <p className="pubic-single-course-box-view-title">
                      {course.course_title}
                    </p>
                    <p className="pubic-single-course-box-view-teacher">
                      <span>By </span> {course.teacher_name}
                    </p>
                    <div className="pubic-single-course-box-view-price">
                      {user?.role === "admin" ||
                      user?.role === "Teacher" ||
                      user?.role === "HR Manager" ||
                      user?.role === "Job Seeker" ? (
                        <Link to="">Enroll Now</Link>
                      ) : (
                        <Link to={`/courses/course/${course.slug}`}>
                          Enroll Now
                        </Link>
                      )}
                      <p>${course.price}.00</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* list view */}
            {showDiv === "ciCircleList" && (
              <div className="pubic-all-courses-list-view">
                {courses?.Publiccourses?.map((course) => (
                  <div
                    className="pubic-single-course-list-view"
                    key={course.id}
                  >
                    <LazyLoadImage src={course.course_thumbnail} alt="Course" />

                    <div className="pubic-single-course-list-view-container">
                      <div className="pubic-single-course-list-view-header">
                        <p className="pubic-single-course-list-view-title">
                          {course.course_title}
                        </p>
                        <div>
                          <p className="pubic-single-course-list-view-category">
                            {course.category}
                          </p>
                          <span>
                            <StarRatings
                              rating={JSON.parse(course.reviews)}
                              starDimension="20px"
                              starSpacing="2px"
                              numberOfStars={1}
                              starRatedColor="#FFFF00"
                            />
                            ({JSON.parse(course.reviews)} Reviews)
                          </span>
                        </div>
                        <p className="pubic-single-course-list-view-teacher">
                          <span>By </span> {course.teacher_name}
                        </p>
                      </div>

                      <div className="pubic-single-course-list-view-price">
                        <Link to={`/courses/course/${course.slug}`}>
                          Enroll Now
                        </Link>
                        <p>${course.price}.00</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="pubic-all-courses-pagination">
              {renderPaginationLinks()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPublicCourses;
