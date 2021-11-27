CREATE DATABASE  IF NOT EXISTS `spgames` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `spgames`;

-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: spgames
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `cat_id` int NOT NULL AUTO_INCREMENT,
  `catname` varchar(45) NOT NULL,
  `description` varchar(500) NOT NULL,
  `picture` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`cat_id`),
  UNIQUE KEY `catname_UNIQUE` (`catname`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Action','An action game is a video game genre that emphasizes physical challenges, including hand–eye coordination and reaction-time. Enemy attacks and obstacles deplete the player character\'s health and lives, and the player receives a game over when they run out of lives.','images/Action.jpg'),(6,'Adventure','In adventure games, players usually interact with their environment and other characters to solve puzzles with clues to progress the story or gameplay.','images/Adventure.png'),(8,'MMORPG','MMORPGs involve hundreds of players actively interacting with each other in the same world, and typically, all players share the same or a similar objective.','images/MMORPG.jpg'),(9,'Chillax','Blahblahblah',NULL),(11,'Chill Bro','Blahblahblah',NULL),(12,'Fuiyoh','Swee lah',NULL);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game` (
  `game_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `description` varchar(500) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `platform` varchar(45) NOT NULL,
  `categoryid` int NOT NULL,
  `year` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `picture` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`game_id`),
  UNIQUE KEY `title_UNIQUE` (`title`),
  KEY `categoryid_idx` (`categoryid`),
  CONSTRAINT `categoryid` FOREIGN KEY (`categoryid`) REFERENCES `category` (`cat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (2,'Batman Arkham City','Developer Rocksteady Studios borrows everything from Asylum that worked, though it delivers far less innovation. This makes Arkham City derivative, but the game\'s packed with enough goon-busting fun that it still stands as one of the PC\'s best action games.',11,'PS5',1,2011,'2020-12-24 07:02:29','images/BatmanArkhamKnight.jpg'),(3,'Bayonetta','The original Bayonetta is one of the best action games ever made, and it easily stands alongside genre classics, such as God Hand, Devil May Cry 3, and Ninja Gaiden Black. It features explosive action, and tests your combo prowess against every divine creature in the good book.',20,'XBOX',1,2010,'2020-12-24 07:05:51','images/Bayonetta.png'),(4,'Sea of Thieves','Sea of Thieves offers the essential pirate experience, from sailing and fighting to exploring and looting – everything you need to live the pirate life and become a legend in your own right. With no set roles, you have complete freedom to approach the world, and other players, however you choose.',25,'PC',6,2020,'2020-12-24 07:10:14','images/SeaOfThieves.jpg'),(5,'Horizon Zero Dawn','Horizon Forbidden West continues Aloy’s story as she moves west to a far-future America to brave a majestic, but dangerous frontier where she’ll face awe-inspiring machines and mysterious new threats.',30,'PS5',6,2020,'2020-12-24 07:19:33','images/HorizonZeroDawn.jpg'),(6,'Minecraft','Minecraft is a video game in which players create and break apart various kinds of blocks in three-dimensional worlds.',30,'XBOX',6,2009,'2020-12-24 07:31:50','images/Minecraft.png'),(7,'The Elder Scrolls Online','Discover Tamriel\'s Second Era and enjoy all the epic quests, memorable characters, and dangerous enemies you expect in an Elder Scrolls game.',40,'PC',8,2020,'2020-12-24 07:31:50','images/ElderScrollsOnline.png'),(8,'Monster Hunter World','In the game, the player takes the role of a Hunter, tasked to hunt down and either kill or trap monsters that roam in one of several environmental spaces.',60,'PS5',8,2020,'2020-12-24 07:31:50','images/MonsterHunterWorld.jpg'),(9,'Black Desert','Open-World MMORPG Black Desert has everything from breathtaking combat and siege wars, to exploration and a variety of life-skill content such as trade, fishing, horse training, alchemy, cooking, and gathering! Embark on the adventure you\'ve truly been longing for, today!',40,'XBOX',8,2020,'2020-12-24 07:35:27','images/BlackDesert.png'),(12,'Gone','Went away',1,'PC',1,2030,'2021-02-07 14:34:08',NULL);
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_category`
--

DROP TABLE IF EXISTS `game_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game_category` (
  `gcid` int NOT NULL AUTO_INCREMENT,
  `gameid` int NOT NULL,
  `catid` int NOT NULL,
  PRIMARY KEY (`gcid`,`gameid`,`catid`),
  KEY `fk_gameid_idx` (`gameid`),
  KEY `fk_cat_id_idx` (`catid`),
  CONSTRAINT `fk_cat_id` FOREIGN KEY (`catid`) REFERENCES `category` (`cat_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_game_id` FOREIGN KEY (`gameid`) REFERENCES `game` (`game_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_category`
--

LOCK TABLES `game_category` WRITE;
/*!40000 ALTER TABLE `game_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `game_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `reviewid` int NOT NULL AUTO_INCREMENT,
  `game_id` int NOT NULL,
  `userid` int NOT NULL,
  `content` varchar(255) NOT NULL,
  `rating` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`reviewid`),
  KEY `fk_gameid_idx` (`game_id`),
  CONSTRAINT `fk_gameid` FOREIGN KEY (`game_id`) REFERENCES `game` (`game_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (4,2,1,'wow',4,'2021-02-05 16:07:48'),(5,2,2,'lol',2,'2021-02-05 16:07:48'),(6,2,3,'woah',5,'2021-02-05 16:07:48'),(7,2,1,'really',4,'2021-02-07 13:51:34'),(8,2,1,'real',3,'2021-02-07 13:55:49'),(9,2,1,'real',3,'2021-02-07 13:57:42'),(10,2,1,'wew',4,'2021-02-07 13:57:59');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(225) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` varchar(45) NOT NULL,
  `profile_pic_url` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Terry Tan','terry@gmail.com','Customer','https://www.abc.com/terry.jpg','2020-11-27 07:46:57','swkoswko'),(2,'Mary Jane','mary@hotmail.com','Customer','https://www.abc.com/mary.jpg','2020-11-27 07:46:57','aqlpaqlp'),(3,'Jay Chou','jayjay@jmail.com','Customer','https://www.abc.com/jay.jpg','2020-11-27 08:18:38','dejideji'),(15,'batman','b@tman.com','Customer','https://www.abc.com/batman.jpg','2020-12-04 07:34:00','frhufrhu'),(16,'Bryan','nzybryan@hotmail.com','Admin',NULL,'2021-01-29 19:30:46','qwerty');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'spgames'
--

--
-- Dumping routines for database 'spgames'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-07 23:21:17
