import React, { useState } from 'react';
import axios from 'axios';
import useAuthRedirect from '../hooks/userAuthRedirect';

const ReportForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [useAutoLocation, setUseAutoLocation] = useState(false);
  const [images, setImages] = useState([]);

  const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';

  // Redirect to login if not authenticated
  const user = useAuthRedirect('/login');
  console.log('User from ReportForm:', user);
  
  const handleLocationDetection = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Use OpenStreetMap Nominatim API to reverse geocode
        try {
          const res = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
            params: {
              format: 'jsonv2',
              lat: latitude,
              lon: longitude,
            },
          });

          const city = res.data.address.city || res.data.address.town || res.data.address.village || '';
          const state = res.data.address.state || '';
          const country = res.data.address.country || '';
          const formattedLocation = [city, state, country].filter(Boolean).join(', ');
          setLocation(formattedLocation);
        } catch (error) {
          console.error('Reverse geocoding failed', error);
          alert('Could not determine location.');
        }
      },
      (error) => {
        console.error(error);
        alert('Location access denied or failed.');
      }
    );
  };

  const handleCheckbox = (e) => {
    const checked = e.target.checked;
    setUseAutoLocation(checked);
    if (checked) {
      handleLocationDetection();
    } else {
      setLocation('');
    }
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Submit report metadata first
      // userId and department_id
      // const isLoggedInData= await axios.get(`${baseURL}/isLoggedIn`, { withCredentials: true,});
      // const userId = isLoggedInData.data.user.userId;
      // console.log('User ID from profile:', userId, 'user:', isLoggedInData.data);
      const userId = user?.userId;

      const res = await axios.post(`${baseURL}/reports`, {
        "user_id": userId, // Assuming you have userId from profile
        title,
        description,
        location,
      }, { withCredentials: true });

      const reportId = res.data.reportId;

      // Then upload images if any
      if (images.length > 0) {
        const formData = new FormData();
        images.forEach((image) => formData.append('images', image));

        await axios.post(`${baseURL}/reports/${reportId}/images`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        });
      }

      alert('Report submitted successfully.');
      setTitle('');
      setDescription('');
      setLocation('');
      setImages([]);
      setUseAutoLocation(false);
    } catch (error) {
      console.error('Report submission failed', error);
      alert('Failed to submit report.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow mt-6 dark:bg-gray-900 dark:text-white">
      <h2 className="text-xl font-bold mb-4">Submit a Report</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 border rounded h-32"
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
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          readOnly={useAutoLocation}
          className="w-full p-2 border rounded"
        />

        <input
          type="file"
          accept="image/*"
          multiple
          capture="environment"
          onChange={handleImageChange}
          className="w-full"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default ReportForm;
