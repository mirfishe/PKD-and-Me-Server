
INSERT INTO categories ("category", "sortID", "createdAt", "updatedAt") values ('Novel', (SELECT CASE WHEN (SELECT COUNT("sortID") FROM categories) = 0 THEN 1 ELSE (SELECT MAX("sortID") + 1 FROM categories) END), NOW(), NOW());
INSERT INTO categories ("category", "sortID", "createdAt", "updatedAt") values ('Short Stories', (SELECT CASE WHEN (SELECT COUNT("sortID") FROM categories) = 0 THEN 1 ELSE (SELECT MAX("sortID") + 1 FROM categories) END), NOW(), NOW());
INSERT INTO categories ("category", "sortID", "createdAt", "updatedAt") values ('Non Fiction', (SELECT CASE WHEN (SELECT COUNT("sortID") FROM categories) = 0 THEN 1 ELSE (SELECT MAX("sortID") + 1 FROM categories) END), NOW(), NOW());
INSERT INTO categories ("category", "sortID", "createdAt", "updatedAt") values ('Secondary Resource', (SELECT CASE WHEN (SELECT COUNT("sortID") FROM categories) = 0 THEN 1 ELSE (SELECT MAX("sortID") + 1 FROM categories) END), NOW(), NOW());
INSERT INTO categories ("category", "sortID", "createdAt", "updatedAt") values ('Secondary Resource - Blade Runner', (SELECT CASE WHEN (SELECT COUNT("sortID") FROM categories) = 0 THEN 1 ELSE (SELECT MAX("sortID") + 1 FROM categories) END), NOW(), NOW());
INSERT INTO categories ("category", "sortID", "createdAt", "updatedAt") values ('Film', (SELECT CASE WHEN (SELECT COUNT("sortID") FROM categories) = 0 THEN 1 ELSE (SELECT MAX("sortID") + 1 FROM categories) END), NOW(), NOW());
INSERT INTO categories ("category", "sortID", "createdAt", "updatedAt") values ('Television', (SELECT CASE WHEN (SELECT COUNT("sortID") FROM categories) = 0 THEN 1 ELSE (SELECT MAX("sortID") + 1 FROM categories) END), NOW(), NOW());
INSERT INTO categories ("category", "sortID", "createdAt", "updatedAt") values ('Documentaries', (SELECT CASE WHEN (SELECT COUNT("sortID") FROM categories) = 0 THEN 1 ELSE (SELECT MAX("sortID") + 1 FROM categories) END), NOW(), NOW());
INSERT INTO categories ("category", "sortID", "createdAt", "updatedAt") values ('Radio', (SELECT CASE WHEN (SELECT COUNT("sortID") FROM categories) = 0 THEN 1 ELSE (SELECT MAX("sortID") + 1 FROM categories) END), NOW(), NOW());
INSERT INTO categories ("category", "sortID", "createdAt", "updatedAt") values ('Music', (SELECT CASE WHEN (SELECT COUNT("sortID") FROM categories) = 0 THEN 1 ELSE (SELECT MAX("sortID") + 1 FROM categories) END), NOW(), NOW());
INSERT INTO categories ("category", "sortID", "createdAt", "updatedAt") values ('Game', (SELECT CASE WHEN (SELECT COUNT("sortID") FROM categories) = 0 THEN 1 ELSE (SELECT MAX("sortID") + 1 FROM categories) END), NOW(), NOW());






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