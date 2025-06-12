import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useAuthRedirect from '../hooks/userAuthRedirect';

// import { useSelector } from 'react-redux';


const ReportDetail = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [loading, setLoading] = useState(true);
  // const [currentUser, setCurrentUser] = useState(null);

  const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000'; 
  
  // Redirect to login if not authenticated
  const currentUser = useAuthRedirect('/login');
  console.log('Current User:', currentUser);

  // useEffect(() => {
  //     const fetchProfile = async () => {
  //       try {
  //         const res = await axios.get(`${baseURL}/profile`, {
  //           withCredentials: true,
  //         });
  //         setCurrentUser(res.data);
  //         // const currentUser = res.data;
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };
  
  //     fetchProfile();
  //   }, [baseURL]);
  
  // const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reportRes = await axios.get(`${baseURL}/reports/${id}`, {withCredentials: true});
        setReport(reportRes.data);

        const commentsRes = await axios.get(`${baseURL}/reports/${id}/comments`, {withCredentials: true});
        setComments(commentsRes.data);
      } catch (err) {
        console.error('Failed to fetch report or comments', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, baseURL]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    try {
      // I need report_id, user_id and comment text
      const commentData = {
        report_id: id,
        user_id: currentUser.userId, // Assuming currentUser has an id
        comment: commentInput,
      };
      console.log('About to submit the following comment data:', commentData);
      const res = await axios.post(`${baseURL}/reports/${id}/comments`, commentData, {withCredentials: true});
      // const res = await axios.post(`${baseURL}/reports/${id}/comments`, {
      //   text: commentInput,
      // }, {withCredentials: true});

      // Assume API response includes username and user_id
      setComments([res.data, ...comments]);
      setCommentInput('');
    } catch (err) {
      console.error('Failed to submit comment', err);
    }
  };

  const handleVote = async (type) => {
    try {
      // I need report_id, user_id and vote_type
      const voteData = {
        report_id: id,
        user_id: currentUser.userId, // Assuming currentUser has an id
        vote_type: type === 'upvote' ? 'up' : 'down',
      };
      await axios.post(`${baseURL}/reports/${id}/vote`, voteData, {withCredentials: true});
      // await axios.post(`${baseURL}/reports/${id}/vote`, { type }, {withCredentials: true});
      // Refresh the report data to get updated vote counts
      const updatedReport = await axios.get(`${baseURL}/reports/${id}`, {withCredentials: true});
      setReport(updatedReport.data);
    } catch (err) {
      console.error('Vote failed', err);
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 dark:bg-gray-900 dark:text-white">
      {report && (
        <div className="bg-white p-6 rounded shadow mb-8">
          <h2 className="text-xl font-semibold mb-2">{report.title}</h2>
          <p className="mb-4 text-gray-700">{report.description}</p>
          {report.images && report.images.length > 0 && (
            <img
              src={
                report.images && report.images[0]
                ? report.images[0] // Cloudinary gives full URL
                : "https://via.placeholder.com/300"
              }
              // src={report.images[0].url}
              alt="Report"
              className="w-full h-auto mb-4 rounded"
            />
          )}
          <div className="flex space-x-4 text-sm text-gray-600 mt-2">
            <button
              onClick={() => handleVote('upvote')}
              className="hover:text-green-600"
            >
              ⬆️ 👍 Upvote ({report.upvotes || 0})
            </button>
            <button
              onClick={() => handleVote('downvote')}
              className="hover:text-red-600"
            >
              ⬇️ 👎 Downvote ({report.downvotes || 0})
            </button>
          </div>
        </div>
      )}

      {/* Comment Form */}
      <div className="bg-gray-50 p-4 rounded shadow mb-6">
        <form onSubmit={handleCommentSubmit}>
          <textarea
            className="w-full p-2 border rounded mb-2"
            rows="3"
            placeholder="Add your comment..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit Comment
          </button>
        </form>
      </div>

      {/* Comment List */}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="bg-white p-3 rounded shadow">
              <div className="flex justify-between items-center mb-1">
                <p className="font-semibold text-sm text-gray-800">
                  {currentUser && comment.user_id === currentUser.userId
                    ? 'You'
                    : comment.username}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(comment.created_at).toLocaleString()}
                </p>
              </div>
              <p className="text-gray-700">{comment.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default ReportDetail;
