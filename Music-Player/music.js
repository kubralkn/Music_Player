class Music {
  constructor(title, singer, img, file) {
    this.title = title;
    this.singer = singer;
    this.img = img;
    this.file = file;
  }
  getName() {
    return this.title + " - " + this.singer;
  }
}

let musicList = [
  new Music("SUMMERTIME SADNESS", "Lana Del Rey", "1.jpg", "1.mp3"),
  new Music("OCEAN EYES", "Billie Eilish", "2.jpg", "2.mp3"),
  new Music("EMPIRE STATE OF MIND", "JAY-Z", "3.jpg", "3.mp3"),
  new Music("Bİ SENİ KONUŞURUM", "Göksel", "4.png", "4.mp3"),
  new Music("WEST COAST", "Lana Del Rey", "5.jpg", "5.mp3"),
  new Music("REMINDER", "The Weeknd", "6.jpg", "6.mp3"),
  new Music("BLOODY MARY", "Lady Gaga", "7.jpg", "7.mp3"),
  new Music("MIRRORS", "Justin Timberlake", "8.jpg", "8.mp3"),
  new Music("SAVE YOUR TEARS", "The Weeknd", "9.jpg", "9.mp3"),
  new Music("UNTILL I FOUND YOU", "Stephen Sanchez", "10.jpg", "10.mp3"),
];
