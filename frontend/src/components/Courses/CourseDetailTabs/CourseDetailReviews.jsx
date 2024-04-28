import React, { useState } from "react";
import Popup from "reactjs-popup";
import StarRatings from "react-star-ratings";
import { useSelector } from "react-redux";
import { postComment } from "../../../actions/CoursesAction";

const CourseDetailReviews = ({ IsEnrolled, comments, courseSlug }) => {
  const { user } = useSelector((state) => state.user);
  const { myProfileData } = useSelector((state) => state.myPorfile);

  const [feedBackDialogeOpen, setFeedBackDialogeOpen] = useState(false);
  const [AllComments, setAllComments] = useState(comments);
  const [ratingOne, setRatingOne] = useState(0);
  const [ratingTwo, setRatingTwo] = useState(0);
  const [ratingThree, setRatingThree] = useState(0);
  const [addComment, setAddComment] = useState("");

  const hanldeReviewModelOpen = () => {
    setFeedBackDialogeOpen(true);
  };

  const handleRatingOneChange = (newRating) => {
    setRatingOne(newRating);
  };

  const handleRatingTwoChange = (newRating) => {
    setRatingTwo(newRating);
  };

  const handleRatingThreeChange = (newRating) => {
    setRatingThree(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const averageRating = ((ratingOne + ratingTwo + ratingThree) / 3).toFixed(
      2
    );

    const commentOject = {
      user: user?.id,
      username: user?.username,
      avatarurl: myProfileData?.avatar,
      comment: addComment,
      reviews: averageRating,
      date: new Date.now(),
    };

    const formData = {
      reviews: averageRating,
      comment: commentOject,
    };

    await postComment(formData, courseSlug);
    const itratedComments = { data: [...AllComments?.data, commentOject] };
    setAllComments(itratedComments);

    setRatingOne(0);
    setRatingTwo(0);
    setRatingThree(0);
    setAddComment("");

    setFeedBackDialogeOpen(false);
  };

  const isCommented = comments.data.some((comment) => comment.user === user.id);

  return (
    <div className="CourseDetailReviews">
      {isCommented === true ? (
        ""
      ) : IsEnrolled === true ? (
        <button onClick={() => hanldeReviewModelOpen()}>
          Give Your Feedback
        </button>
      ) : null}

      {AllComments?.data.length <= 0 ? (
        <div className="CourseDetailReviews-no-feedback">
          <p>No Feedback On This Course</p>
        </div>
      ) : (
        <div className="CourseDetailReviews-all-feedbacks">
          {AllComments?.data.map((data) => (
            <div
              key={data.user}
              className="CourseDetailReviews-all-feedbacks-wrapper"
            >
              <img src={data.avatarurl} alt="avatar" />
              <div>
                <p>{data.username}</p>
                <StarRatings
                  starRatedColor="#ffe600"
                  rating={JSON.parse(data.reviews)}
                  starDimension="15px"
                  starSpacing="5px"
                  numberOfStars={5}
                />
                <span>{data.comment}</span>
              </div>
              <p>{data.date}</p>
            </div>
          ))}
        </div>
      )}

      <Popup
        open={feedBackDialogeOpen}
        closeOnDocumentClick
        onClose={() => setFeedBackDialogeOpen(false)}
        className="course-add-feedback-dialogue-popup"
      >
        <div className="course-add-feedback-container">
          <p>Add Your Valuable Feedback</p>

          <form
            className="course-add-feedback-wrapper"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="course-add-feedback-stars">
              <p>Rate Instructor:</p>
              <StarRatings
                starRatedColor="#ffe600"
                starHoverColor="#ffe600"
                rating={ratingOne}
                starDimension="25px"
                starSpacing="15px"
                changeRating={handleRatingOneChange}
                numberOfStars={5}
                required
              />
            </div>

            <div className="course-add-feedback-stars">
              <p>Rate Course:</p>
              <StarRatings
                starRatedColor="#ffe600"
                starHoverColor="#ffe600"
                rating={ratingTwo}
                starDimension="25px"
                starSpacing="15px"
                changeRating={handleRatingTwoChange}
                numberOfStars={5}
                required
              />
            </div>

            <div className="course-add-feedback-stars">
              <p>Rate Platform:</p>
              <StarRatings
                starRatedColor="#ffe600"
                starHoverColor="#ffe600"
                rating={ratingThree}
                starDimension="25px"
                starSpacing="15px"
                changeRating={handleRatingThreeChange}
                numberOfStars={5}
                required
              />
            </div>

            <div className="course-add-feedback-comment">
              <p>Add Comment:</p>
              <textarea
                required
                value={addComment}
                onChange={(e) => setAddComment(e.target.value)}
              />
            </div>

            <div className="course-add-feedback-button">
              <input type="Submit" value="Post" />
              <button onClick={() => setFeedBackDialogeOpen(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Popup>
    </div>
  );
};

export default CourseDetailReviews;
