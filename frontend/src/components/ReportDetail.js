import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ReportDetail = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Assuming current user is stored in localStorage as a JSON string
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) setCurrentUser(user);

    const fetchData = async () => {
      try {
        const reportRes = await axios.get(`http://localhost:3000/reports/${id}`);
        setReport(reportRes.data);

        const commentsRes = await axios.get(`http://localhost:3000/reports/${id}/comments`);
        setComments(commentsRes.data);
      } catch (err) {
        console.error('Failed to fetch report or comments', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    try {
      const res = await axios.post(`http://localhost:3000/reports/${id}/comments`, {
        text: commentInput,
      });

      // Assume API response includes username and user_id
      setComments([res.data, ...comments]);
      setCommentInput('');
    } catch (err) {
      console.error('Failed to submit comment', err);
    }
  };

  const handleVote = async (type) => {
    try {
      await axios.post(`http://localhost:3000/reports/${id}/vote`, { type });
      const updatedReport = await axios.get(`http://localhost:3000/reports/${id}`);
      setReport(updatedReport.data);
    } catch (err) {
      console.error('Vote failed', err);
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {report && (
        <div className="bg-white p-6 rounded shadow mb-8">
          <h2 className="text-xl font-semibold mb-2">{report.title}</h2>
          <p className="mb-4 text-gray-700">{report.description}</p>
          {report.images && report.images.length > 0 && (
            <img
              src={report.images[0].url}
              alt="Report"
              className="w-full h-auto mb-4 rounded"
            />
          )}
          <div className="flex space-x-4 text-sm text-gray-600 mt-2">
            <button
              onClick={() => handleVote('upvote')}
              className="hover:text-green-600"
            >
              ⬆️ Upvote ({report.upvotes || 0})
            </button>
            <button
              onClick={() => handleVote('downvote')}
              className="hover:text-red-600"
            >
              ⬇️ Downvote ({report.downvotes || 0})
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
                  {currentUser && comment.user_id === currentUser.id
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
