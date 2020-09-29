
INSERT INTO media ("media", "sortID", "createdAt", "updatedAt") values ('Paperback', (SELECT CASE WHEN (SELECT COUNT("sortID") FROM media) = 0 THEN 1 ELSE (SELECT MAX("sortID") + 1 FROM media) END), NOW(), NOW());
INSERT INTO media ("media", "sortID", "createdAt", "updatedAt") values ('Hardback', (SELECT CASE WHEN (SELECT COUNT("sortID") FROM media) = 0 THEN 1 ELSE (SELECT MAX("sortID") + 1 FROM media) END), NOW(), NOW());
INSERT INTO media ("media", "sortID", "createdAt", "updatedAt") values ('Kindle', (SELECT CASE WHEN (SELECT COUNT("sortID") FROM media) = 0 THEN 1 ELSE (SELECT MAX("sortID") + 1 FROM media) END), NOW(), NOW());
INSERT INTO media ("media", "sortID", "createdAt", "updatedAt") values ('Audiobook', (SELECT CASE WHEN (SELECT COUNT("sortID") FROM media) = 0 THEN 1 ELSE (SELECT MAX("sortID") + 1 FROM media) END), NOW(), NOW());
INSERT INTO media ("media", "sortID", "createdAt", "updatedAt") values ('Film DVD', (SELECT CASE WHEN (SELECT COUNT("sortID") FROM media) = 0 THEN 1 ELSE (SELECT MAX("sortID") + 1 FROM media) END), NOW(), NOW());
INSERT INTO media ("media", "sortID", "createdAt", "updatedAt") values ('Film Blu-ray', (SELECT CASE WHEN (SELECT COUNT("sortID") FROM media) = 0 THEN 1 ELSE (SELECT MAX("sortID") + 1 FROM media) END), NOW(), NOW());
INSERT INTO media ("media", "sortID", "createdAt", "updatedAt") values ('Film Download', (SELECT CASE WHEN (SELECT COUNT("sortID") FROM media) = 0 THEN 1 ELSE (SELECT MAX("sortID") + 1 FROM media) END), NOW(), NOW());
INSERT INTO media ("media", "sortID", "createdAt", "updatedAt") values ('Television DVD', (SELECT CASE WHEN (SELECT COUNT("sortID") FROM media) = 0 THEN 1 ELSE (SELECT MAX("sortID") + 1 FROM media) END), NOW(), NOW());
INSERT INTO media ("media", "sortID", "createdAt", "updatedAt") values ('Television Blu-ray', (SELECT CASE WHEN (SELECT COUNT("sortID") FROM media) = 0 THEN 1 ELSE (SELECT MAX("sortID") + 1 FROM media) END), NOW(), NOW());
INSERT INTO media ("media", "sortID", "createdAt", "updatedAt") values ('Television Download', (SELECT CASE WHEN (SELECT COUNT("sortID") FROM media) = 0 THEN 1 ELSE (SELECT MAX("sortID") + 1 FROM media) END), NOW(), NOW());
INSERT INTO media ("media", "sortID", "createdAt", "updatedAt") values ('Documentaries DVD', (SELECT CASE WHEN (SELECT COUNT("sortID") FROM media) = 0 THEN 1 ELSE (SELECT MAX("sortID") + 1 FROM media) END), NOW(), NOW());
INSERT INTO media ("media", "sortID", "createdAt", "updatedAt") values ('Documentaries Blu-ray', (SELECT CASE WHEN (SELECT COUNT("sortID") FROM media) = 0 THEN 1 ELSE (SELECT MAX("sortID") + 1 FROM media) END), NOW(), NOW());
INSERT INTO media ("media", "sortID", "createdAt", "updatedAt") values ('Documentaries Download', (SELECT CASE WHEN (SELECT COUNT("sortID") FROM media) = 0 THEN 1 ELSE (SELECT MAX("sortID") + 1 FROM media) END), NOW(), NOW());
INSERT INTO media ("media", "sortID", "createdAt", "updatedAt") values ('Music CD', (SELECT CASE WHEN (SELECT COUNT("sortID") FROM media) = 0 THEN 1 ELSE (SELECT MAX("sortID") + 1 FROM media) END), NOW(), NOW());
INSERT INTO media ("media", "sortID", "createdAt", "updatedAt") values ('Music Download', (SELECT CASE WHEN (SELECT COUNT("sortID") FROM media) = 0 THEN 1 ELSE (SELECT MAX("sortID") + 1 FROM media) END), NOW(), NOW());
INSERT INTO media ("media", "sortID", "createdAt", "updatedAt") values ('Game', (SELECT CASE WHEN (SELECT COUNT("sortID") FROM media) = 0 THEN 1 ELSE (SELECT MAX("sortID") + 1 FROM media) END), NOW(), NOW());


