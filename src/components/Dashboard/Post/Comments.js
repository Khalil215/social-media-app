import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AddComment from './Add-comment';

export default function Comments({ docId, comments: allComments, commentInput }) {
  const [comments, setComments] = useState(allComments);

  //slice comments if more than 3
  const [commentsSlice, setCommentsSlice] = useState(3);

  //show 3 more comments
  const showNextComments = () => {
    setCommentsSlice(commentsSlice + 3);
  };

  return (
    <>
      <div className="comments">
        {comments.slice(0, commentsSlice).map((item) => (
          <p key={`${item.comment}-${item.username}`}>
            <Link to={`/dashboard/p/${item.username}`}>
              {item.username}
            </Link>
            <span>{item.comment}</span>
          </p>
        ))}
        {comments.length >= 3 && commentsSlice < comments.length && (
          <button
            type="button"
            onClick={showNextComments}
          >
            View more comments
          </button>
        )}
      </div>
      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </>
  );
}

Comments.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  commentInput: PropTypes.object.isRequired
};
