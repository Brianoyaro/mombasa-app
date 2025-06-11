import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get(`${baseURL}/reports`, {
          withCredentials: true,
        });
        setReports(res.data);
        // console.log('Fetched reports:', res.data); // Debugging: Log fetched reports
        // console.log("Reports: ", reports); // Debugging: Log reports state after fetching
      } catch (err) {
        console.error('Error fetching reports:', err);
      }
    };

    fetchReports();
  }, [baseURL]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 dark:bg-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Recent Reports</h2>
      {reports.length === 0 && (
        <p className="text-center text-gray-500">No reports available.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => (

          console.log(report),
          // Debugging: Log each report to check its structure
          
          <Link
            key={report.id}
            to={`/reports/${report.id}`}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex flex-col gap-4"
          >
            <div className="flex items-start gap-3">
              {report.images && report.images.length > 0 && (
                <img
                  src={`${baseURL}${report.images[0]}`|| "https://via.placeholder.com/300"}
                  // src={report.images[0]}
                  alt="Report"
                  className="w-full h-48 rounded object-cover"
                />
              )}

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-blue-600 hover:underline">
                  {report.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {report.description}
                </p>
              </div>
            </div>

            <div className="mt-3 flex justify-between text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <button className="hover:text-green-500">
                  👍 {report.upvotes || 0}
                </button>
                <button className="hover:text-red-500">
                  👎 {report.downvotes || 0}
                </button>
              </div>
              <span>{new Date(report.created_at).toLocaleString()}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ReportList;
