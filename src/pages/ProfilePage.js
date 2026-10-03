import React, {
  useState,
  useEffect,
} from "react";
import {
  fetchProfile,
} from "../services/profileService";

function ProfilePage({

  user,

  totalXP,

  level,

  rank,

  highestStreak,

  totalHabits,

  totalCompleted,

  saveProfile,

})  {
  const successRate =
totalHabits === 0
? 0
: Math.round(
(totalCompleted /
totalHabits) * 100
);
const [editing, setEditing] = useState(false);

const [displayName, setDisplayName] = useState(
  user.displayName || ""
);

const [bio, setBio] = useState(() => {
  return (
    localStorage.getItem("userBio") ||
    "No bio yet."
  );
});
const [memberSince] = useState(() => {

  const savedDate =
    localStorage.getItem("memberSince");

  if (savedDate) return savedDate;

  const today =
    new Date().toLocaleDateString();

  localStorage.setItem(
    "memberSince",
    today
  );

  return today;

});
const [activity, setActivity] =
useState(() => {

const saved =
localStorage.getItem(
"activityTimeline"
);

return saved
? JSON.parse(saved)
: [];

});
const [achievements, setAchievements] =
useState(() => {

const saved =
localStorage.getItem(
"profileAchievements"
);

return saved
? JSON.parse(saved)
: [];

});
useEffect(() => {

  if (activity.length !== 0) return;

  const firstActivity = [
    {
      icon: "🎉",
      text: "Joined Habit Tracker",
      date: memberSince,
    },
  ];

  setActivity(firstActivity);

  localStorage.setItem(
    "activityTimeline",
    JSON.stringify(firstActivity)
  );

}, [activity.length, memberSince]);
useEffect(() => {

const earned=[];

if(totalCompleted>=1){

earned.push({
icon:"🥉",
title:"First Habit",
});

}

if(highestStreak>=7){

earned.push({
icon:"🔥",
title:"7 Day Streak",
});

}

if(level>=5){

earned.push({
icon:"⭐",
title:"Level 5",
});

}

if(totalXP>=500){

earned.push({
icon:"💎",
title:"500 XP",
});

}

if(totalCompleted>=100){

earned.push({
icon:"🏆",
title:"Habit Master",
});

}

setAchievements(earned);

localStorage.setItem(

"profileAchievements",

JSON.stringify(earned)

);

},[
totalCompleted,
highestStreak,
level,
totalXP
]);
useEffect(() => {

  const loadProfile = async () => {

    const profile =
      await fetchProfile(user.uid);

    if (!profile) return;

    if (profile.displayName) {

      setDisplayName(
        profile.displayName
      );

    }

    if (profile.bio) {

      setBio(profile.bio);

    }

  };

  loadProfile();

}, [user.uid]);

  return (

    <div className="profile-page">

      <div className="profile-header">

  <div className="profile-cover"></div>

  <img
    src={user.photoURL}
    alt="Profile"
    className="profile-image"
  />

  <h2>{displayName}</h2>

  <p>{user.email}</p>
  <p>
  📅 Member Since: {memberSince}
</p>
  <p className="profile-bio">

{bio}

</p>

  <div className="rank-badge">

    🏆 {rank}

  </div>
  <button
  className="edit-profile-btn"
  onClick={() =>
    setEditing(!editing)
  }
>

✏️ Edit Profile

</button>
{editing && (

<div className="edit-profile">

<input

type="text"

value={displayName}

onChange={(e)=>

setDisplayName(
e.target.value
)

}

placeholder="Your Name"

/>

<textarea

value={bio}

onChange={(e)=>

setBio(
e.target.value
)

}

placeholder="Write something about yourself..."

></textarea>

<button
  onClick={async () => {

    await saveProfile(user.uid, {
      displayName,
      bio,
    });

    localStorage.setItem(
      "userBio",
      bio
    );

    alert("Profile Saved!");

    setEditing(false);

  }}
>
  💾 Save
</button>

</div>

)}

</div>

      <div className="profile-stats">

<div className="stat-card">

<h2>{totalHabits}</h2>

<p>✅ Habits</p>

</div>

<div className="stat-card">

<h2>{totalCompleted}</h2>

<p>🎯 Completed</p>

</div>
<div className="timeline">

<h2>

📜 Activity Timeline

</h2>

{

activity.map(

(item,index)=>(

<div

key={index}

className="timeline-item"

>

<div>

{item.icon}

</div>

<div>

<h4>

{item.text}

</h4>

<p>

{item.date}

</p>

</div>

</div>

)

)

}

</div>
<div className="achievement-showcase">

<h2>

🏆 Achievement Showcase

</h2>

<div className="achievement-grid">

{

achievements.length===0 ?

(

<p>

No achievements unlocked yet.

</p>

)

:

achievements.map(

(item,index)=>(

<div

key={index}

className="achievement-box"

>

<div className="achievement-icon">

{item.icon}

</div>

<h4>

{item.title}

</h4>

</div>

)

)

}

</div>

</div>

<div className="stat-card">

<h2>{successRate}%</h2>

<p>📈 Success</p>

</div>

<div className="stat-card">

<h2>{highestStreak}</h2>

<p>🔥 Streak</p>

</div>

<div className="stat-card">

<h2>{level}</h2>

<p>⭐ Level</p>

</div>

<div className="stat-card">

<h2>{totalXP}</h2>

<p>💎 XP</p>

</div>

</div>

    </div>

  );

}

export default ProfilePage;