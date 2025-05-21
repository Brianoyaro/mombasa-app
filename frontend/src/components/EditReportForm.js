import React, { useState, useEffect, use } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import useAuthRedirect from '../hooks/userAuthRedirect';

const EditReportForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [useAutoLocation, setUseAutoLocation] = useState(false);

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  useAuthRedirect('/login');

  const flashMessage = (text, type = 'success') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(''), 5000);
  };

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get(`${baseURL}/reports/${id}`, { withCredentials: true });
        const report = res.data;
        setTitle(report.title);
        setDescription(report.description);
        setLocation(report.location);
        setExistingImages(report.images || []);
      } catch (err) {
        console.error('Failed to fetch report', err);
        flashMessage('Failed to load report.', 'error');
      }
    };
    fetchReport();
  }, [id]);

  const handleLocationDetection = () => {
    if (!navigator.geolocation) {
      flashMessage('Geolocation not supported by your browser.', 'error');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
            params: { format: 'jsonv2', lat: coords.latitude, lon: coords.longitude },
          });
          const { city, town, village, state, country } = res.data.address;
          const formatted = [city || town || village, state, country].filter(Boolean).join(', ');
          setLocation(formatted);
        } catch (err) {
          flashMessage('Failed to determine your location.', 'error');
        }
      },
      () => flashMessage('Location permission denied.', 'error')
    );
  };

  const handleCheckbox = (e) => {
    const checked = e.target.checked;
    setUseAutoLocation(checked);
    if (checked) handleLocationDetection();
  };

  const handleImageChange = (e) => {
    setNewImages(Array.from(e.target.files));
  };

  const handleDeleteImage = async (imageId) => {
    const confirm = window.confirm('Delete this image?');
    if (!confirm) return;

    try {
      await axios.delete(`${baseURL}/reports/${id}/images/${imageId}`, { withCredentials: true });
      setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
      flashMessage('Image deleted successfully.');
    } catch (err) {
      flashMessage('Failed to delete image.', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${baseURL}/reports/${id}`, {
        title,
        description,
        location,
      }, { withCredentials: true });

      if (newImages.length > 0) {
        const formData = new FormData();
        newImages.forEach((img) => formData.append('images', img));
        await axios.post(`${baseURL}/reports/${id}/images`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        });
      }

      flashMessage('Report updated successfully!');
      navigate(`/reports/${id}`);
    } catch (err) {
      console.error('Update failed', err);
      flashMessage('Could not update report.', 'error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow mt-6">
      {message && (
        <div className={`mb-4 p-3 rounded text-white ${messageType === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
          {message}
        </div>
      )}

      <h2 className="text-xl font-bold mb-4">Edit Report</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded"
          placeholder="Title"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 border rounded h-32"
          placeholder="Description"
        />

        <div className="flex items-center space-x-2 text-sm">
          <input
            type="checkbox"
            checked={useAutoLocation}
            onChange={handleCheckbox}
            className="accent-blue-600"
          />
          <label>Detect my location automatically</label>
        </div>

        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          readOnly={useAutoLocation}
          required
          className="w-full p-2 border rounded"
          placeholder="Location"
        />

        {/* Existing Images */}
        <div className="space-y-2">
          <label className="block font-semibold">Existing Images:</label>
          <div className="grid grid-cols-3 gap-2">
            {existingImages.map((img) => (
              <div key={img.id} className="relative">
                <img
                  src={`${baseURL}/uploads/${img.filename}`}
                  alt="report"
                  className="w-full h-24 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(img.id)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          capture="environment"
          className="w-full"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Report
        </button>
      </form>
    </div>
  );
};

export default EditReportForm;
