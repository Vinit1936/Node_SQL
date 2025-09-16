-- Count users
SELECT COUNT(*) FROM `user`;

-- List all users
SELECT * FROM `user`;

-- Get a user by id (unsafe string concat version from app)
-- SELECT * FROM `user` WHERE id='${id}';

-- Get a user by id (prepared)
SELECT * FROM `user` WHERE id=?;

-- Insert a user
INSERT INTO `user`(`id`,`username`,`email`,`password`) VALUES (?,?,?,?);

-- Update username by id (prepared)
UPDATE `user` SET `username`=? WHERE `id`=?;

-- Delete user by id (prepared)
DELETE FROM `user` WHERE `id`=?;