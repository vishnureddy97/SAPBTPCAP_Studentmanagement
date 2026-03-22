namespace my.school;
 
entity Students {
  key ID        : UUID @default: $uuid;
      firstName : String(50);
      lastName  : String(50);
      email     : String(100);
      age       : Integer;
      createdAt : Timestamp @default: $now;
}
 
entity Courses {
  key ID      : UUID;
      name    : String(100);
      credits : Integer;
}