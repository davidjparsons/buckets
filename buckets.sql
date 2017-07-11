-- MySQL dump 10.13  Distrib 5.7.18, for macos10.12 (x86_64)
--
-- Host: localhost    Database: buckets
-- ------------------------------------------------------
-- Server version	5.7.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `league`
--

DROP TABLE IF EXISTS `league`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `league` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `location` varchar(50) NOT NULL,
  `sportId` int(11) NOT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `Index 1` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `league`
--

LOCK TABLES `league` WRITE;
/*!40000 ALTER TABLE `league` DISABLE KEYS */;
INSERT INTO `league` VALUES (14,'KGV Div 3','KGV',1,'2017-07-07 12:56:47');
/*!40000 ALTER TABLE `league` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `match`
--

DROP TABLE IF EXISTS `match`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `match` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `matchDate` date NOT NULL,
  `matchTime` time DEFAULT NULL,
  `homeTeamId` int(11) DEFAULT NULL,
  `awayTeamId` int(11) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `Index 1` (`id`),
  KEY `homeTeamId` (`homeTeamId`),
  KEY `awayTeamId` (`awayTeamId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match`
--

LOCK TABLES `match` WRITE;
/*!40000 ALTER TABLE `match` DISABLE KEYS */;
INSERT INTO `match` VALUES (1,'2017-07-07',NULL,1,2,'2017-07-07 12:55:11');
/*!40000 ALTER TABLE `match` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `player` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `position` varchar(50) NOT NULL,
  `number` varchar(50) NOT NULL,
  `teamId` int(11) NOT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `Index 1` (`id`),
  KEY `teamId_idx` (`teamId`),
  CONSTRAINT `fk_teamId_team` FOREIGN KEY (`teamId`) REFERENCES `team` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES (6,'Michael','Jordan','1965-06-13','Shooting Guard','23',1,'2017-07-07 13:48:02');
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playermatch`
--

DROP TABLE IF EXISTS `playermatch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `playermatch` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `matchId` int(11) NOT NULL,
  `playerId` int(11) NOT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `Index 1` (`id`),
  KEY `playerId_idx` (`playerId`),
  KEY `matchId_idx` (`matchId`),
  CONSTRAINT `fk_matchId_match` FOREIGN KEY (`matchId`) REFERENCES `match` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_playerId_player` FOREIGN KEY (`playerId`) REFERENCES `player` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playermatch`
--

LOCK TABLES `playermatch` WRITE;
/*!40000 ALTER TABLE `playermatch` DISABLE KEYS */;
INSERT INTO `playermatch` VALUES (5,1,6,'2017-07-07 13:56:33');
/*!40000 ALTER TABLE `playermatch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statEvent`
--

DROP TABLE IF EXISTS `statEvent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `statEvent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `statTypeId` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `matchId` int(11) NOT NULL,
  `teamId` int(11) NOT NULL,
  `playerId` int(11) NOT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `index1` (`id`),
  KEY `statTypeId_idx` (`statTypeId`),
  KEY `matchId_idx` (`matchId`),
  KEY `playerId_idx` (`playerId`),
  CONSTRAINT `fk_matchId_playerMatch` FOREIGN KEY (`matchId`) REFERENCES `playermatch` (`matchId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_playerId_playerMatch` FOREIGN KEY (`playerId`) REFERENCES `playermatch` (`playerId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_statTypeId_statType` FOREIGN KEY (`statTypeId`) REFERENCES `statType` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statEvent`
--

LOCK TABLES `statEvent` WRITE;
/*!40000 ALTER TABLE `statEvent` DISABLE KEYS */;
INSERT INTO `statEvent` VALUES (1,1,1,1,1,1,'2017-07-07 12:49:40'),(19,5,1,1,2,6,'2017-07-07 13:56:37'),(22,5,2,1,2,6,'2017-07-07 13:57:01'),(23,5,1,1,2,6,'2017-07-07 13:57:07'),(24,5,1,1,2,6,'2017-07-07 13:57:21'),(25,5,1,1,2,6,'2017-07-10 09:37:48'),(26,5,1,1,2,6,'2017-07-10 09:48:19'),(27,5,10,1,2,6,'2017-07-10 09:51:24');
/*!40000 ALTER TABLE `statEvent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statType`
--

DROP TABLE IF EXISTS `statType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `statType` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `sport` varchar(50) NOT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `Index 1` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statType`
--

LOCK TABLES `statType` WRITE;
/*!40000 ALTER TABLE `statType` DISABLE KEYS */;
INSERT INTO `statType` VALUES (5,'Assist','1','2017-07-07 13:50:09');
/*!40000 ALTER TABLE `statType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `leagueId` int(11) NOT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `Index 1` (`id`),
  KEY `leagueId_idx` (`leagueId`),
  CONSTRAINT `fk_leagueId_league` FOREIGN KEY (`leagueId`) REFERENCES `league` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES (1,'AvoGo',14,'2017-07-07 12:58:24'),(4,'Caratdise',14,'2017-07-10 09:36:17');
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-07-11 11:38:22
