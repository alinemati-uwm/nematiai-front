"use client";

import { useGetTeams } from "@/services/static-pages/contact-us";

import CardContactUs from "./card";

export interface Employee {
  id: string;
  name: string;
  family: string;
  avatar: string;
  role: {
    title: string;
  };
  about: string;
}
const TeamsSection = () => {
  const { data, isLoading } = useGetTeams();

  return (
    <div
      className="mt-16 mb-16 flex flex-col gap-8  w-full space-y-6 text-center"
      id="ourTeam"
    >
      <h1 className=" text-2xl font-medium  text-shadow-custom-purple text-white mx-auto lg:font-[500] lg:text-4xl">
        Meet our team
      </h1>
      <div className="flex-wrap items-center   gap-5    text-center md:flex z-20 relative  lg:mx-[165px]">
        {!isLoading &&
          data &&
          data.map((person: Employee) => {
            return (
              <CardContactUs
                key={person.id}
                id={person.id}
                name={person.name}
                family={person.family}
                avatar={person.avatar}
                about={person.about}
                role={person.role}
              />
            );
          })}
      </div>
    </div>
  );
};

export default TeamsSection;
// {
//     "id": 1,
//     "name": "john",
//     "family": "doe",
//     "avatar": "https://nerdstudio-backend-bucket.s3.amazonaws.com/media/team/avatars/avatar-JohnDoe.jpg",
//     "role": {
//       "title": "Backend developer"
//     },
//     "joined_team": "2024-05-08T07:34:56Z",
//     "leave_team": null,
//     "about": "about",
//     "review": "review",
//     "services": "services",
//     "favorites": "favorites",
//     "weight": 3,
//     "social_media": [
//       {
//         "handler": "johndoe",
//         "social_media": {
//           "title": "twitter",
//           "logo": "https://nerdstudio-backend-bucket.s3.amazonaws.com/media/teams/social/avatar-JohnDoe.jpg",
//           "url": "http://twitter.com"
//         }
//       }
//     ]
//   }
