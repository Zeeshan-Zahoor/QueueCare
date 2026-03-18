export const clinics = [
  {
    id: 1,
    name: "Al-Shifa Health Clinic",
    location: "Lal Chowk, Srinagar",
    doctors: [
      {
        id: 101,
        name: "Dr. Jessica Turner",
        specialization: "Gynecologist",
        maxTokens: 15,
        currentlyServing: 10,
        consultationTime: 10,
        consultationStatus: "active",
        lastIssuedToken: 12,
        image: "https://tse1.mm.bing.net/th/id/OIP.zkty80FhzzrzCJ0uBg1zIwAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
        status: "open",
        queue: [
          { token: 11, name: "Mehvish Ali", phone: "7006234567", source: "Walk-in"},
          { token: 12, name: "Shazia Mir", phone: "7006345678", source: "Walk-in"},
        ],
      },
      {
        id: 102,
        name: "Dr. Ajaz Bande",
        specialization: "Urologist",
        maxTokens: 25,
        currentlyServing: 18,
        consultationTime: 15,
        consultationStatus: "active",
        lastIssuedToken: 21,
        image: "https://tse1.mm.bing.net/th/id/OIP.yE8zyTz-OJwswooF9QFC1AHaLH?rs=1&pid=ImgDetMain&o=7&rm=3",
        status: "open",
        queue: [
          { token: 19, name: "Adil Wani", phone: "7006890123", source: "Walk-in"},
          { token: 20, name: "Tariq Shah", phone: "7006901234", source: "Walk-in"},
          { token: 21, name: "Nadeem Sofi", phone: "7006012345", source: "Walk-in"},
        ],
      },
    ],
    image:
      "https://tse4.mm.bing.net/th/id/OIP.QMMhjZmbEYUPjpewCN1P3QHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    phone: '6006368678',
    password: 'Qwerty123@'
  },
  {
    id: 2,
    name: "Golden Care Medical",
    location: "Opposite Degree College, Sopore",
    doctors: [
      {
        id: 201,
        name: "Dr. Sultan Khawaja",
        specialization: "General",
        maxTokens: 15,
        currentlyServing: 7,
        consultationTime: 25,
        consultationStatus: "active",
        lastIssuedToken: 11,
        image:
          "https://tse1.explicit.bing.net/th/id/OIP.iFrQzYQ-Pc8LtwbwzjiVswAAAA?pid=ImgDet&w=204&h=306&c=7&o=7&rm=3",
        status: "open",
        queue: [
          { token: 8, name: "Mudasir Khan", phone: "7006123408", source: "Walk-in"},
          { token: 9, name: "Aamir Bhat", phone: "7006123409", source: "Walk-in"},
          { token: 10, name: "Nisar Ahmad", phone: "7006123410", source: "Walk-in"},
          { token: 11, name: "Tanveer Wani", phone: "7006123411", source: "Walk-in"},
        ],
      },
      {
        id: 202,
        name: "Dr. Riyaz Ahmad",
        specialization: "ENT",
        maxTokens: 10,
        currentlyServing: 4,
        consultationTime: 5,
        consultationStatus: "active",
        lastIssuedToken: 5,
        image:
          "https://tse2.mm.bing.net/th/id/OIP.yY20jvQ_48lWbIwlirpVkAHaE7?w=626&h=417&rs=1&pid=ImgDetMain&o=7&rm=3",
        status: "open",
        queue: [
          { token: 5, name: "Zubair Mir", phone: "7006123505", source: "Walk-in"},
        ],
      },
    ],
    image:
      "https://i.pinimg.com/originals/42/d8/de/42d8de07f715d3ffbaa6a94363734c97.png",
    phone: '6005089716',
    password: 'asdf1234A'
  },
];