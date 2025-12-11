USE health;

INSERT INTO users (username, first_name, last_name, email, hashedPassword) VALUES ('gold','Gold','Smiths','gold@smiths.co.uk','$2b$12$CCDHKU9ztSaOeHRuvR2vkegiPAoFINLhdJHB63qDhZx6jpKrVVA.C');

INSERT INTO workouts (username, workout_name, duration, intensity, calories, notes) VALUES ('gold', 'Running', 30, 7, 300, 'Morning run'),('gold', 'Cycling', 45, 6, 450, 'Evening ride');
