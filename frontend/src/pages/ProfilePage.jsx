import { useEffect, useState } from 'react';
import Card from '../components/ui/Card';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8090/api/users/profile', {
        headers: { 'Authorization': token },
      });
      const data = await response.json();
      console.log('Profile data:', data);
      if (response.ok) setProfile(data);
      setLoading(false);
    };
    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>Profile not found.</div>;

  return (
    <div className="flex justify-center mt-10">
      <Card className="max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
        <div className="space-y-2">
          <div><strong>Name:</strong> {profile.username}</div>
          <div><strong>Email:</strong> {profile.email}</div>
          <div><strong>Role:</strong> {profile.role}</div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;