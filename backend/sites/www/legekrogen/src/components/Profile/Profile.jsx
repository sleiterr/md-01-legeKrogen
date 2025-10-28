import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

const Profile = () => {
  const [token] = useLocalStorage("token", null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      const res = await fetch("http://localhost:3042/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProfile(data.user);
    };

    fetchProfile();
  }, [token]);

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="py-[8rem] mx-auto md:max-w-7xl">
        <div>
          <h2 className="font-bold text-5xl text-center text-zinc-800 mb-8">
            Profile
          </h2>
          {profile && <pre>{JSON.stringify(profile, null, 2)}</pre>}
        </div>
      </div>
    </section>
  );
};

export default Profile;
