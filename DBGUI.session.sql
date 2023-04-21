CREATE DATABASE IF NOT EXISTS DBUI;
USE DBUI;
CREATE TABLE IF NOT EXISTS users(
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  admin BOOLEAN NOT NULL DEFAULT FALSE
);
INSERT INTO users (username, password, admin) VALUES ('johndoe', 'password123', false);
INSERT INTO users (username, password, admin) VALUES ('bro', 'bro', false);
INSERT INTO users (username, password, admin) VALUES ('cul', 'cul', false);

CREATE TABLE IF NOT EXISTS profiles(
  profile_id INT NOT NULL,
  bio VARCHAR(1000),
  carma INT DEFAULT 0
);
INSERT INTO profiles (profile_id, bio, carma) VALUES (1, 'I like cars', 0);
INSERT INTO profiles (profile_id, bio, carma) VALUES (2, 'I like cars', 0);
INSERT INTO profiles (profile_id, bio, carma) VALUES (3, 'I like cars', 10000);

CREATE TABLE IF NOT EXISTS posts(
  post_id INT AUTO_INCREMENT PRIMARY KEY,
  author VARCHAR(255) NOT NULL,
  garage VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content VARCHAR(2000) NOT NULL,
  rating INT DEFAULT 0
);
INSERT INTO posts (author, garage, title, content, rating) VALUES ('johndoe', 'CHEVY', 'title', 'content', 0);
INSERT INTO posts (author, garage, title, content, rating) VALUES ('bro', 'CHEVY', 'bool', 'bool', 0);
INSERT INTO posts (author, garage, title, content, rating) VALUES ('cul', 'CHEVY', 'juul', 'juul', 0);

CREATE TABLE IF NOT EXISTS comments(
  comment_id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT NOT NULL,
  author VARCHAR(255),
  parent INT,
  content VARCHAR(1000),
  rating INT DEFAULT 0
);
INSERT INTO comments (post_id, author, parent, content, rating) VALUES (1, 'johndoe', 0, 'content', 0);
INSERT INTO comments (post_id, author, parent, content, rating) VALUES (1, 'bro', 0, 'bool', 0);
INSERT INTO comments (post_id, author, parent, content, rating) VALUES (1, 'cul', 0, 'juul', 0);

CREATE TABLE IF NOT EXISTS garages(
  garage_id INT AUTO_INCREMENT PRIMARY KEY,
  creator VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  num_posts INT DEFAULT 0
);
INSERT INTO garages (creator, name, description, num_posts) VALUES ('johndoe', 'My Garage', 'A place for car enthusiasts to discuss their favorite vehicles', 0);
INSERT INTO garages (creator, name, description, num_posts) VALUES ('bro', 'Vintage Car Lovers', 'Discuss and admire classic automobiles', 0);

CREATE TABLE IF NOT EXISTS memberships(
  garage_name VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL
);
CREATE TABLE IF NOT EXISTS awards(
  award_type INT NOT NULL,
  donor_id INT NOT NULL,
  recipient_id INT NOT NULL,
  post_id INT NOT NULL
);
CREATE TABLE IF NOT EXISTS likes(user_id INT NOT NULL, post_id INT NOT NULL);
