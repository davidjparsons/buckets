-- MySQL Script generated by MySQL Workbench
-- Tue Jul 11 12:18:48 2017
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema buckets
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema buckets
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `buckets` DEFAULT CHARACTER SET latin1 ;
USE `buckets` ;

-- -----------------------------------------------------
-- Table `buckets`.`league`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `buckets`.`league` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `location` VARCHAR(50) NOT NULL,
  `sportId` INT(11) NOT NULL,
  `created_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `Index 1` (`id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 15
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `buckets`.`match`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `buckets`.`match` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `matchDate` DATE NOT NULL,
  `matchTime` TIME NULL DEFAULT NULL,
  `homeTeamId` INT(11) NULL DEFAULT NULL,
  `awayTeamId` INT(11) NULL DEFAULT NULL,
  `created_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `Index 1` (`id` ASC),
  INDEX `homeTeamId` (`homeTeamId` ASC),
  INDEX `awayTeamId` (`awayTeamId` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `buckets`.`team`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `buckets`.`team` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `leagueId` INT(11) NOT NULL,
  `created_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `Index 1` (`id` ASC),
  INDEX `leagueId_idx` (`leagueId` ASC),
  CONSTRAINT `fk_leagueId_league`
    FOREIGN KEY (`leagueId`)
    REFERENCES `buckets`.`league` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `buckets`.`player`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `buckets`.`player` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `date_of_birth` DATE NULL DEFAULT NULL,
  `position` VARCHAR(50) NOT NULL,
  `number` VARCHAR(50) NOT NULL,
  `teamId` INT(11) NOT NULL,
  `created_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `Index 1` (`id` ASC),
  INDEX `teamId_idx` (`teamId` ASC),
  CONSTRAINT `fk_teamId_team`
    FOREIGN KEY (`teamId`)
    REFERENCES `buckets`.`team` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `buckets`.`playermatch`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `buckets`.`playermatch` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `matchId` INT(11) NOT NULL,
  `playerId` INT(11) NOT NULL,
  `created_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `Index 1` (`id` ASC),
  INDEX `playerId_idx` (`playerId` ASC),
  INDEX `matchId_idx` (`matchId` ASC),
  CONSTRAINT `fk_matchId_match`
    FOREIGN KEY (`matchId`)
    REFERENCES `buckets`.`match` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_playerId_player`
    FOREIGN KEY (`playerId`)
    REFERENCES `buckets`.`player` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `buckets`.`statType`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `buckets`.`statType` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `sport` VARCHAR(50) NOT NULL,
  `created_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `Index 1` (`id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `buckets`.`statEvent`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `buckets`.`statEvent` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `statTypeId` INT(11) NOT NULL,
  `value` INT(11) NOT NULL,
  `matchId` INT(11) NOT NULL,
  `teamId` INT(11) NOT NULL,
  `playerId` INT(11) NOT NULL,
  `created_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `index1` (`id` ASC),
  INDEX `statTypeId_idx` (`statTypeId` ASC),
  INDEX `matchId_idx` (`matchId` ASC),
  INDEX `playerId_idx` (`playerId` ASC),
  CONSTRAINT `fk_matchId_playerMatch`
    FOREIGN KEY (`matchId`)
    REFERENCES `buckets`.`playermatch` (`matchId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_playerId_playerMatch`
    FOREIGN KEY (`playerId`)
    REFERENCES `buckets`.`playermatch` (`playerId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_statTypeId_statType`
    FOREIGN KEY (`statTypeId`)
    REFERENCES `buckets`.`statType` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 28
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
