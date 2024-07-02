export const initialState = {
  tracks: [
    {
      id: 1,
      title: "Mass Effect 2 Main Theme",
      Artist: "Jack Wall",
      songSrc: "./assets/songs/Mass Effect 2 Main Theme.mp3",
      cover: "./assets/covers/Mass Effect 2 cover.jpg",
    },
    {
      id: 2,
      title: "White Room & Main Title",
      Artist: "Jesper Kyd",
      songSrc: "./assets/songs/White Room & Main Title - Jesper Kyd.mp3",
      cover: "./assets/covers/Hitman Contracts cover.jpg",
    },
    {
      id: 3,
      title: "Splinter Cell Double Agent Credits Theme ",
      Artist: "Michael McCann",
      songSrc: "./assets/songs/Splinter Cell Double Agent Credits Theme .mp3",
      cover: "./assets/covers/SCDA cover.jpg",
    },
    {
      id: 4,
      title: "The Witcher 2 Theme ",
      Artist: "Adam Skorupa",
      songSrc: "./assets/songs/The Witcher 2 Theme - Adam Skorupa.mp3",
      cover: "./assets/covers/Witcher 2 cover.jpg",
    },
    {
      id: 5,
      title: "Assassin's Creed 2 OST Earth ",
      Artist: "Jesper Kyd",
      songSrc: "./assets/songs/Assassin's Creed 2 OST Earth.mp3",
      cover: "./assets/covers/Assassins Creed 2 cover.jpg",
    },
  ],

  currentTrack: {
    id: 1,
    title: "Mass Effect 2 Main Theme",
    Artist: "Jack Wall",
    songSrc: "./assets/songs/Mass Effect 2 Main Theme.mp3",
    cover: "./assets/covers/Mass Effect 2 cover.jpg",
    duration: "1:33",
  },
  isPlaying: false,

  volume: 100,

  currentTime: 0,
};
