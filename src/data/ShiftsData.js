import profile1 from "../assets/profile1.jpg";
import profile2 from "../assets/profile2.jpg";
import profile3 from "../assets/profile3.jpg";

const shifts = {
  מנהרה: [
    {
      time: "09:00-12:00",
      title: 'אחמ"ש - עדי כהן',
      participants: [
        { photo: profile1, name: "Participant 1" },
        { photo: profile2, name: "Participant 2" },
        { photo: profile3, name: "Participant 3" },
        { photo: profile1, name: "Participant 1" },
        { photo: profile2, name: "Participant 2" },
        { photo: profile3, name: "Participant 3" },
        { photo: profile1, name: "Participant 1" },
        { photo: profile2, name: "Participant 2" },
        { photo: profile3, name: "Participant 3" },
        { photo: profile1, name: "Participant 1" },
        { photo: profile2, name: "Participant 2" },
        { photo: profile3, name: "Participant 3" },
        { photo: profile1, name: "Participant 1" },
        { photo: profile2, name: "Participant 2" },
        { photo: profile3, name: "Participant 3" },
        { photo: profile1, name: "Participant 1" },
      ],
      totalParticipants: 16,
    },
    {
      time: "13:00-17:00",
      title: 'אחמ"ש - עדי כהן',
      participants: [
        { photo: profile1, name: "Participant 1" },
        { photo: profile2, name: "Participant 2" },
        { photo: profile3, name: "Participant 3" },
        { photo: profile1, name: "Participant 1" },
        { photo: profile2, name: "Participant 2" },
        { photo: profile3, name: "Participant 3" },
        { photo: profile1, name: "Participant 1" },
        { photo: profile2, name: "Participant 2" },
        { photo: profile3, name: "Participant 3" },
      ],
      totalParticipants: 16,
    },
  ],
  דוכן: [
    {
      time: "09:00-12:00",
      title: 'אחמ"ש - עדי כהן',
      participants: [
        { photo: profile1, name: "Participant 1" },
        { photo: profile2, name: "Participant 2" },
        { photo: profile3, name: "Participant 3" },
        { photo: profile1, name: "Participant 1" },
        { photo: profile2, name: "Participant 2" },
      ],
      totalParticipants: 16,
    },
    {
      time: "18:00-22:00",
      title: 'אחמ"ש - עדי כהן',
      participants: [
        { photo: profile1, name: "Participant 1" },
        { photo: profile2, name: "Participant 2" },
        { photo: profile3, name: "Participant 3" },
        { photo: profile1, name: "Participant 1" },
        { photo: profile2, name: "Participant 2" },
      ],
      totalParticipants: 16,
    },
  ],
  הסברה: [
    {
      time: "09:00-12:00",
      title: 'אחמ"ש - עדי כהן',
      participants: [
        { photo: profile1, name: "Participant 1" },
        { photo: profile2, name: "Participant 2" },
        { photo: profile3, name: "Participant 3" },
        { photo: profile1, name: "Participant 1" },
        { photo: profile2, name: "Participant 2" },
        { photo: profile3, name: "Participant 3" },
        { photo: profile1, name: "Participant 1" },
        { photo: profile2, name: "Participant 2" },
        { photo: profile3, name: "Participant 3" },
      ],
      totalParticipants: 16,
    },
    {
      time: "13:00-17:00",
      title: 'אחמ"ש - עדי כהן',
      participants: [
        { photo: profile1, name: "Participant 1" },
        { photo: profile2, name: "Participant 2" },
        { photo: profile3, name: "Participant 3" },
        { photo: profile1, name: "Participant 1" },
        { photo: profile2, name: "Participant 2" },
      ],
      totalParticipants: 16,
    },
    {
      time: "18:00-21:15",
      title: 'אחמ"ש - עדי כהן',
      participants: [
        { photo: profile1, name: "Participant 1" },
        { photo: profile2, name: "Participant 2" },
        { photo: profile3, name: "Participant 3" },
        { photo: profile1, name: "Participant 1" },
        { photo: profile2, name: "Participant 2" },
        { photo: profile3, name: "Participant 3" },
        { photo: profile1, name: "Participant 1" },
        { photo: profile2, name: "Participant 2" },
        { photo: profile3, name: "Participant 3" },
      ],
      totalParticipants: 16,
    },
  ],
  /*  סוג4: [
    {
      time: "09:00-12:00",
      title: 'אחמ"ש - עדי כהן',
      participants: [
        { photo: profile1, name: "Participant 1" },
        { photo: profile2, name: "Participant 2" },
        { photo: profile3, name: "Participant 3" },
        { photo: profile1, name: "Participant 1" },
        { photo: profile2, name: "Participant 2" },
        { photo: profile3, name: "Participant 3" },
        { photo: profile1, name: "Participant 1" },
        { photo: profile2, name: "Participant 2" },
        { photo: profile3, name: "Participant 3" },
      ],
      totalParticipants: 16,
    },
    {
      time: "13:00-17:00",
      title: 'אחמ"ש - עדי כהן',
      participants: [
        { photo: profile1, name: "Participant 1" },
        { photo: profile2, name: "Participant 2" },
        { photo: profile3, name: "Participant 3" },
        { photo: profile1, name: "Participant 1" },
        { photo: profile2, name: "Participant 2" },
      ],
      totalParticipants: 16,
    },
    {
      time: "18:00-21:15",
      title: 'אחמ"ש - עדי כהן',
      participants: [
        { photo: profile1, name: "Participant 1" },
        { photo: profile2, name: "Participant 2" },
        { photo: profile3, name: "Participant 3" },
        { photo: profile1, name: "Participant 1" },
        { photo: profile2, name: "Participant 2" },
        { photo: profile3, name: "Participant 3" },
        { photo: profile1, name: "Participant 1" },
        { photo: profile2, name: "Participant 2" },
        { photo: profile3, name: "Participant 3" },
      ],
      totalParticipants: 16,
    },
  ], */
};

export default shifts;
